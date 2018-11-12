"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const config_1 = require("./config");
class SearchList {
    static async Embed(message, command, fields) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.GetClient();
            const embed = {
                embed: {
                    color: message.member.highestRole.color,
                    title: `**${config_1.Config.BOT_NAME} Subscription Center**`,
                    thumbnail: { url: client.user.avatarURL },
                    description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
                    fields: fields,
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
}
exports.SearchList = SearchList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9zZWFyY2gubGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUF5QztBQUV6QyxxQ0FBa0M7QUFFbEMsTUFBYSxVQUFVO0lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZ0IsRUFBRSxPQUFpQixFQUFFLE1BQVc7UUFDeEUsT0FBTyxJQUFJLE9BQU8sQ0FBTSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2hELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQyxNQUFNLEtBQUssR0FBRztnQkFDWixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7b0JBQ3ZDLEtBQUssRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLHdCQUF3QjtvQkFDbkQsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUN6QyxXQUFXLEVBQUUsK0VBQStFO29CQUM1RixNQUFNLEVBQUUsTUFBTTtvQkFDZCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtpQkFDRjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyQkQsZ0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NsaWVudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIFNlYXJjaExpc3Qge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBmaWVsZHM6IGFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGl0bGU6IGAqKiR7Q29uZmlnLkJPVF9OQU1FfSBTdWJzY3JpcHRpb24gQ2VudGVyKipgLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCB9LFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKlBsZWFzZSBzZWxlY3QgYW4gYW5pbWUgeW91IHdhbnQgdG8gc3Vic2NyaWJlL3Vuc3Vic2NyaWJlIGJ5IGl0cyBleGFjdCB0aXRsZS5gLFxuICAgICAgICAgIGZpZWxkczogZmllbGRzLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=