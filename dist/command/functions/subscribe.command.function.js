"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_data_1 = require("./../../data/subscription.data");
const title_helper_1 = require("./../../helpers/title.helper");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("./../../data/user.data");
const search_list_1 = require("./../../core/search.list");
const media_list_handler_1 = require("./../../handlers/media.list.handler");
const media_handler_1 = require("../../handlers/media.handler");
const client_1 = require("../../core/client");
const sender_1 = require("../../core/sender");
const subscription_model_1 = require("../../models/subscription.model");
const anime_cache_1 = require("../../core/anime.cache");
class SubscribeFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        user_data_1.UserData.Insert(message.author.id).catch((err) => {
            console.log(err);
        });
        anime_cache_1.AnimeCache.Search(command.Parameter)
            .then(async (res) => {
            const ongoing = await media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = await media_handler_1.MediaHandler.UnreleasedMedia(res);
            if (ongoing.length === 0 && unreleased.length === 0) {
                sender_1.Sender.SendInfo(message, "There is nothing to subscribe. The anime you search might be **already completed** or it is **not yet aired and the release date is currently unknown**, or try **another keyword**.", dm);
                return;
            }
            const results = [];
            const formattedResults = [];
            await ongoing.forEach(async (m) => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            await unreleased.forEach(async (m) => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            if (results.length === 1) {
                const discordId = message.author.id;
                const media = results[0];
                console.log(media);
                const title = title_helper_1.TitleHelper.Get(results[0].title);
                await media_data_1.MediaData.Insert(media, title).catch((reason) => {
                    console.log(reason.message);
                });
                const user = await user_data_1.UserData.GetUser(discordId).catch((reason) => {
                    console.log(reason.message);
                });
                if (user instanceof subscription_model_1.User === false)
                    return;
                await subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id)
                    .then(async () => {
                    const embed = await SubscribeFunction.Embed(message, media, true);
                    sender_1.Sender.SendInfo(message, embed, dm);
                })
                    .catch(async (reason) => {
                    if (reason === "EXISTS") {
                        const $embed = await SubscribeFunction.Embed(message, media, false);
                        sender_1.Sender.SendInfo(message, $embed, dm);
                    }
                    else {
                        console.log(reason);
                    }
                });
            }
            else if (results.length > 1) {
                const embed = await search_list_1.SearchList.Embed(message, command, formattedResults);
                sender_1.Sender.SendInfo(message, embed, dm);
            }
        })
            .catch((reason) => {
            sender_1.Sender.SendInfo(message, "SYSTEM ERROR!!!. I couldn't apprehend. Please try again.", dm);
            console.log(reason.message);
        });
    }
    // tslint:disable-next-line:member-ordering
    static async Embed(message, media, newSub) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.GetClient();
            const t = title_helper_1.TitleHelper.Get(media.title);
            const embed = {
                embed: {
                    color: message.member.highestRole.color,
                    thumbnail: { url: media.coverImage.large },
                    title: `***${t}***`,
                    url: `https://myanimelist.net/anime/${media.idMal}/`,
                    description: newSub
                        ? `You are now subscribed to this anime. *I will DM you when new episode is aired.*`
                        : `You are already subscribed to this anime.`,
                    fields: [
                        { name: `To unsubscribe, type:`, value: `\`-unsub ${t}\`` },
                        {
                            name: `To view all subscription, type:`,
                            value: `\`-viewsubs\``
                        }
                    ],
                    timestamp: new Date(),
                    footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
                }
            };
            resolve(embed);
        });
    }
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBQ3RELDRFQUF5RTtBQUl6RSxnRUFBNEQ7QUFDNUQsOENBQWtEO0FBQ2xELDhDQUEyQztBQUMzQyx3RUFBdUQ7QUFDdkQsd0RBQW9EO0FBRXBELE1BQWEsaUJBQWlCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsRUFBVztRQUNuRSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCx3QkFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSw0QkFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxNQUFNLDRCQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTyxDQUFDLE1B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Rjt3QkFDcEYsQ0FBQyxDQUFDLDJDQUEyQztvQkFDL0MsTUFBTSxFQUFFO3dCQUNOLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFO3dCQUMzRDs0QkFDRSxJQUFJLEVBQUUsaUNBQWlDOzRCQUN2QyxLQUFLLEVBQUUsZUFBZTt5QkFDdkI7cUJBQ0Y7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtpQkFDaEU7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakhELDhDQWlIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4vLi4vLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcclxuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi8uLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL21lZGlhLmRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hMaXN0IH0gZnJvbSBcIi4vLi4vLi4vY29yZS9zZWFyY2gubGlzdFwiO1xyXG5pbXBvcnQgeyBNZWRpYUZvcm1hdEhhbmRsZXIgfSBmcm9tIFwiLi8uLi8uLi9oYW5kbGVycy9tZWRpYS5saXN0LmhhbmRsZXJcIjtcclxuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNZWRpYUhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvbWVkaWEuaGFuZGxlclwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcclxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShcclxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxyXG4gICAgZG0/OiBib29sZWFuXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLlNlYXJjaChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIFNlYXJjaChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgZG06IGJvb2xlYW4pIHtcclxuICAgIFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgQW5pbWVDYWNoZS5TZWFyY2goY29tbWFuZC5QYXJhbWV0ZXIpXHJcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3Qgb25nb2luZyA9IGF3YWl0IE1lZGlhSGFuZGxlci5PbmdvaW5nTWVkaWEocmVzKTtcclxuICAgICAgICBjb25zdCB1bnJlbGVhc2VkID0gYXdhaXQgTWVkaWFIYW5kbGVyLlVucmVsZWFzZWRNZWRpYShyZXMpO1xyXG4gICAgICAgIGlmIChvbmdvaW5nLmxlbmd0aCA9PT0gMCAmJiB1bnJlbGVhc2VkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmRJbmZvKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBcIlRoZXJlIGlzIG5vdGhpbmcgdG8gc3Vic2NyaWJlLiBUaGUgYW5pbWUgeW91IHNlYXJjaCBtaWdodCBiZSAqKmFscmVhZHkgY29tcGxldGVkKiogb3IgaXQgaXMgKipub3QgeWV0IGFpcmVkIGFuZCB0aGUgcmVsZWFzZSBkYXRlIGlzIGN1cnJlbnRseSB1bmtub3duKiosIG9yIHRyeSAqKmFub3RoZXIga2V5d29yZCoqLlwiLFxyXG4gICAgICAgICAgICBkbVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzdWx0czogSU1lZGlhW10gPSBbXTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHRzOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGF3YWl0IG9uZ29pbmcuZm9yRWFjaChhc3luYyBtID0+IHtcclxuICAgICAgICAgIHJlc3VsdHMucHVzaChtKTtcclxuICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaChNZWRpYUZvcm1hdEhhbmRsZXIuR2V0KG0pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCB1bnJlbGVhc2VkLmZvckVhY2goYXN5bmMgbSA9PiB7XHJcbiAgICAgICAgICByZXN1bHRzLnB1c2gobSk7XHJcbiAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2goTWVkaWFGb3JtYXRIYW5kbGVyLkdldChtKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBkaXNjb3JkSWQgPSBtZXNzYWdlLmF1dGhvci5pZDtcclxuICAgICAgICAgIGNvbnN0IG1lZGlhID0gcmVzdWx0c1swXTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcclxuICAgICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KHJlc3VsdHNbMF0udGl0bGUpO1xyXG4gICAgICAgICAgYXdhaXQgTWVkaWFEYXRhLkluc2VydChtZWRpYSwgdGl0bGUpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaChcclxuICAgICAgICAgICAgKHJlYXNvbjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIgPT09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChtZWRpYS5pZE1hbCwgKHVzZXIgYXMgVXNlcikuSWQpXHJcbiAgICAgICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKG1lc3NhZ2UsIG1lZGlhLCB0cnVlKTtcclxuICAgICAgICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGFzeW5jIChyZWFzb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiRVhJU1RTXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKFxyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICBtZWRpYSxcclxuICAgICAgICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgJGVtYmVkLCBkbSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTZWFyY2hMaXN0LkVtYmVkKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBjb21tYW5kLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcclxuICAgICAgICBTZW5kZXIuU2VuZEluZm8oXHJcbiAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgXCJTWVNURU0gRVJST1IhISEuIEkgY291bGRuJ3QgYXBwcmVoZW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiLFxyXG4gICAgICAgICAgZG1cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBtZWRpYTogSU1lZGlhLCBuZXdTdWI6IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcclxuICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XHJcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlIH0sXHJcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxyXG4gICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBuZXdTdWJcclxuICAgICAgICAgICAgPyBgWW91IGFyZSBub3cgc3Vic2NyaWJlZCB0byB0aGlzIGFuaW1lLiAqSSB3aWxsIERNIHlvdSB3aGVuIG5ldyBlcGlzb2RlIGlzIGFpcmVkLipgXHJcbiAgICAgICAgICAgIDogYFlvdSBhcmUgYWxyZWFkeSBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuYCxcclxuICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7IG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLCB2YWx1ZTogYFxcYC11bnN1YiAke3R9XFxgYCB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7IGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsIHRleHQ6IFwiwqkgUmlraW1hcnVcIiB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXNvbHZlKGVtYmVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=