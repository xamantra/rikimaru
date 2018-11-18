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
        message.channel.send(`Cool! AniList account **"${command.Parameter}"** is **binded** with ${config_1.Config.BOT_NAME}, The code can be remove in **anilist about section**.`);
    }
}
exports.AniBindFunction = AniBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9hbmlsYmluZC5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQTJDO0FBQzNDLCtEQUFxRDtBQUNyRCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELDhDQUEyQztBQUMzQyxnRUFBc0Q7QUFDdEQsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsd0VBQTZEO0FBQzdELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLCtCQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxNQUFNLHdCQUFVLENBQUMsT0FBTyxDQUMx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K0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLDJCQUFXLENBQUMsTUFBTSxDQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFDakIsSUFBSSxDQUFDLEVBQUUsRUFDUCxPQUFPLENBQUMsU0FBUyxFQUNqQixJQUFJLENBQ0wsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFlBQVksQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQiw2RUFDRSxPQUFPLENBQUMsU0FDVixJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsNEJBQTRCLE9BQU8sQ0FBQyxTQUFTLDBCQUMzQyxlQUFNLENBQUMsUUFDVCx3REFBd0QsQ0FDekQsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJKRCwwQ0FxSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XHJcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcclxuaW1wb3J0IHsgQW5pQmluZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYW5pLmJpbmQubW9kZWxcIjtcclxuaW1wb3J0IHsgQW5pQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9hbmkuYmluZC5kYXRhXCI7XHJcbmltcG9ydCB7IEFuaUxpc3QgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmlsaXN0XCI7XHJcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9qc29uLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBSb290LCBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9hbmlsaXN0LnVzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaUJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xyXG4gIGFzeW5jIEV4ZWN1dGUoXHJcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcclxuICAgIGRtPzogYm9vbGVhblxyXG4gICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLkNoZWNrQmluZChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIENoZWNrQmluZChtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGFuaWxpc3RVc2VyUmVzdWx0ID0gYXdhaXQgQW5pTGlzdC5Vc2VyUXVlcnkoY29tbWFuZC5QYXJhbWV0ZXIpO1xyXG4gICAgaWYgKCFOdWxsQ2hlY2suRmluZShhbmlsaXN0VXNlclJlc3VsdCkpIHtcclxuICAgICAgdGhpcy5Ob3RGaW5kRXJyb3IobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGFuaWxpc3RVc2VyID0gYXdhaXQgSnNvbkhlbHBlci5Db252ZXJ0PFJvb3Q+KFxyXG4gICAgICAgIGFuaWxpc3RVc2VyUmVzdWx0LFxyXG4gICAgICAgIFJvb3RcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFOdWxsQ2hlY2suRmluZShhbmlsaXN0VXNlcikpIHtcclxuICAgICAgICB0aGlzLk5vdEZpbmRFcnJvcihtZXNzYWdlLCBjb21tYW5kKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdXNlciA9IGFuaWxpc3RVc2VyLmRhdGEuVXNlcjtcclxuICAgICAgaWYgKCFOdWxsQ2hlY2suRmluZSh1c2VyKSkge1xyXG4gICAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjID0gYXdhaXQgdGhpcy5TZXRDb2RlKG1lc3NhZ2UsIGNvbW1hbmQsIHVzZXIpO1xyXG4gICAgICB0aGlzLlByb2Nlc3NDb2RlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjLCB1c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgUHJvY2Vzc0NvZGUoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXHJcbiAgICBkbTogYm9vbGVhbixcclxuICAgIGM6IHN0cmluZyxcclxuICAgIHVzZXI6IFVzZXJcclxuICApIHtcclxuICAgIGNvbnN0IGNvZGUgPSBBbmlCaW5kLkNvZGVGb3JtYXQoYyk7XHJcbiAgICBjb25zdCBhbmkgPSBhd2FpdCBBbmlCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xyXG4gICAgaWYgKGFuaSAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoYW5pLlZlcmlmaWVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5TZW5kT0sobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKFxyXG4gICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgIGNvbW1hbmQsXHJcbiAgICAgICAgICBkbSxcclxuICAgICAgICAgIEFuaUJpbmQuQ29kZUZvcm1hdChhbmkuQ29kZSksXHJcbiAgICAgICAgICB1c2VyXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGNvZGUsIHVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBDaGVja1Byb2ZpbGUoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXHJcbiAgICBkbTogYm9vbGVhbixcclxuICAgIGNvZGU6IHN0cmluZyxcclxuICAgIHVzZXI6IFVzZXJcclxuICApIHtcclxuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lc3NhZ2UsIGNvbW1hbmQsIGNvZGUpO1xyXG4gICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIuYWJvdXQpICYmIHVzZXIuYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcclxuICAgICAgY29uc3QgdiA9IGF3YWl0IEFuaUJpbmREYXRhLlZlcmlmeShtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICAgIGlmICh2ID09PSBudWxsKSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodi5WZXJpZmllZCkge1xyXG4gICAgICAgICAgdGhpcy5TZW5kT0sobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBBbmlMaXN0IFN5bmMgQ2VudGVyYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xyXG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgIH0gQ29kZSBub3QgZm91bmQqKiBvbiB5b3VyIHByb2ZpbGUuIFlvdSBmaXJzdCBuZWVkIHRvIHZlcmlmeSB5b3VyIG93bmVyc2hpcC5gLFxyXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXHJcbiAgICAgICAgICBpbWFnZTogeyB1cmw6IGBodHRwczovL2kuaW1ndXIuY29tL1N3S21Fem8ucG5nYCB9LFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgSW5zdHJ1Y3Rpb25gLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqQW5pTGlzdCBhYm91dCBzZWN0aW9uLiouIFlvdSBjYW4gcGxhY2UgaXQgYW55d2hlcmUuXFxuW0VkaXQgUHJvZmlsZV0oaHR0cHM6Ly9hbmlsaXN0LmNvL3NldHRpbmdzKWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXNvbHZlKGVtYmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZXRDb2RlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCB1c2VyOiBVc2VyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xyXG4gICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICBBbmlCaW5kRGF0YS5JbnNlcnQoXHJcbiAgICAgICAgICBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlcixcclxuICAgICAgICAgIGNvZGVcclxuICAgICAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgTm90RmluZEVycm9yKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgYDpyZWdpb25hbF9pbmRpY2F0b3JfeDogR28gbWUgbmFzYWkhIEkgd2Fzbid0IGFibGUgdG8gZmluZCBBbmlMaXN0IHVzZXI6ICoqJHtcclxuICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxyXG4gICAgICB9KipgXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZW5kT0sobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQpIHtcclxuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICBgQ29vbCEgQW5pTGlzdCBhY2NvdW50ICoqXCIke2NvbW1hbmQuUGFyYW1ldGVyfVwiKiogaXMgKipiaW5kZWQqKiB3aXRoICR7XHJcbiAgICAgICAgQ29uZmlnLkJPVF9OQU1FXHJcbiAgICAgIH0sIFRoZSBjb2RlIGNhbiBiZSByZW1vdmUgaW4gKiphbmlsaXN0IGFib3V0IHNlY3Rpb24qKi5gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=