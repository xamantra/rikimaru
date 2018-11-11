"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const mal_bind_data_1 = require("../../data/mal.bind.data");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const client_1 = require("../../core/client");
const user_data_1 = require("../../data/user.data");
const mal_1 = require("../../core/mal");
class MalBindFunction {
    async Execute(message, command, dm) {
        await user_data_1.UserData.Insert(message.author.id).catch(err => {
            console.log(err);
        });
        this.CheckBind(message, command, dm);
    }
    async CheckBind(message, command, dm) {
        const c = await this.SetCode(message, command);
        this.ProcessCode(message, command, dm, c);
    }
    async ProcessCode(message, command, dm, c) {
        const code = mal_bind_model_1.MalBind.CodeFormat(c);
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal !== null) {
            if (mal.Verified === true) {
                sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
            }
            else {
                this.CheckProfile(message, command, dm, mal_bind_model_1.MalBind.CodeFormat(mal.Code));
            }
        }
        else {
            this.CheckProfile(message, command, dm, code);
        }
    }
    async CheckProfile(message, command, dm, code) {
        const embed = await this.EmbedTemplate(message, command, code);
        const about = await mal_1.MAL.GetProfileAbout(command.Parameter);
        if (about === null) {
            sender_1.Sender.Send(message, embed, dm);
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
                        sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
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
            const client = await client_1.ClientManager.GetClient();
            const embed = {
                embed: {
                    title: `Rikimaru MAL Sync Center`,
                    description: `**Rikimaru Code not found** on your profile. You first need to verify your ownership.`,
                    color: message.member.highestRole.color,
                    thumbnail: { url: message.author.avatarURL },
                    image: { url: `https://i.imgur.com/9h3vere.png` },
                    fields: [
                        {
                            name: `Instruction`,
                            value: `*Copy and paste* the verification code below in your *MAL about section.*. You can place it anywhere.\n[Edit Profile](https://myanimelist.net/editprofile.php)`
                        },
                        { name: `Code`, value: `***${code}***\n\nExample:` }
                    ],
                    timestamp: new Date(),
                    footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
                }
            };
            resolve(embed);
        });
    }
    SetCode(message, command) {
        return new Promise((resolve, reject) => {
            const code = random_helper_1.Random.Range(10000000, 99999999).toString();
            mal_bind_data_1.MalBindData.Insert(message.author.id, command.Parameter, code).then(() => {
                resolve(code);
            });
        });
    }
}
exports.MalBindFunction = MalBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUVyQyxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sS0FBSyxDQUFDLFdBQVcsQ0FDdkIsT0FBZ0IsRUFDaEIsT0FBaUIsRUFDakIsRUFBVyxFQUNYLENBQVM7UUFFVCxNQUFNLElBQUksR0FBRyx3QkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFNLDJCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3pCLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLHdIQUF3SCxFQUN4SCxFQUFFLENBQ0gsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsd0JBQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdkU7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsWUFBWSxDQUN4QixPQUFnQixFQUNoQixPQUFpQixFQUNqQixFQUFXLEVBQ1gsSUFBWTtRQUVaLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sS0FBSyxHQUFHLE1BQU0sU0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxPQUFPO1NBQ1I7YUFBTTtZQUNMLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLEdBQUcsTUFBTSwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2QsZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNqQztxQkFBTTtvQkFDTCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7d0JBQ2QsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1Asd0hBQXdILEVBQ3hILEVBQUUsQ0FDSCxDQUFDO3FCQUNIO2lCQUNGO2FBQ0Y7aUJBQU07Z0JBQ0wsZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE9BQWdCLEVBQUUsT0FBaUIsRUFBRSxJQUFZO1FBQ3JFLE9BQU8sSUFBSSxPQUFPLENBQU0sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0MsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSwwQkFBMEI7b0JBQ2pDLFdBQVcsRUFBRSx1RkFBdUY7b0JBQ3BHLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQzVDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsRUFBRTtvQkFDakQsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxhQUFhOzRCQUNuQixLQUFLLEVBQUUsZ0tBQWdLO3lCQUN4Szt3QkFDRCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sSUFBSSxpQkFBaUIsRUFBRTtxQkFDckQ7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtpQkFDaEU7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE9BQU8sQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ2pELE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEdBQUcsc0JBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pELDJCQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNqRSxHQUFHLEVBQUU7Z0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExR0QsMENBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBNYWxCaW5kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tYWwuYmluZC5tb2RlbFwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xuXG5leHBvcnQgY2xhc3MgTWFsQmluZEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIHRoaXMuQ2hlY2tCaW5kKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tCaW5kKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGMgPSBhd2FpdCB0aGlzLlNldENvZGUobWVzc2FnZSwgY29tbWFuZCk7XG4gICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFByb2Nlc3NDb2RlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgYzogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGNvZGUgPSBNYWxCaW5kLkNvZGVGb3JtYXQoYyk7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICBpZiAobWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICAgIFNlbmRlci5TZW5kKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgYENvb2whIFlvdXIgTUFMIGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoIHJpa2ltYXJ1IGRpc2NvcmQuIFlvdSBjYW4gKipyZW1vdmUqKiB0aGUgY29kZSBpbiB5b3VyICoqbWFsIGFib3V0IHNlY3Rpb24qKi5gLFxuICAgICAgICAgIGRtXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLkNoZWNrUHJvZmlsZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgTWFsQmluZC5Db2RlRm9ybWF0KG1hbC5Db2RlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjb2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIENoZWNrUHJvZmlsZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGNvZGU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZXNzYWdlLCBjb21tYW5kLCBjb2RlKTtcbiAgICBjb25zdCBhYm91dCA9IGF3YWl0IE1BTC5HZXRQcm9maWxlQWJvdXQoY29tbWFuZC5QYXJhbWV0ZXIpO1xuICAgIGlmIChhYm91dCA9PT0gbnVsbCkge1xuICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFib3V0LmluY2x1ZGVzKGNvZGUpKSB7XG4gICAgICAgIGNvbnN0IHYgPSBhd2FpdCBNYWxCaW5kRGF0YS5WZXJpZnkobWVzc2FnZS5hdXRob3IuaWQpO1xuICAgICAgICBpZiAodiA9PT0gbnVsbCkge1xuICAgICAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHYuVmVyaWZpZWQpIHtcbiAgICAgICAgICAgIFNlbmRlci5TZW5kKFxuICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICBgQ29vbCEgWW91ciBNQUwgYWNjb3VudCBpcyAqKmJpbmRlZCoqIHdpdGggcmlraW1hcnUgZGlzY29yZC4gWW91IGNhbiAqKnJlbW92ZSoqIHRoZSBjb2RlIGluIHlvdXIgKiptYWwgYWJvdXQgc2VjdGlvbioqLmAsXG4gICAgICAgICAgICAgIGRtXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIEVtYmVkVGVtcGxhdGUobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGNvZGU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICB0aXRsZTogYFJpa2ltYXJ1IE1BTCBTeW5jIENlbnRlcmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKlJpa2ltYXJ1IENvZGUgbm90IGZvdW5kKiogb24geW91ciBwcm9maWxlLiBZb3UgZmlyc3QgbmVlZCB0byB2ZXJpZnkgeW91ciBvd25lcnNoaXAuYCxcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgaW1hZ2U6IHsgdXJsOiBgaHR0cHM6Ly9pLmltZ3VyLmNvbS85aDN2ZXJlLnBuZ2AgfSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYEluc3RydWN0aW9uYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGAqQ29weSBhbmQgcGFzdGUqIHRoZSB2ZXJpZmljYXRpb24gY29kZSBiZWxvdyBpbiB5b3VyICpNQUwgYWJvdXQgc2VjdGlvbi4qLiBZb3UgY2FuIHBsYWNlIGl0IGFueXdoZXJlLlxcbltFZGl0IFByb2ZpbGVdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2VkaXRwcm9maWxlLnBocClgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7IGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsIHRleHQ6IFwiwqkgUmlraW1hcnVcIiB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgU2V0Q29kZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xuICAgICAgTWFsQmluZERhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkLCBjb21tYW5kLlBhcmFtZXRlciwgY29kZSkudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==