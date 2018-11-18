"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const mal_bind_data_1 = require("../../data/mal.bind.data");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const client_1 = require("../../core/client");
const user_data_1 = require("../../data/user.data");
const mal_1 = require("../../core/mal");
const config_1 = require("../../core/config");
const null_checker_helper_1 = require("../../helpers/null.checker.helper");
class MalBindFunction {
    async Execute(message, command, dm) {
        await user_data_1.UserData.Insert(message.author.id).catch((err) => {
            console.log(`Internal error: ${err.message}`);
        });
        this.CheckBind(message, command, dm);
    }
    async CheckBind(message, command, dm) {
        const about = await mal_1.MAL.GetProfileAbout(command.Parameter);
        if (!null_checker_helper_1.NullCheck.Fine(about)) {
            this.NotFindError(message, command);
            return;
        }
        const c = await this.SetCode(message, command, about);
        this.ProcessCode(message, command, dm, c, about);
    }
    async ProcessCode(message, command, dm, c, about) {
        const code = mal_bind_model_1.MalBind.CodeFormat(c);
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal !== null) {
            if (mal.Verified === true) {
                this.SendOK(message, command);
                return;
            }
            else {
                this.CheckProfile(message, command, dm, mal_bind_model_1.MalBind.CodeFormat(mal.Code), about);
            }
        }
        else {
            this.CheckProfile(message, command, dm, code, about);
        }
    }
    async CheckProfile(message, command, dm, code, about) {
        const embed = await this.EmbedTemplate(message, command, code);
        if (!null_checker_helper_1.NullCheck.Fine(about)) {
            this.NotFindError(message, command);
            return;
        }
        else {
            if (about.includes(code)) {
                const v = await mal_bind_data_1.MalBindData.Verify(message.author.id);
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
    }
    EmbedTemplate(message, command, code) {
        return new Promise(async (resolve, reject) => {
            const client = client_1.ClientManager.Client;
            const embed = {
                embed: {
                    title: `${config_1.Config.BOT_NAME} MAL Sync Center`,
                    description: `**${config_1.Config.BOT_NAME} Code not found** on your profile. You first need to verify your ownership.`,
                    color: message.member.highestRole.color,
                    thumbnail: { url: message.author.avatarURL },
                    image: { url: `https://i.imgur.com/UFL2LDu.png` },
                    fields: [
                        {
                            name: `Instruction`,
                            value: `*Copy and paste* the verification code below in your *MAL about section.*. You can place it anywhere.\n[Edit Profile](https://myanimelist.net/editprofile.php)`
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
    SetCode(message, command, about) {
        return new Promise((resolve, reject) => {
            const code = random_helper_1.Random.Range(10000000, 99999999).toString();
            if (null_checker_helper_1.NullCheck.Fine(about)) {
                mal_bind_data_1.MalBindData.Insert(message.author.id, command.Parameter, code).then(() => {
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
    SendOK(message, command) {
        message.channel.send(`:white_check_mark: Cool! MAL account **"${command.Parameter}"** is **binded** with ${config_1.Config.BOT_NAME}, The code can be remove in **mal about section**.`);
    }
}
exports.MalBindFunction = MalBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFDM0MsMkVBQThEO0FBRTlELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDekUsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsK0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLEtBQUssQ0FBQyxXQUFXLENBQ3ZCLE9BQWdCLEVBQ2hCLE9BQWlCLEVBQ2pCLEVBQVcsRUFDWCxDQUFTLEVBQ1QsS0FBYTtRQUViLE1BQU0sSUFBSSxHQUFHLHdCQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLE9BQU87YUFDUjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUNmLE9BQU8sRUFDUCxPQUFPLEVBQ1AsRUFBRSxFQUNGLHdCQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDNUIsS0FBSyxDQUNOLENBQUM7YUFDSDtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsWUFBWSxDQUN4QixPQUFnQixFQUNoQixPQUFpQixFQUNqQixFQUFXLEVBQ1gsSUFBWSxFQUNaLEtBQWE7UUFFYixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsK0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO2FBQU07WUFDTCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNkLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO3dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUM5QixPQUFPO3FCQUNSO2lCQUNGO2FBQ0Y7aUJBQU07Z0JBQ0wsZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQWdCLEVBQUUsT0FBaUIsRUFBRSxJQUFZO1FBQ3JFLE9BQU8sSUFBSSxPQUFPLENBQU0sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLEtBQUssR0FBRztnQkFDWixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLEdBQUcsZUFBTSxDQUFDLFFBQVEsa0JBQWtCO29CQUMzQyxXQUFXLEVBQUUsS0FDWCxlQUFNLENBQUMsUUFDVCw2RUFBNkU7b0JBQzdFLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQzVDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsRUFBRTtvQkFDakQsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxhQUFhOzRCQUNuQixLQUFLLEVBQUUsZ0tBQWdLO3lCQUN4Szt3QkFDRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRTtxQkFDckQ7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTtxQkFDN0I7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE9BQU8sQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsS0FBYTtRQUNoRSxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sSUFBSSxHQUFHLHNCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6RCxJQUFJLCtCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QiwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDakUsR0FBRyxFQUFFO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFlBQVksQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQix5RUFDRSxPQUFPLENBQUMsU0FDVixJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsMkNBQ0UsT0FBTyxDQUFDLFNBQ1YsMEJBQ0UsZUFBTSxDQUFDLFFBQ1Qsb0RBQW9ELENBQ3JELENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEzSUQsMENBMklDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBNYWxCaW5kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tYWwuYmluZC5tb2RlbFwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWxCaW5kRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBJbnRlcm5hbCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9KTtcbiAgICB0aGlzLkNoZWNrQmluZChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIENoZWNrQmluZChtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBhYm91dCA9IGF3YWl0IE1BTC5HZXRQcm9maWxlQWJvdXQoY29tbWFuZC5QYXJhbWV0ZXIpO1xuICAgIGlmICghTnVsbENoZWNrLkZpbmUoYWJvdXQpKSB7XG4gICAgICB0aGlzLk5vdEZpbmRFcnJvcihtZXNzYWdlLCBjb21tYW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYyA9IGF3YWl0IHRoaXMuU2V0Q29kZShtZXNzYWdlLCBjb21tYW5kLCBhYm91dCk7XG4gICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYywgYWJvdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBQcm9jZXNzQ29kZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGM6IHN0cmluZyxcbiAgICBhYm91dDogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGNvZGUgPSBNYWxCaW5kLkNvZGVGb3JtYXQoYyk7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICBpZiAobWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuU2VuZE9LKG1lc3NhZ2UsIGNvbW1hbmQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLkNoZWNrUHJvZmlsZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgZG0sXG4gICAgICAgICAgTWFsQmluZC5Db2RlRm9ybWF0KG1hbC5Db2RlKSxcbiAgICAgICAgICBhYm91dFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkNoZWNrUHJvZmlsZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgY29kZSwgYWJvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tQcm9maWxlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgY29kZTogc3RyaW5nLFxuICAgIGFib3V0OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUobWVzc2FnZSwgY29tbWFuZCwgY29kZSk7XG4gICAgaWYgKCFOdWxsQ2hlY2suRmluZShhYm91dCkpIHtcbiAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcbiAgICAgICAgY29uc3QgdiA9IGF3YWl0IE1hbEJpbmREYXRhLlZlcmlmeShtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodi5WZXJpZmllZCkge1xuICAgICAgICAgICAgdGhpcy5TZW5kT0sobWVzc2FnZSwgY29tbWFuZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBNQUwgU3luYyBDZW50ZXJgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xuICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXG4gICAgICAgICAgfSBDb2RlIG5vdCBmb3VuZCoqIG9uIHlvdXIgcHJvZmlsZS4gWW91IGZpcnN0IG5lZWQgdG8gdmVyaWZ5IHlvdXIgb3duZXJzaGlwLmAsXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxuICAgICAgICAgIGltYWdlOiB7IHVybDogYGh0dHBzOi8vaS5pbWd1ci5jb20vVUZMMkxEdS5wbmdgIH0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBJbnN0cnVjdGlvbmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqTUFMIGFib3V0IHNlY3Rpb24uKi4gWW91IGNhbiBwbGFjZSBpdCBhbnl3aGVyZS5cXG5bRWRpdCBQcm9maWxlXShodHRwczovL215YW5pbWVsaXN0Lm5ldC9lZGl0cHJvZmlsZS5waHApYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogYENvZGVgLCB2YWx1ZTogYCoqKiR7Y29kZX0qKipcXG5cXG5FeGFtcGxlOmAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNldENvZGUobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGFib3V0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gUmFuZG9tLlJhbmdlKDEwMDAwMDAwLCA5OTk5OTk5OSkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChOdWxsQ2hlY2suRmluZShhYm91dCkpIHtcbiAgICAgICAgTWFsQmluZERhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkLCBjb21tYW5kLlBhcmFtZXRlciwgY29kZSkudGhlbihcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIE5vdEZpbmRFcnJvcihtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxuICAgICAgYDpyZWdpb25hbF9pbmRpY2F0b3JfeDogR28gbWUgbmFzYWkhIEkgd2Fzbid0IGFibGUgdG8gZmluZCBtYWwgdXNlcjogKioke1xuICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxuICAgICAgfSoqYFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIFNlbmRPSyhtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKFxuICAgICAgYDp3aGl0ZV9jaGVja19tYXJrOiBDb29sISBNQUwgYWNjb3VudCAqKlwiJHtcbiAgICAgICAgY29tbWFuZC5QYXJhbWV0ZXJcbiAgICAgIH1cIioqIGlzICoqYmluZGVkKiogd2l0aCAke1xuICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgIH0sIFRoZSBjb2RlIGNhbiBiZSByZW1vdmUgaW4gKiptYWwgYWJvdXQgc2VjdGlvbioqLmBcbiAgICApO1xuICB9XG59XG4iXX0=