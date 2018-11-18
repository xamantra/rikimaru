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
        const c = await this.SetCode(message, command, about);
        this.ProcessCode(message, command, dm, c, about);
    }
    async ProcessCode(message, command, dm, c, about) {
        const code = mal_bind_model_1.MalBind.CodeFormat(c);
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal !== null) {
            if (mal.Verified === true) {
                sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with ${config_1.Config.BOT_NAME}, You can **remove** the code in your **mal about section**.`, dm);
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
        if (about === null) {
            message.channel.send(`:regional_indicator_x: Go me nasai! I wasn't able to find mal user: **${command.Parameter}**`);
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
}
exports.MalBindFunction = MalBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFDM0MsMkVBQThEO0FBRTlELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDekUsTUFBTSxLQUFLLEdBQUcsTUFBTSxTQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lB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QUFJLEVBQUUsYUFBYTs0QkFDbkIsS0FBSyxFQUFFLGdLQUFnSzt5QkFDeEs7d0JBQ0QsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUU7cUJBQ3JEO29CQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLEVBQUU7cUJBQzdCO2lCQUNGO2FBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxPQUFpQixFQUFFLEtBQWE7UUFDaEUsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLElBQUksR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsSUFBSSwrQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsMkJBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2pFLEdBQUcsRUFBRTtvQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FDRixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5JRCwwQ0FtSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgTUFMIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWFsXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIE1hbEJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEludGVybmFsIGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH0pO1xuICAgIHRoaXMuQ2hlY2tCaW5kKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tCaW5kKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGFib3V0ID0gYXdhaXQgTUFMLkdldFByb2ZpbGVBYm91dChjb21tYW5kLlBhcmFtZXRlcik7XG4gICAgY29uc3QgYyA9IGF3YWl0IHRoaXMuU2V0Q29kZShtZXNzYWdlLCBjb21tYW5kLCBhYm91dCk7XG4gICAgdGhpcy5Qcm9jZXNzQ29kZShtZXNzYWdlLCBjb21tYW5kLCBkbSwgYywgYWJvdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBQcm9jZXNzQ29kZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGM6IHN0cmluZyxcbiAgICBhYm91dDogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGNvZGUgPSBNYWxCaW5kLkNvZGVGb3JtYXQoYyk7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICBpZiAobWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICAgIFNlbmRlci5TZW5kKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgYENvb2whIFlvdXIgTUFMIGFjY291bnQgaXMgKipiaW5kZWQqKiB3aXRoICR7XG4gICAgICAgICAgICBDb25maWcuQk9UX05BTUVcbiAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKm1hbCBhYm91dCBzZWN0aW9uKiouYCxcbiAgICAgICAgICBkbVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5DaGVja1Byb2ZpbGUoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBjb21tYW5kLFxuICAgICAgICAgIGRtLFxuICAgICAgICAgIE1hbEJpbmQuQ29kZUZvcm1hdChtYWwuQ29kZSksXG4gICAgICAgICAgYWJvdXRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGNvZGUsIGFib3V0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIENoZWNrUHJvZmlsZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBhYm91dDogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lc3NhZ2UsIGNvbW1hbmQsIGNvZGUpO1xuICAgIGlmIChhYm91dCA9PT0gbnVsbCkge1xuICAgICAgbWVzc2FnZS5jaGFubmVsLnNlbmQoXG4gICAgICAgIGA6cmVnaW9uYWxfaW5kaWNhdG9yX3g6IEdvIG1lIG5hc2FpISBJIHdhc24ndCBhYmxlIHRvIGZpbmQgbWFsIHVzZXI6ICoqJHtcbiAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxuICAgICAgICB9KipgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWJvdXQuaW5jbHVkZXMoY29kZSkpIHtcbiAgICAgICAgY29uc3QgdiA9IGF3YWl0IE1hbEJpbmREYXRhLlZlcmlmeShtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICAgICAgU2VuZGVyLlNlbmQobWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodi5WZXJpZmllZCkge1xuICAgICAgICAgICAgU2VuZGVyLlNlbmQoXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIGBDb29sISBZb3VyIE1BTCBhY2NvdW50IGlzICoqYmluZGVkKiogd2l0aCAke1xuICAgICAgICAgICAgICAgIENvbmZpZy5CT1RfTkFNRVxuICAgICAgICAgICAgICB9LCBZb3UgY2FuICoqcmVtb3ZlKiogdGhlIGNvZGUgaW4geW91ciAqKm1hbCBhYm91dCBzZWN0aW9uKiouYCxcbiAgICAgICAgICAgICAgZG1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgY29kZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICB0aXRsZTogYCR7Q29uZmlnLkJPVF9OQU1FfSBNQUwgU3luYyBDZW50ZXJgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke1xuICAgICAgICAgICAgQ29uZmlnLkJPVF9OQU1FXG4gICAgICAgICAgfSBDb2RlIG5vdCBmb3VuZCoqIG9uIHlvdXIgcHJvZmlsZS4gWW91IGZpcnN0IG5lZWQgdG8gdmVyaWZ5IHlvdXIgb3duZXJzaGlwLmAsXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxuICAgICAgICAgIGltYWdlOiB7IHVybDogYGh0dHBzOi8vaS5pbWd1ci5jb20vVUZMMkxEdS5wbmdgIH0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBJbnN0cnVjdGlvbmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqTUFMIGFib3V0IHNlY3Rpb24uKi4gWW91IGNhbiBwbGFjZSBpdCBhbnl3aGVyZS5cXG5bRWRpdCBQcm9maWxlXShodHRwczovL215YW5pbWVsaXN0Lm5ldC9lZGl0cHJvZmlsZS5waHApYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogYENvZGVgLCB2YWx1ZTogYCoqKiR7Y29kZX0qKipcXG5cXG5FeGFtcGxlOmAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNldENvZGUobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGFib3V0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gUmFuZG9tLlJhbmdlKDEwMDAwMDAwLCA5OTk5OTk5OSkudG9TdHJpbmcoKTtcbiAgICAgIGlmIChOdWxsQ2hlY2suRmluZShhYm91dCkpIHtcbiAgICAgICAgTWFsQmluZERhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkLCBjb21tYW5kLlBhcmFtZXRlciwgY29kZSkudGhlbihcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoY29kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==