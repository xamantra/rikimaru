"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const client_1 = require("../../core/client");
const user_data_1 = require("../../data/user.data");
const config_1 = require("../../core/config");
const ani_bind_model_1 = require("../../models/ani.bind.model");
const ani_bind_data_1 = require("../../data/ani.bind.data");
const anilist_1 = require("../../core/anilist");
const json_helper_1 = require("../../helpers/json.helper");
const anilist_user_model_1 = require("../../models/anilist.user.model");
const null_checker_helper_1 = require("../../helpers/null.checker.helper");
class AniBindFunction {
    async Execute(message, command, dm) {
        await user_data_1.UserData.Insert(message.author.id).catch(err => {
            console.log(err);
        });
        this.CheckBind(message, command, dm);
    }
    async CheckBind(message, command, dm) {
        const anilistUserResult = await anilist_1.AniList.UserQuery(command.Parameter);
        if (!null_checker_helper_1.NullCheck.Fine(anilistUserResult)) {
            this.NotFindError(message, command);
            return;
        }
        else {
            const anilistUser = await json_helper_1.JsonHelper.Convert(anilistUserResult, anilist_user_model_1.Root);
            if (!null_checker_helper_1.NullCheck.Fine(anilistUser)) {
                this.NotFindError(message, command);
                return;
            }
            const user = anilistUser.data.User;
            if (!null_checker_helper_1.NullCheck.Fine(user)) {
                this.NotFindError(message, command);
                return;
            }
            const c = await this.SetCode(message, command, user);
            this.ProcessCode(message, command, dm, c, user);
        }
    }
    async ProcessCode(message, command, dm, c, user) {
        const code = ani_bind_model_1.AniBind.CodeFormat(c);
        const ani = await ani_bind_data_1.AniBindData.Get(message.author.id);
        if (ani !== null) {
            if (ani.Verified === true) {
                this.SendOK(message, command);
                return;
            }
            else {
                this.CheckProfile(message, command, dm, ani_bind_model_1.AniBind.CodeFormat(ani.Code), user);
            }
        }
        else {
            this.CheckProfile(message, command, dm, code, user);
        }
    }
    async CheckProfile(message, command, dm, code, user) {
        const embed = await this.EmbedTemplate(message, command, code);
        if (null_checker_helper_1.NullCheck.Fine(user.about) && user.about.includes(code)) {
            const v = await ani_bind_data_1.AniBindData.Verify(message.author.id);
            if (v === null) {
                sender_1.Sender.Send(message, embed, dm);
            }
            else {
                if (v.Verified) {
                    this.SendOK(message, command);
                    return;
                }
            }
        }
        else {
            sender_1.Sender.Send(message, embed, dm);
        }
    }
    EmbedTemplate(message, command, code) {
        return new Promise(async (resolve, reject) => {
            const client = client_1.ClientManager.Client;
            const embed = {
                embed: {
                    title: `${config_1.Config.BOT_NAME} AniList Sync Center`,
                    description: `**${config_1.Config.BOT_NAME} Code not found** on your profile. You first need to verify your ownership.`,
                    color: message.member.highestRole.color,
                    thumbnail: { url: message.author.avatarURL },
                    image: { url: `https://i.imgur.com/SwKmEzo.png` },
                    fields: [
                        {
                            name: `Instruction`,
                            value: `*Copy and paste* the verification code below in your *AniList about section.*. You can place it anywhere.\n[Edit Profile](https://anilist.co/settings)`
                        },
                        { name: `Code`, value: `***${code}***\n\nExample:` }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: `© ${config_1.Config.BOT_NAME}`
                    }
                }
            };
            resolve(embed);
        });
    }
    SetCode(message, command, user) {
        return new Promise((resolve, reject) => {
            const code = random_helper_1.Random.Range(10000000, 99999999).toString();
            if (null_checker_helper_1.NullCheck.Fine(user)) {
                ani_bind_data_1.AniBindData.Insert(message.author.id, user.id, command.Parameter, code).then(() => {
                    resolve(code);
                });
            }
            else {
                resolve(code);
            }
        });
    }
    NotFindError(message, command) {
        message.channel.send(`:regional_indicator_x: Go me nasai! I wasn't able to find AniList user: **${command.Parameter}**`);
    }
    SendOK(message, command) {
        message.channel.send(`:white_check_mark: Cool! AniList account **"${command.Parameter}"** is **binded** with ${config_1.Config.BOT_NAME}, The code can be remove in **anilist about section**.`);
    }
}
exports.AniBindFunction = AniBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9hbmlsYmluZC5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQTJDO0FBQzNDLCtEQUFxRDtBQUNyRCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELDhDQUEyQztBQUMzQyxnRUFBc0Q7QUFDdEQsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsd0VBQTZEO0FBQzdELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLCtCQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxNQUFNLHdCQUFVLENBQUMsT0FBTyxDQUMx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K0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLDJCQUFXLENBQUMsTUFBTSxDQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsRUFDUCxPQUFPLENBQUMsU0FBUyxFQUNqQixJQUFJLENBQ0wsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFlBQVksQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQiw2RUFDRSxPQUFPLENBQUMsU0FDVixJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsK0NBQ0UsT0FBTyxDQUFDLFNBQ1YsMEJBQ0UsZUFBTSxDQUFDLFFBQ1Qsd0RBQXdELENBQ3pELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUF2SkQsMENBdUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XHJcbmltcG9ydCB7IEFuaUJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2FuaS5iaW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IEFuaUJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvYW5pLmJpbmQuZGF0YVwiO1xyXG5pbXBvcnQgeyBBbmlMaXN0IH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbGlzdFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgUm9vdCwgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYW5pbGlzdC51c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmlCaW5kRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcclxuICBhc3luYyBFeGVjdXRlKFxyXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXHJcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXHJcbiAgICBkbT86IGJvb2xlYW5cclxuICApOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5DaGVja0JpbmQobWVzc2FnZSwgY29tbWFuZCwgZG0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBDaGVja0JpbmQobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBhbmlsaXN0VXNlclJlc3VsdCA9IGF3YWl0IEFuaUxpc3QuVXNlclF1ZXJ5KGNvbW1hbmQuUGFyYW1ldGVyKTtcclxuICAgIGlmICghTnVsbENoZWNrLkZpbmUoYW5pbGlzdFVzZXJSZXN1bHQpKSB7XHJcbiAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhbmlsaXN0VXNlciA9IGF3YWl0IEpzb25IZWxwZXIuQ29udmVydDxSb290PihcclxuICAgICAgICBhbmlsaXN0VXNlclJlc3VsdCxcclxuICAgICAgICBSb290XHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghTnVsbENoZWNrLkZpbmUoYW5pbGlzdFVzZXIpKSB7XHJcbiAgICAgICAgdGhpcy5Ob3RGaW5kRXJyb3IobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhbmlsaXN0VXNlci5kYXRhLlVzZXI7XHJcbiAgICAgIGlmICghTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICB0aGlzLk5vdEZpbmRFcnJvcihtZXNzYWdlLCBjb21tYW5kKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IGF3YWl0IHRoaXMuU2V0Q29kZShtZXNzYWdlLCBjb21tYW5kLCB1c2VyKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYywgdXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIFByb2Nlc3NDb2RlKFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxyXG4gICAgZG06IGJvb2xlYW4sXHJcbiAgICBjOiBzdHJpbmcsXHJcbiAgICB1c2VyOiBVc2VyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBjb2RlID0gQW5pQmluZC5Db2RlRm9ybWF0KGMpO1xyXG4gICAgY29uc3QgYW5pID0gYXdhaXQgQW5pQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgIGlmIChhbmkgIT09IG51bGwpIHtcclxuICAgICAgaWYgKGFuaS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuU2VuZE9LKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNoZWNrUHJvZmlsZShcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBjb21tYW5kLFxyXG4gICAgICAgICAgZG0sXHJcbiAgICAgICAgICBBbmlCaW5kLkNvZGVGb3JtYXQoYW5pLkNvZGUpLFxyXG4gICAgICAgICAgdXNlclxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjb2RlLCB1c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tQcm9maWxlKFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxyXG4gICAgZG06IGJvb2xlYW4sXHJcbiAgICBjb2RlOiBzdHJpbmcsXHJcbiAgICB1c2VyOiBVc2VyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZXNzYWdlLCBjb21tYW5kLCBjb2RlKTtcclxuICAgIGlmIChOdWxsQ2hlY2suRmluZSh1c2VyLmFib3V0KSAmJiB1c2VyLmFib3V0LmluY2x1ZGVzKGNvZGUpKSB7XHJcbiAgICAgIGNvbnN0IHYgPSBhd2FpdCBBbmlCaW5kRGF0YS5WZXJpZnkobWVzc2FnZS5hdXRob3IuaWQpO1xyXG4gICAgICBpZiAodiA9PT0gbnVsbCkge1xyXG4gICAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHYuVmVyaWZpZWQpIHtcclxuICAgICAgICAgIHRoaXMuU2VuZE9LKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgY29kZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNsaWVudCA9IENsaWVudE1hbmFnZXIuQ2xpZW50O1xyXG4gICAgICBjb25zdCBlbWJlZCA9IHtcclxuICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgdGl0bGU6IGAke0NvbmZpZy5CT1RfTkFNRX0gQW5pTGlzdCBTeW5jIENlbnRlcmAsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtcclxuICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXHJcbiAgICAgICAgICB9IENvZGUgbm90IGZvdW5kKiogb24geW91ciBwcm9maWxlLiBZb3UgZmlyc3QgbmVlZCB0byB2ZXJpZnkgeW91ciBvd25lcnNoaXAuYCxcclxuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcclxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxyXG4gICAgICAgICAgaW1hZ2U6IHsgdXJsOiBgaHR0cHM6Ly9pLmltZ3VyLmNvbS9Td0ttRXpvLnBuZ2AgfSxcclxuICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYEluc3RydWN0aW9uYCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYCpDb3B5IGFuZCBwYXN0ZSogdGhlIHZlcmlmaWNhdGlvbiBjb2RlIGJlbG93IGluIHlvdXIgKkFuaUxpc3QgYWJvdXQgc2VjdGlvbi4qLiBZb3UgY2FuIHBsYWNlIGl0IGFueXdoZXJlLlxcbltFZGl0IFByb2ZpbGVdKGh0dHBzOi8vYW5pbGlzdC5jby9zZXR0aW5ncylgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogYENvZGVgLCB2YWx1ZTogYCoqKiR7Y29kZX0qKipcXG5cXG5FeGFtcGxlOmAgfVxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxyXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmVzb2x2ZShlbWJlZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2V0Q29kZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgdXNlcjogVXNlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBjb2RlID0gUmFuZG9tLlJhbmdlKDEwMDAwMDAwLCA5OTk5OTk5OSkudG9TdHJpbmcoKTtcclxuICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSB7XHJcbiAgICAgICAgQW5pQmluZERhdGEuSW5zZXJ0KFxyXG4gICAgICAgICAgbWVzc2FnZS5hdXRob3IuaWQsXHJcbiAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgY29tbWFuZC5QYXJhbWV0ZXIsXHJcbiAgICAgICAgICBjb2RlXHJcbiAgICAgICAgKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoY29kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIE5vdEZpbmRFcnJvcihtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xyXG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoXHJcbiAgICAgIGA6cmVnaW9uYWxfaW5kaWNhdG9yX3g6IEdvIG1lIG5hc2FpISBJIHdhc24ndCBhYmxlIHRvIGZpbmQgQW5pTGlzdCB1c2VyOiAqKiR7XHJcbiAgICAgICAgY29tbWFuZC5QYXJhbWV0ZXJcclxuICAgICAgfSoqYFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2VuZE9LKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgYDp3aGl0ZV9jaGVja19tYXJrOiBDb29sISBBbmlMaXN0IGFjY291bnQgKipcIiR7XHJcbiAgICAgICAgY29tbWFuZC5QYXJhbWV0ZXJcclxuICAgICAgfVwiKiogaXMgKipiaW5kZWQqKiB3aXRoICR7XHJcbiAgICAgICAgQ29uZmlnLkJPVF9OQU1FXHJcbiAgICAgIH0sIFRoZSBjb2RlIGNhbiBiZSByZW1vdmUgaW4gKiphbmlsaXN0IGFib3V0IHNlY3Rpb24qKi5gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=