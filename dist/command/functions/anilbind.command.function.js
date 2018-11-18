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
        const anilistUserResult = await anilist_1.Anilist.UserQuery(command.Parameter);
        const anilistRoot = await json_helper_1.JsonHelper.Convert(anilistUserResult, anilist_user_model_1.Root);
        const user = anilistRoot.data.User;
        const c = await this.SetCode(message, command, user);
        this.ProcessCode(message, command, dm, c, user);
    }
    async ProcessCode(message, command, dm, c, user) {
        const code = ani_bind_model_1.AniBind.CodeFormat(c);
        const ani = await ani_bind_data_1.AniBindData.Get(message.author.id);
        if (ani !== null) {
            if (ani.Verified === true) {
                sender_1.Sender.Send(message, `Cool! Your Anilist account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **anilist about section**.`, dm);
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
        if (user === null) {
            message.channel.send(`:regional_indicator_x: Ge me nasai! I wasn't able to find anilist user: **${command.Parameter}**`);
            return;
        }
        else {
            if (user.about.includes(code)) {
                const v = await ani_bind_data_1.AniBindData.Verify(message.author.id);
                if (v === null) {
                    sender_1.Sender.Send(message, embed, dm);
                }
                else {
                    if (v.Verified) {
                        sender_1.Sender.Send(message, `Cool! Your Anilist account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **anilist about section**.`, dm);
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
                    title: `${config_1.Config.BOT_NAME} Anilist Sync Center`,
                    description: `**${config_1.Config.BOT_NAME} Code not found** on your profile. You first need to verify your ownership.`,
                    color: message.member.highestRole.color,
                    thumbnail: { url: message.author.avatarURL },
                    image: { url: `https://i.imgur.com/SwKmEzo.png` },
                    fields: [
                        {
                            name: `Instruction`,
                            value: `*Copy and paste* the verification code below in your *Anilist about section.*. You can place it anywhere.\n[Edit Profile](https://anilist.co/settings)`
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
}
exports.AniBindFunction = AniBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9hbmlsYmluZC5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQTJDO0FBQzNDLCtEQUFxRDtBQUNyRCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELDhDQUEyQztBQUMzQyxnRUFBc0Q7QUFDdEQsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsd0VBQTZEO0FBQzdELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsTUFBTSxXQUFXLEdBQUcsTUFBTSx3QkFBVSxDQUFDLE9BQU8sQ0FBTyxpQkFBaUIsRUFBRSx5QkFBSSxDQUFDLENBQUM7UUFDNUUsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFD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Q0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhJRCwwQ0F3SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XHJcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcclxuaW1wb3J0IHsgQW5pQmluZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYW5pLmJpbmQubW9kZWxcIjtcclxuaW1wb3J0IHsgQW5pQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9hbmkuYmluZC5kYXRhXCI7XHJcbmltcG9ydCB7IEFuaWxpc3QgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmlsaXN0XCI7XHJcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9qc29uLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBSb290LCBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9hbmlsaXN0LnVzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaUJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xyXG4gIGFzeW5jIEV4ZWN1dGUoXHJcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcclxuICAgIGRtPzogYm9vbGVhblxyXG4gICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLkNoZWNrQmluZChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIENoZWNrQmluZChtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGFuaWxpc3RVc2VyUmVzdWx0ID0gYXdhaXQgQW5pbGlzdC5Vc2VyUXVlcnkoY29tbWFuZC5QYXJhbWV0ZXIpO1xyXG4gICAgY29uc3QgYW5pbGlzdFJvb3QgPSBhd2FpdCBKc29uSGVscGVyLkNvbnZlcnQ8Um9vdD4oYW5pbGlzdFVzZXJSZXN1bHQsIFJvb3QpO1xyXG4gICAgY29uc3QgdXNlciA9IGFuaWxpc3RSb290LmRhdGEuVXNlcjtcclxuICAgIGNvbnN0IGMgPSBhd2FpdCB0aGlzLlNldENvZGUobWVzc2FnZSwgY29tbWFuZCwgdXNlcik7XHJcbiAgICB0aGlzLlByb2Nlc3NDb2RlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjLCB1c2VyKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgUHJvY2Vzc0NvZGUoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXHJcbiAgICBkbTogYm9vbGVhbixcclxuICAgIGM6IHN0cmluZyxcclxuICAgIHVzZXI6IFVzZXJcclxuICApIHtcclxuICAgIGNvbnN0IGNvZGUgPSBBbmlCaW5kLkNvZGVGb3JtYXQoYyk7XHJcbiAgICBjb25zdCBhbmkgPSBhd2FpdCBBbmlCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xyXG4gICAgaWYgKGFuaSAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAoYW5pLlZlcmlmaWVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmQoXHJcbiAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgYENvb2whIFlvdXIgQW5pbGlzdCBhY2NvdW50IGlzICoqYmluZGVkKiogd2l0aCAke1xyXG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgIH0sIFlvdSBjYW4gKipyZW1vdmUqKiB0aGUgY29kZSBpbiB5b3VyICoqYW5pbGlzdCBhYm91dCBzZWN0aW9uKiouYCxcclxuICAgICAgICAgIGRtXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNoZWNrUHJvZmlsZShcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBjb21tYW5kLFxyXG4gICAgICAgICAgZG0sXHJcbiAgICAgICAgICBBbmlCaW5kLkNvZGVGb3JtYXQoYW5pLkNvZGUpLFxyXG4gICAgICAgICAgdXNlclxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjb2RlLCB1c2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tQcm9maWxlKFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxyXG4gICAgZG06IGJvb2xlYW4sXHJcbiAgICBjb2RlOiBzdHJpbmcsXHJcbiAgICB1c2VyOiBVc2VyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZXNzYWdlLCBjb21tYW5kLCBjb2RlKTtcclxuICAgIGlmICh1c2VyID09PSBudWxsKSB7XHJcbiAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxyXG4gICAgICAgIGA6cmVnaW9uYWxfaW5kaWNhdG9yX3g6IEdlIG1lIG5hc2FpISBJIHdhc24ndCBhYmxlIHRvIGZpbmQgYW5pbGlzdCB1c2VyOiAqKiR7XHJcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxyXG4gICAgICAgIH0qKmBcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHVzZXIuYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcclxuICAgICAgICBjb25zdCB2ID0gYXdhaXQgQW5pQmluZERhdGEuVmVyaWZ5KG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgICAgICBpZiAodiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHYuVmVyaWZpZWQpIHtcclxuICAgICAgICAgICAgU2VuZGVyLlNlbmQoXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBgQ29vbCEgWW91ciBBbmlsaXN0IGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XHJcbiAgICAgICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKmFuaWxpc3QgYWJvdXQgc2VjdGlvbioqLmAsXHJcbiAgICAgICAgICAgICAgZG1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBBbmlsaXN0IFN5bmMgQ2VudGVyYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xyXG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcclxuICAgICAgICAgIH0gQ29kZSBub3QgZm91bmQqKiBvbiB5b3VyIHByb2ZpbGUuIFlvdSBmaXJzdCBuZWVkIHRvIHZlcmlmeSB5b3VyIG93bmVyc2hpcC5gLFxyXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXHJcbiAgICAgICAgICBpbWFnZTogeyB1cmw6IGBodHRwczovL2kuaW1ndXIuY29tL1N3S21Fem8ucG5nYCB9LFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgSW5zdHJ1Y3Rpb25gLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqQW5pbGlzdCBhYm91dCBzZWN0aW9uLiouIFlvdSBjYW4gcGxhY2UgaXQgYW55d2hlcmUuXFxuW0VkaXQgUHJvZmlsZV0oaHR0cHM6Ly9hbmlsaXN0LmNvL3NldHRpbmdzKWBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXNvbHZlKGVtYmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZXRDb2RlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCB1c2VyOiBVc2VyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xyXG4gICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHtcclxuICAgICAgICBBbmlCaW5kRGF0YS5JbnNlcnQoXHJcbiAgICAgICAgICBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlcixcclxuICAgICAgICAgIGNvZGVcclxuICAgICAgICApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19