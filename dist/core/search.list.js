"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const config_1 = require("./config");
class SearchList {
    static async Embed(message, command, fields) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.Client;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9zZWFyY2gubGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUF5QztBQUV6QyxxQ0FBa0M7QUFFbEMsTUFBYSxVQUFVO0lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZ0IsRUFBRSxPQUFpQixFQUFFLE1BQVc7UUFDeEUsT0FBTyxJQUFJLE9BQU8sQ0FBTSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2hELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxNQUFNLENBQUM7WUFDMUMsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QyxLQUFLLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSx3QkFBd0I7b0JBQ25ELFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDekMsV0FBVyxFQUFFLCtFQUErRTtvQkFDNUYsTUFBTSxFQUFFLE1BQU07b0JBQ2QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTtxQkFDN0I7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckJELGdDQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi9jbGllbnRcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hMaXN0IHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgZmllbGRzOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkNsaWVudDtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aXRsZTogYCoqJHtDb25maWcuQk9UX05BTUV9IFN1YnNjcmlwdGlvbiBDZW50ZXIqKmAsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqUGxlYXNlIHNlbGVjdCBhbiBhbmltZSB5b3Ugd2FudCB0byBzdWJzY3JpYmUvdW5zdWJzY3JpYmUgYnkgaXRzIGV4YWN0IHRpdGxlLmAsXG4gICAgICAgICAgZmllbGRzOiBmaWVsZHMsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==