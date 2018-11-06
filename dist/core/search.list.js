"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
class SearchList {
    static async Embed(message, command, fields) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.GetClient();
            const embed = {
                embed: {
                    color: message.member.highestRole.color,
                    title: `**Rikimaru Subscription Center**`,
                    thumbnail: { url: client.user.avatarURL },
                    description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
                    fields: fields,
                    timestamp: new Date(),
                    footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
                }
            };
            resolve(embed);
        });
    }
}
exports.SearchList = SearchList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9zZWFyY2gubGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUF5QztBQUd6QyxNQUFhLFVBQVU7SUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsTUFBVztRQUN4RSxPQUFPLElBQUksT0FBTyxDQUFNLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9DLE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDdkMsS0FBSyxFQUFFLGtDQUFrQztvQkFDekMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUN6QyxXQUFXLEVBQUUsK0VBQStFO29CQUM1RixNQUFNLEVBQUUsTUFBTTtvQkFDZCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO2lCQUNoRTthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQkQsZ0NBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NsaWVudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hMaXN0IHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgZmllbGRzOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRpdGxlOiBgKipSaWtpbWFydSBTdWJzY3JpcHRpb24gQ2VudGVyKipgLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCB9LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKlBsZWFzZSBzZWxlY3QgYW4gYW5pbWUgeW91IHdhbnQgdG8gc3Vic2NyaWJlL3Vuc3Vic2NyaWJlIGJ5IGl0cyBleGFjdCB0aXRsZS5gLFxuICAgICAgICAgIGZpZWxkczogZmllbGRzLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHsgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCwgdGV4dDogXCLCqSBSaWtpbWFydVwiIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=