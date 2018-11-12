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
            const client = await client_1.ClientManager.GetClient();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFFM0MsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sb0JBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFpQixFQUFFLE9BQWtCLEVBQUUsRUFBWTtRQUN6RSxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLEtBQUssQ0FBQyxXQUFXLENBQ3ZCLE9BQWdCLEVBQ2hCLE9BQWlCLEVBQ2pCLEVBQVcsRUFDWCxDQUFTO1FBRVQsTUFBTSxJQUFJLEdBQUcsd0JBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxH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QixFQUFFO3FCQUNyRDtvQkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtpQkFDRjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sT0FBTyxDQUFDLE9BQWdCLEVBQUUsT0FBaUI7UUFDakQsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLElBQUksR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsMkJBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsRUFBRTtnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5IRCwwQ0FtSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgTUFMIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWFsXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIE1hbEJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgICB0aGlzLkNoZWNrQmluZChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIENoZWNrQmluZChtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjID0gYXdhaXQgdGhpcy5TZXRDb2RlKG1lc3NhZ2UsIGNvbW1hbmQpO1xuICAgIHRoaXMuUHJvY2Vzc0NvZGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBQcm9jZXNzQ29kZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGM6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBjb2RlID0gTWFsQmluZC5Db2RlRm9ybWF0KGMpO1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgaWYgKG1hbCAhPT0gbnVsbCkge1xuICAgICAgaWYgKG1hbC5WZXJpZmllZCA9PT0gdHJ1ZSkge1xuICAgICAgICBTZW5kZXIuU2VuZChcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGBDb29sISBZb3VyIE1BTCBhY2NvdW50IGlzICoqYmluZGVkKiogd2l0aCAke1xuICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXG4gICAgICAgICAgfSwgWW91IGNhbiAqKnJlbW92ZSoqIHRoZSBjb2RlIGluIHlvdXIgKiptYWwgYWJvdXQgc2VjdGlvbioqLmAsXG4gICAgICAgICAgZG1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBNYWxCaW5kLkNvZGVGb3JtYXQobWFsLkNvZGUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGNvZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tQcm9maWxlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgY29kZTogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lc3NhZ2UsIGNvbW1hbmQsIGNvZGUpO1xuICAgIGNvbnN0IGFib3V0ID0gYXdhaXQgTUFMLkdldFByb2ZpbGVBYm91dChjb21tYW5kLlBhcmFtZXRlcik7XG4gICAgaWYgKGFib3V0ID09PSBudWxsKSB7XG4gICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcbiAgICAgICAgY29uc3QgdiA9IGF3YWl0IE1hbEJpbmREYXRhLlZlcmlmeShtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodi5WZXJpZmllZCkge1xuICAgICAgICAgICAgU2VuZGVyLlNlbmQoXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIGBDb29sISBZb3VyIE1BTCBhY2NvdW50IGlzICoqYmluZGVkKiogd2l0aCAke1xuICAgICAgICAgICAgICAgIENvbmZpZy5CT1RfTkFNRVxuICAgICAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKm1hbCBhYm91dCBzZWN0aW9uKiouYCxcbiAgICAgICAgICAgICAgZG1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIHRpdGxlOiBgJHtDb25maWcuQk9UX05BTUV9IE1BTCBTeW5jIENlbnRlcmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKiR7XG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgICAgICB9IENvZGUgbm90IGZvdW5kKiogb24geW91ciBwcm9maWxlLiBZb3UgZmlyc3QgbmVlZCB0byB2ZXJpZnkgeW91ciBvd25lcnNoaXAuYCxcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgaW1hZ2U6IHsgdXJsOiBgaHR0cHM6Ly9pLmltZ3VyLmNvbS85aDN2ZXJlLnBuZ2AgfSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYEluc3RydWN0aW9uYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGAqQ29weSBhbmQgcGFzdGUqIHRoZSB2ZXJpZmljYXRpb24gY29kZSBiZWxvdyBpbiB5b3VyICpNQUwgYWJvdXQgc2VjdGlvbi4qLiBZb3UgY2FuIHBsYWNlIGl0IGFueXdoZXJlLlxcbltFZGl0IFByb2ZpbGVdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2VkaXRwcm9maWxlLnBocClgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBuYW1lOiBgQ29kZWAsIHZhbHVlOiBgKioqJHtjb2RlfSoqKlxcblxcbkV4YW1wbGU6YCB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgU2V0Q29kZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvZGUgPSBSYW5kb20uUmFuZ2UoMTAwMDAwMDAsIDk5OTk5OTk5KS50b1N0cmluZygpO1xuICAgICAgTWFsQmluZERhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkLCBjb21tYW5kLlBhcmFtZXRlciwgY29kZSkudGhlbihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==