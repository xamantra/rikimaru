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
        if (null_checker_helper_1.NullCheck.Fine(anilistUserResult)) {
            this.NotFindError(message, command);
            return;
        }
        else {
            const anilistUser = await json_helper_1.JsonHelper.Convert(anilistUserResult, anilist_user_model_1.Root);
            const user = anilistUser.data.User;
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
        if (!null_checker_helper_1.NullCheck.Fine(user)) {
            this.NotFindError(message, command);
            return;
        }
        else {
            if (null_checker_helper_1.NullCheck.Fine(user.about) && user.about.includes(code)) {
                const v = await ani_bind_data_1.AniBindData.Verify(message.author.id);
                if (v === null) {
                    sender_1.Sender.Send(message, embed, dm);
                }
                else {
                    if (v.Verified) {
                        sender_1.Sender.Send(message, `Cool! Your AniList account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **anilist about section**.`, dm);
                    }
                }
            }
            else {
                sender_1.Sender.Send(message, embed, dm);
            }
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
        message.channel.send(`:regional_indicator_x: Go me nasai! I wasn't able to find mal user: **${command.Parameter}**`);
    }
}
exports.AniBindFunction = AniBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9hbmlsYmluZC5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQTJDO0FBQzNDLCtEQUFxRDtBQUNyRCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELDhDQUEyQztBQUMzQyxnRUFBc0Q7QUFDdEQsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsd0VBQTZEO0FBQzdELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSwrQkFBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDUjthQUFNO1lBQ0wsTUFBTSxXQUFXLEdBQUcsTUFBTSx3QkFBVSxDQUFDLE9BQU8sQ0FDMUMsaUJB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QU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUNqQixJQUFJLENBQUMsRUFBRSxFQUNQLE9BQU8sQ0FBQyxTQUFTLEVBQ2pCLElBQUksQ0FDTCxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sWUFBWSxDQUFDLE9BQWdCLEVBQUUsT0FBaUI7UUFDdEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2xCLHlFQUNFLE9BQU8sQ0FBQyxTQUNWLElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcEpELDBDQW9KQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcclxuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBbmlCaW5kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9hbmkuYmluZC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBBbmlCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL2FuaS5iaW5kLmRhdGFcIjtcclxuaW1wb3J0IHsgQW5pTGlzdCB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaWxpc3RcIjtcclxuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XHJcbmltcG9ydCB7IFJvb3QsIFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2FuaWxpc3QudXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pQmluZEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgYXN5bmMgRXhlY3V0ZShcclxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxyXG4gICAgZG0/OiBib29sZWFuXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuQ2hlY2tCaW5kKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tCaW5kKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xyXG4gICAgY29uc3QgYW5pbGlzdFVzZXJSZXN1bHQgPSBhd2FpdCBBbmlMaXN0LlVzZXJRdWVyeShjb21tYW5kLlBhcmFtZXRlcik7XHJcbiAgICBpZiAoTnVsbENoZWNrLkZpbmUoYW5pbGlzdFVzZXJSZXN1bHQpKSB7XHJcbiAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhbmlsaXN0VXNlciA9IGF3YWl0IEpzb25IZWxwZXIuQ29udmVydDxSb290PihcclxuICAgICAgICBhbmlsaXN0VXNlclJlc3VsdCxcclxuICAgICAgICBSb290XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhbmlsaXN0VXNlci5kYXRhLlVzZXI7XHJcbiAgICAgIGNvbnN0IGMgPSBhd2FpdCB0aGlzLlNldENvZGUobWVzc2FnZSwgY29tbWFuZCwgdXNlcik7XHJcbiAgICAgIHRoaXMuUHJvY2Vzc0NvZGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGMsIHVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBQcm9jZXNzQ29kZShcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgICBjb21tYW5kOiBJQ29tbWFuZCxcclxuICAgIGRtOiBib29sZWFuLFxyXG4gICAgYzogc3RyaW5nLFxyXG4gICAgdXNlcjogVXNlclxyXG4gICkge1xyXG4gICAgY29uc3QgY29kZSA9IEFuaUJpbmQuQ29kZUZvcm1hdChjKTtcclxuICAgIGNvbnN0IGFuaSA9IGF3YWl0IEFuaUJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICBpZiAoYW5pICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChhbmkuVmVyaWZpZWQgPT09IHRydWUpIHtcclxuICAgICAgICBTZW5kZXIuU2VuZChcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBgQ29vbCEgWW91ciBBbmlMaXN0IGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XHJcbiAgICAgICAgICAgIENvbmZpZy5CT1RfTkFNRVxyXG4gICAgICAgICAgfSwgWW91IGNhbiAqKnJlbW92ZSoqIHRoZSBjb2RlIGluIHlvdXIgKiphbmlsaXN0IGFib3V0IHNlY3Rpb24qKi5gLFxyXG4gICAgICAgICAgZG1cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKFxyXG4gICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgIGNvbW1hbmQsXHJcbiAgICAgICAgICBkbSxcclxuICAgICAgICAgIEFuaUJpbmQuQ29kZUZvcm1hdChhbmkuQ29kZSksXHJcbiAgICAgICAgICB1c2VyXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGNvZGUsIHVzZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBDaGVja1Byb2ZpbGUoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXHJcbiAgICBkbTogYm9vbGVhbixcclxuICAgIGNvZGU6IHN0cmluZyxcclxuICAgIHVzZXI6IFVzZXJcclxuICApIHtcclxuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lc3NhZ2UsIGNvbW1hbmQsIGNvZGUpO1xyXG4gICAgaWYgKCFOdWxsQ2hlY2suRmluZSh1c2VyKSkge1xyXG4gICAgICB0aGlzLk5vdEZpbmRFcnJvcihtZXNzYWdlLCBjb21tYW5kKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIuYWJvdXQpICYmIHVzZXIuYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcclxuICAgICAgICBjb25zdCB2ID0gYXdhaXQgQW5pQmluZERhdGEuVmVyaWZ5KG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgICAgICBpZiAodiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHYuVmVyaWZpZWQpIHtcclxuICAgICAgICAgICAgU2VuZGVyLlNlbmQoXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBgQ29vbCEgWW91ciBBbmlMaXN0IGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XHJcbiAgICAgICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKmFuaWxpc3QgYWJvdXQgc2VjdGlvbioqLmAsXHJcbiAgICAgICAgICAgICAgZG1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBBbmlMaXN0IFN5bmMgQ2VudGVyYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xyXG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgIH0gQ29kZSBub3QgZm91bmQqKiBvbiB5b3VyIHByb2ZpbGUuIFlvdSBmaXJzdCBuZWVkIHRvIHZlcmlmeSB5b3VyIG93bmVyc2hpcC5gLFxyXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXHJcbiAgICAgICAgICBpbWFnZTogeyB1cmw6IGBodHRwczovL2kuaW1ndXIuY29tL1N3S21Fem8ucG5nYCB9LFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgSW5zdHJ1Y3Rpb25gLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqQW5pTGlzdCBhYm91dCBzZWN0aW9uLiouIFlvdSBjYW4gcGxhY2UgaXQgYW55d2hlcmUuXFxuW0VkaXQgUHJvZmlsZV0oaHR0cHM6Ly9hbmlsaXN0LmNvL3NldHRpbmdzKWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXNvbHZlKGVtYmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZXRDb2RlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCB1c2VyOiBVc2VyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xyXG4gICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICBBbmlCaW5kRGF0YS5JbnNlcnQoXHJcbiAgICAgICAgICBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlcixcclxuICAgICAgICAgIGNvZGVcclxuICAgICAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgTm90RmluZEVycm9yKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XHJcbiAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChcclxuICAgICAgYDpyZWdpb25hbF9pbmRpY2F0b3JfeDogR28gbWUgbmFzYWkhIEkgd2Fzbid0IGFibGUgdG8gZmluZCBtYWwgdXNlcjogKioke1xyXG4gICAgICAgIGNvbW1hbmQuUGFyYW1ldGVyXHJcbiAgICAgIH0qKmBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==