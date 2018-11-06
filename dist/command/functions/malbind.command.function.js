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
        if (mal instanceof mal_bind_model_1.MalBind) {
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
        const about = await mal_1.MAL.GetProfileAbout(command.Parameter);
        if (about.includes(code)) {
            await mal_bind_data_1.MalBindData.Verify(message.author.id).catch(err => {
                console.log(err);
            });
            sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
        }
        else {
            const embed = await this.EmbedTemplate(message, command, code);
            sender_1.Sender.Send(message, embed, dm);
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
            mal_bind_data_1.MalBindData.Insert(message.author.id, command.Parameter, code)
                .then(() => {
                resolve(code);
            })
                .catch((m) => {
                resolve(m.Code);
            });
        });
    }
}
exports.MalBindFunction = MalBindFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbGJpbmQuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQywrREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGdFQUFzRDtBQUN0RCw4Q0FBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELHdDQUFxQztBQUVyQyxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3pFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sS0FBSyxDQUFDLFdBQVcsQ0FDdkIsT0FBZ0IsRUFDaEIsT0FBaUIsRUFDakIsRUFBVyxFQUNYLENBQVM7UUFFVCxNQUFNLElBQUksR0FBRyx3QkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxNQUFN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RTtZQUM3QyxNQUFNLElBQUksR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsMkJBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7aUJBQzNELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFVLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkdELDBDQW1HQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xuaW1wb3J0IHsgTWFsQmluZCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWFsLmJpbmQubW9kZWxcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vLi4vY29yZS9tYWxcIjtcblxuZXhwb3J0IGNsYXNzIE1hbEJpbmRGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgICB0aGlzLkNoZWNrQmluZChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIENoZWNrQmluZChtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjID0gYXdhaXQgdGhpcy5TZXRDb2RlKG1lc3NhZ2UsIGNvbW1hbmQpO1xuICAgIHRoaXMuUHJvY2Vzc0NvZGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBQcm9jZXNzQ29kZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxuICAgIGRtOiBib29sZWFuLFxuICAgIGM6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBjb2RlID0gTWFsQmluZC5Db2RlRm9ybWF0KGMpO1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgaWYgKG1hbCBpbnN0YW5jZW9mIE1hbEJpbmQpIHtcbiAgICAgIGlmIChtYWwuVmVyaWZpZWQgPT09IHRydWUpIHtcbiAgICAgICAgU2VuZGVyLlNlbmQoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBgQ29vbCEgWW91ciBNQUwgYWNjb3VudCBpcyAqKmJpbmRlZCoqIHdpdGggcmlraW1hcnUgZGlzY29yZC4gWW91IGNhbiAqKnJlbW92ZSoqIHRoZSBjb2RlIGluIHlvdXIgKiptYWwgYWJvdXQgc2VjdGlvbioqLmAsXG4gICAgICAgICAgZG1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQ2hlY2tQcm9maWxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtLCBNYWxCaW5kLkNvZGVGb3JtYXQobWFsLkNvZGUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5DaGVja1Byb2ZpbGUobWVzc2FnZSwgY29tbWFuZCwgZG0sIGNvZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgQ2hlY2tQcm9maWxlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY29tbWFuZDogSUNvbW1hbmQsXG4gICAgZG06IGJvb2xlYW4sXG4gICAgY29kZTogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGFib3V0ID0gYXdhaXQgTUFMLkdldFByb2ZpbGVBYm91dChjb21tYW5kLlBhcmFtZXRlcik7XG4gICAgaWYgKGFib3V0LmluY2x1ZGVzKGNvZGUpKSB7XG4gICAgICBhd2FpdCBNYWxCaW5kRGF0YS5WZXJpZnkobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICAgIFNlbmRlci5TZW5kKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBgQ29vbCEgWW91ciBNQUwgYWNjb3VudCBpcyAqKmJpbmRlZCoqIHdpdGggcmlraW1hcnUgZGlzY29yZC4gWW91IGNhbiAqKnJlbW92ZSoqIHRoZSBjb2RlIGluIHlvdXIgKiptYWwgYWJvdXQgc2VjdGlvbioqLmAsXG4gICAgICAgIGRtXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZXNzYWdlLCBjb21tYW5kLCBjb2RlKTtcbiAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBjb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgdGl0bGU6IGBSaWtpbWFydSBNQUwgU3luYyBDZW50ZXJgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKipSaWtpbWFydSBDb2RlIG5vdCBmb3VuZCoqIG9uIHlvdXIgcHJvZmlsZS4gWW91IGZpcnN0IG5lZWQgdG8gdmVyaWZ5IHlvdXIgb3duZXJzaGlwLmAsXG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxuICAgICAgICAgIGltYWdlOiB7IHVybDogYGh0dHBzOi8vaS5pbWd1ci5jb20vOWgzdmVyZS5wbmdgIH0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBJbnN0cnVjdGlvbmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgKkNvcHkgYW5kIHBhc3RlKiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgYmVsb3cgaW4geW91ciAqTUFMIGFib3V0IHNlY3Rpb24uKi4gWW91IGNhbiBwbGFjZSBpdCBhbnl3aGVyZS5cXG5bRWRpdCBQcm9maWxlXShodHRwczovL215YW5pbWVsaXN0Lm5ldC9lZGl0cHJvZmlsZS5waHApYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogYENvZGVgLCB2YWx1ZTogYCoqKiR7Y29kZX0qKipcXG5cXG5FeGFtcGxlOmAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3RlcjogeyBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLCB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCIgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNldENvZGUobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjb2RlID0gUmFuZG9tLlJhbmdlKDEwMDAwMDAwLCA5OTk5OTk5OSkudG9TdHJpbmcoKTtcbiAgICAgIE1hbEJpbmREYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCwgY29tbWFuZC5QYXJhbWV0ZXIsIGNvZGUpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGNvZGUpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKG06IE1hbEJpbmQpID0+IHtcbiAgICAgICAgICByZXNvbHZlKG0uQ29kZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=