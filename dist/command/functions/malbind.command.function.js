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
                sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **mal about section**.`, dm);
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
                        sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **mal about section**.`, dm);
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
                    image: { url: `https://i.imgur.com/9h3vere.png` },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFFM0MsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sb0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFpQixFQUFFLE9BQWtCLEVBQUUsRUFBWTtRQUN6RSxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLEtBQUssQ0FBQyxXQUFXLENBQ3ZCLE9BQWdCLEVBQ2hCLE9BQWlCLEVBQ2pCLEVBQVcsRUFDWCxDQUFTO1FBRVQsTUFBTSxJQUFJLEdBQUcsd0JBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxH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Q3JEO29CQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLEVBQUU7cUJBQzdCO2lCQUNGO2FBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNqRCxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sSUFBSSxHQUFHLHNCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6RCwyQkFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDakUsR0FBRyxFQUFFO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkhELDBDQW1IQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xuaW1wb3J0IHsgTWFsQmluZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWFsLmJpbmQubW9kZWxcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vLi4vY29yZS9tYWxcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgTWFsQmluZEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIHRoaXMuQ2hlY2tCaW5kKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tCaW5kKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGMgPSBhd2FpdCB0aGlzLlNldENvZGUobWVzc2FnZSwgY29tbWFuZCk7XG4gICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFByb2Nlc3NDb2RlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgYzogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGNvZGUgPSBNYWxCaW5kLkNvZGVGb3JtYXQoYyk7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICBpZiAobWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICAgIFNlbmRlci5TZW5kKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgYENvb2whIFlvdXIgTUFMIGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKm1hbCBhYm91dCBzZWN0aW9uKiouYCxcbiAgICAgICAgICBkbVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIE1hbEJpbmQuQ29kZUZvcm1hdChtYWwuQ29kZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLkNoZWNrUHJvZmlsZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgY29kZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBDaGVja1Byb2ZpbGUoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBjb21tYW5kOiBJQ29tbWFuZCxcbiAgICBkbTogYm9vbGVhbixcbiAgICBjb2RlOiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUobWVzc2FnZSwgY29tbWFuZCwgY29kZSk7XG4gICAgY29uc3QgYWJvdXQgPSBhd2FpdCBNQUwuR2V0UHJvZmlsZUFib3V0KGNvbW1hbmQuUGFyYW1ldGVyKTtcbiAgICBpZiAoYWJvdXQgPT09IG51bGwpIHtcbiAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhYm91dC5pbmNsdWRlcyhjb2RlKSkge1xuICAgICAgICBjb25zdCB2ID0gYXdhaXQgTWFsQmluZERhdGEuVmVyaWZ5KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICAgICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2LlZlcmlmaWVkKSB7XG4gICAgICAgICAgICBTZW5kZXIuU2VuZChcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgYENvb2whIFlvdXIgTUFMIGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XG4gICAgICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXG4gICAgICAgICAgICAgIH0sIFlvdSBjYW4gKipyZW1vdmUqKiB0aGUgY29kZSBpbiB5b3VyICoqbWFsIGFib3V0IHNlY3Rpb24qKi5gLFxuICAgICAgICAgICAgICBkbVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBDbGllbnRNYW5hZ2VyLkNsaWVudDtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIHRpdGxlOiBgJHtDb25maWcuQk9UX05BTUV9IE1BTCBTeW5jIENlbnRlcmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKiR7XG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgICAgICB9IENvZGUgbm90IGZvdW5kKiogb24geW91ciBwcm9maWxlLiBZb3UgZmlyc3QgbmVlZCB0byB2ZXJpZnkgeW91ciBvd25lcnNoaXAuYCxcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgaW1hZ2U6IHsgdXJsOiBgaHR0cHM6Ly9pLmltZ3VyLmNvbS85aDN2ZXJlLnBuZ2AgfSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYEluc3RydWN0aW9uYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGAqQ29weSBhbmQgcGFzdGUqIHRoZSB2ZXJpZmljYXRpb24gY29kZSBiZWxvdyBpbiB5b3VyICpNQUwgYWJvdXQgc2VjdGlvbi4qLiBZb3UgY2FuIHBsYWNlIGl0IGFueXdoZXJlLlxcbltFZGl0IFByb2ZpbGVdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2VkaXRwcm9maWxlLnBocClgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgU2V0Q29kZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xuICAgICAgTWFsQmluZERhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkLCBjb21tYW5kLlBhcmFtZXRlciwgY29kZSkudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==