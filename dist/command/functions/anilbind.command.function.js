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
                sender_1.Sender.Send(message, `Cool! Your AniList account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **anilist about section**.`, dm);
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
                    this.ChannelSend(message, `Cool! AniList account **"${command.Parameter}"** is **binded** with ${config_1.Config.BOT_NAME}, The code can now be remove in **anilist about section**.`);
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
    ChannelSend(message, content) {
        message.channel.send(content);
    }
}
exports.AniBindFunction = AniBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9hbmlsYmluZC5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQTJDO0FBQzNDLCtEQUFxRDtBQUNyRCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELDhDQUEyQztBQUMzQyxnRUFBc0Q7QUFDdEQsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsd0VBQTZEO0FBQzdELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLCtCQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxNQUFNLHdCQUFVLENBQUMsT0FBTyxDQUMx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QUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6RCxJQUFJLCtCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QiwyQkFBVyxDQUFDLE1BQU0sQ0FDaEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQ1AsT0FBTyxDQUFDLFNBQVMsRUFDakIsSUFBSSxDQUNMLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsNkVBQ0UsT0FBTyxDQUFDLFNBQ1YsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO0lBRU8sV0FBVyxDQUFDLE9BQWdCLEVBQUUsT0FBZTtRQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUE1SkQsMENBNEpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XHJcbmltcG9ydCB7IEFuaUJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2FuaS5iaW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IEFuaUJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvYW5pLmJpbmQuZGF0YVwiO1xyXG5pbXBvcnQgeyBBbmlMaXN0IH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbGlzdFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgUm9vdCwgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYW5pbGlzdC51c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmlCaW5kRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcclxuICBhc3luYyBFeGVjdXRlKFxyXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXHJcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXHJcbiAgICBkbT86IGJvb2xlYW5cclxuICApOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5DaGVja0JpbmQobWVzc2FnZSwgY29tbWFuZCwgZG0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBDaGVja0JpbmQobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBhbmlsaXN0VXNlclJlc3VsdCA9IGF3YWl0IEFuaUxpc3QuVXNlclF1ZXJ5KGNvbW1hbmQuUGFyYW1ldGVyKTtcclxuICAgIGlmICghTnVsbENoZWNrLkZpbmUoYW5pbGlzdFVzZXJSZXN1bHQpKSB7XHJcbiAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhbmlsaXN0VXNlciA9IGF3YWl0IEpzb25IZWxwZXIuQ29udmVydDxSb290PihcclxuICAgICAgICBhbmlsaXN0VXNlclJlc3VsdCxcclxuICAgICAgICBSb290XHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghTnVsbENoZWNrLkZpbmUoYW5pbGlzdFVzZXIpKSB7XHJcbiAgICAgICAgdGhpcy5Ob3RGaW5kRXJyb3IobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhbmlsaXN0VXNlci5kYXRhLlVzZXI7XHJcbiAgICAgIGlmICghTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICB0aGlzLk5vdEZpbmRFcnJvcihtZXNzYWdlLCBjb21tYW5kKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYyA9IGF3YWl0IHRoaXMuU2V0Q29kZShtZXNzYWdlLCBjb21tYW5kLCB1c2VyKTtcclxuICAgICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYywgdXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIFByb2Nlc3NDb2RlKFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxyXG4gICAgZG06IGJvb2xlYW4sXHJcbiAgICBjOiBzdHJpbmcsXHJcbiAgICB1c2VyOiBVc2VyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBjb2RlID0gQW5pQmluZC5Db2RlRm9ybWF0KGMpO1xyXG4gICAgY29uc3QgYW5pID0gYXdhaXQgQW5pQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgIGlmIChhbmkgIT09IG51bGwpIHtcclxuICAgICAgaWYgKGFuaS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIFNlbmRlci5TZW5kKFxyXG4gICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgIGBDb29sISBZb3VyIEFuaUxpc3QgYWNjb3VudCBpcyAqKmJpbmRlZCoqIHdpdGggJHtcclxuICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXHJcbiAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKmFuaWxpc3QgYWJvdXQgc2VjdGlvbioqLmAsXHJcbiAgICAgICAgICBkbVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DaGVja1Byb2ZpbGUoXHJcbiAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgY29tbWFuZCxcclxuICAgICAgICAgIGRtLFxyXG4gICAgICAgICAgQW5pQmluZC5Db2RlRm9ybWF0KGFuaS5Db2RlKSxcclxuICAgICAgICAgIHVzZXJcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkNoZWNrUHJvZmlsZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgY29kZSwgdXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIENoZWNrUHJvZmlsZShcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgICBjb21tYW5kOiBJQ29tbWFuZCxcclxuICAgIGRtOiBib29sZWFuLFxyXG4gICAgY29kZTogc3RyaW5nLFxyXG4gICAgdXNlcjogVXNlclxyXG4gICkge1xyXG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUobWVzc2FnZSwgY29tbWFuZCwgY29kZSk7XHJcbiAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlci5hYm91dCkgJiYgdXNlci5hYm91dC5pbmNsdWRlcyhjb2RlKSkge1xyXG4gICAgICBjb25zdCB2ID0gYXdhaXQgQW5pQmluZERhdGEuVmVyaWZ5KG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgICAgaWYgKHYgPT09IG51bGwpIHtcclxuICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh2LlZlcmlmaWVkKSB7XHJcbiAgICAgICAgICB0aGlzLkNoYW5uZWxTZW5kKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBgQ29vbCEgQW5pTGlzdCBhY2NvdW50ICoqXCIke1xyXG4gICAgICAgICAgICAgIGNvbW1hbmQuUGFyYW1ldGVyXHJcbiAgICAgICAgICAgIH1cIioqIGlzICoqYmluZGVkKiogd2l0aCAke1xyXG4gICAgICAgICAgICAgIENvbmZpZy5CT1RfTkFNRVxyXG4gICAgICAgICAgICB9LCBUaGUgY29kZSBjYW4gbm93IGJlIHJlbW92ZSBpbiAqKmFuaWxpc3QgYWJvdXQgc2VjdGlvbioqLmBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBBbmlMaXN0IFN5bmMgQ2VudGVyYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xyXG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgIH0gQ29kZSBub3QgZm91bmQqKiBvbiB5b3VyIHByb2ZpbGUuIFlvdSBmaXJzdCBuZWVkIHRvIHZlcmlmeSB5b3VyIG93bmVyc2hpcC5gLFxyXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXHJcbiAgICAgICAgICBpbWFnZTogeyB1cmw6IGBodHRwczovL2kuaW1ndXIuY29tL1N3S21Fem8ucG5nYCB9LFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgSW5zdHJ1Y3Rpb25gLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqQW5pTGlzdCBhYm91dCBzZWN0aW9uLiouIFlvdSBjYW4gcGxhY2UgaXQgYW55d2hlcmUuXFxuW0VkaXQgUHJvZmlsZV0oaHR0cHM6Ly9hbmlsaXN0LmNvL3NldHRpbmdzKWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXNvbHZlKGVtYmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZXRDb2RlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCB1c2VyOiBVc2VyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xyXG4gICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICBBbmlCaW5kRGF0YS5JbnNlcnQoXHJcbiAgICAgICAgICBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlcixcclxuICAgICAgICAgIGNvZGVcclxuICAgICAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgTm90RmluZEVycm9yKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgYDpyZWdpb25hbF9pbmRpY2F0b3JfeDogR28gbWUgbmFzYWkhIEkgd2Fzbid0IGFibGUgdG8gZmluZCBBbmlMaXN0IHVzZXI6ICoqJHtcclxuICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxyXG4gICAgICB9KipgXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBDaGFubmVsU2VuZChtZXNzYWdlOiBNZXNzYWdlLCBjb250ZW50OiBzdHJpbmcpIHtcclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKGNvbnRlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=