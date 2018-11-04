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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9zZWFyY2gubGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUF5QztBQUd6QyxNQUFhLFVBQVU7SUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsTUFBVztRQUN4RSxPQUFPLElBQUksT0FBTyxDQUFNLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9DLE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDdkMsS0FBSyxFQUFFLGtDQUFrQztvQkFDekMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUN6QyxXQUFXLEVBQUUsK0VBQStFO29CQUM1RixNQUFNLEVBQUUsTUFBTTtvQkFDZCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO2lCQUNoRTthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQkQsZ0NBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2xpZW50XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaExpc3Qge1xyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGZpZWxkczogYW55KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aXRsZTogYCoqUmlraW1hcnUgU3Vic2NyaXB0aW9uIENlbnRlcioqYCxcclxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCB9LFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqUGxlYXNlIHNlbGVjdCBhbiBhbmltZSB5b3Ugd2FudCB0byBzdWJzY3JpYmUvdW5zdWJzY3JpYmUgYnkgaXRzIGV4YWN0IHRpdGxlLmAsXHJcbiAgICAgICAgICBmaWVsZHM6IGZpZWxkcyxcclxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgIGZvb3RlcjogeyBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLCB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCIgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmVzb2x2ZShlbWJlZCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19