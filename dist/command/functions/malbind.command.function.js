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
        message.channel.send(`Cool! MAL account **"${command.Parameter}"** is **binded** with ${config_1.Config.BOT_NAME}, The code can be remove in **mal about section**.`);
    }
}
exports.MalBindFunction = MalBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFDM0MsMkVBQThEO0FBRTlELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDekUsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsK0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxP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LE9BQWlCO1FBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQix5RUFDRSxPQUFPLENBQUMsU0FDVixJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIsd0JBQXdCLE9BQU8sQ0FBQyxTQUFTLDBCQUN2QyxlQUFNLENBQUMsUUFDVCxvREFBb0QsQ0FDckQsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXpJRCwwQ0F5SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgTUFMIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWFsXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIE1hbEJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEludGVybmFsIGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0pO1xuICAgIHRoaXMuQ2hlY2tCaW5kKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tCaW5kKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGFib3V0ID0gYXdhaXQgTUFMLkdldFByb2ZpbGVBYm91dChjb21tYW5kLlBhcmFtZXRlcik7XG4gICAgaWYgKCFOdWxsQ2hlY2suRmluZShhYm91dCkpIHtcbiAgICAgIHRoaXMuTm90RmluZEVycm9yKG1lc3NhZ2UsIGNvbW1hbmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjID0gYXdhaXQgdGhpcy5TZXRDb2RlKG1lc3NhZ2UsIGNvbW1hbmQsIGFib3V0KTtcbiAgICB0aGlzLlByb2Nlc3NDb2RlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjLCBhYm91dCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFByb2Nlc3NDb2RlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgYzogc3RyaW5nLFxuICAgIGFib3V0OiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgY29kZSA9IE1hbEJpbmQuQ29kZUZvcm1hdChjKTtcbiAgICBjb25zdCBtYWwgPSBhd2FpdCBNYWxCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xuICAgIGlmIChtYWwgIT09IG51bGwpIHtcbiAgICAgIGlmIChtYWwuVmVyaWZpZWQgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5TZW5kT0sobWVzc2FnZSwgY29tbWFuZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICBkbSxcbiAgICAgICAgICBNYWxCaW5kLkNvZGVGb3JtYXQobWFsLkNvZGUpLFxuICAgICAgICAgIGFib3V0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBjb2RlLCBhYm91dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBDaGVja1Byb2ZpbGUoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBjb21tYW5kOiBJQ29tbWFuZCxcbiAgICBkbTogYm9vbGVhbixcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgYWJvdXQ6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZXNzYWdlLCBjb21tYW5kLCBjb2RlKTtcbiAgICBpZiAoIU51bGxDaGVjay5GaW5lKGFib3V0KSkge1xuICAgICAgdGhpcy5Ob3RGaW5kRXJyb3IobWVzc2FnZSwgY29tbWFuZCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhYm91dC5pbmNsdWRlcyhjb2RlKSkge1xuICAgICAgICBjb25zdCB2ID0gYXdhaXQgTWFsQmluZERhdGEuVmVyaWZ5KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICAgICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2LlZlcmlmaWVkKSB7XG4gICAgICAgICAgICB0aGlzLlNlbmRPSyhtZXNzYWdlLCBjb21tYW5kKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBDbGllbnRNYW5hZ2VyLkNsaWVudDtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIHRpdGxlOiBgJHtDb25maWcuQk9UX05BTUV9IE1BTCBTeW5jIENlbnRlcmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKiR7XG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgICAgICB9IENvZGUgbm90IGZvdW5kKiogb24geW91ciBwcm9maWxlLiBZb3UgZmlyc3QgbmVlZCB0byB2ZXJpZnkgeW91ciBvd25lcnNoaXAuYCxcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgaW1hZ2U6IHsgdXJsOiBgaHR0cHM6Ly9pLmltZ3VyLmNvbS9VRkwyTER1LnBuZ2AgfSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYEluc3RydWN0aW9uYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGAqQ29weSBhbmQgcGFzdGUqIHRoZSB2ZXJpZmljYXRpb24gY29kZSBiZWxvdyBpbiB5b3VyICpNQUwgYWJvdXQgc2VjdGlvbi4qLiBZb3UgY2FuIHBsYWNlIGl0IGFueXdoZXJlLlxcbltFZGl0IFByb2ZpbGVdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2VkaXRwcm9maWxlLnBocClgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgU2V0Q29kZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgYWJvdXQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xuICAgICAgaWYgKE51bGxDaGVjay5GaW5lKGFib3V0KSkge1xuICAgICAgICBNYWxCaW5kRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQsIGNvbW1hbmQuUGFyYW1ldGVyLCBjb2RlKS50aGVuKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShjb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgTm90RmluZEVycm9yKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoXG4gICAgICBgOnJlZ2lvbmFsX2luZGljYXRvcl94OiBHbyBtZSBuYXNhaSEgSSB3YXNuJ3QgYWJsZSB0byBmaW5kIG1hbCB1c2VyOiAqKiR7XG4gICAgICAgIGNvbW1hbmQuUGFyYW1ldGVyXG4gICAgICB9KipgXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgU2VuZE9LKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kKSB7XG4gICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoXG4gICAgICBgQ29vbCEgTUFMIGFjY291bnQgKipcIiR7Y29tbWFuZC5QYXJhbWV0ZXJ9XCIqKiBpcyAqKmJpbmRlZCoqIHdpdGggJHtcbiAgICAgICAgQ29uZmlnLkJPVF9OQU1FXG4gICAgICB9LCBUaGUgY29kZSBjYW4gYmUgcmVtb3ZlIGluICoqbWFsIGFib3V0IHNlY3Rpb24qKi5gXG4gICAgKTtcbiAgfVxufVxuIl19