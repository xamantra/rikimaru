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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBQ3RELDRFQUF5RTtBQUl6RSxnRUFBNEQ7QUFDNUQsOENBQWtEO0FBQ2xELDhDQUEyQztBQUMzQyx3RUFBdUQ7QUFDdkQsd0RBQW9EO0FBRXBELE1BQWEsaUJBQWlCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsRUFBVztRQUNuRSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCx3QkFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSw0QkFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxNQUFNLDRCQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTyxDQUFDLE1B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Rjt3QkFDcEYsQ0FBQyxDQUFDLDJDQUEyQztvQkFDL0MsTUFBTSxFQUFFO3dCQUNOLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFO3dCQUMzRDs0QkFDRSxJQUFJLEVBQUUsaUNBQWlDOzRCQUN2QyxLQUFLLEVBQUUsZUFBZTt5QkFDdkI7cUJBQ0Y7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtpQkFDaEU7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBakhELDhDQWlIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLy4uLy4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi8uLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTZWFyY2hMaXN0IH0gZnJvbSBcIi4vLi4vLi4vY29yZS9zZWFyY2gubGlzdFwiO1xuaW1wb3J0IHsgTWVkaWFGb3JtYXRIYW5kbGVyIH0gZnJvbSBcIi4vLi4vLi4vaGFuZGxlcnMvbWVkaWEubGlzdC5oYW5kbGVyXCI7XG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lZGlhSGFuZGxlciB9IGZyb20gXCIuLi8uLi9oYW5kbGVycy9tZWRpYS5oYW5kbGVyXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuU2VhcmNoKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgU2VhcmNoKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBkbTogYm9vbGVhbikge1xuICAgIFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgQW5pbWVDYWNoZS5TZWFyY2goY29tbWFuZC5QYXJhbWV0ZXIpXG4gICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICBjb25zdCBvbmdvaW5nID0gYXdhaXQgTWVkaWFIYW5kbGVyLk9uZ29pbmdNZWRpYShyZXMpO1xuICAgICAgICBjb25zdCB1bnJlbGVhc2VkID0gYXdhaXQgTWVkaWFIYW5kbGVyLlVucmVsZWFzZWRNZWRpYShyZXMpO1xuICAgICAgICBpZiAob25nb2luZy5sZW5ndGggPT09IDAgJiYgdW5yZWxlYXNlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBTZW5kZXIuU2VuZEluZm8oXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgXCJUaGVyZSBpcyBub3RoaW5nIHRvIHN1YnNjcmliZS4gVGhlIGFuaW1lIHlvdSBzZWFyY2ggbWlnaHQgYmUgKiphbHJlYWR5IGNvbXBsZXRlZCoqIG9yIGl0IGlzICoqbm90IHlldCBhaXJlZCBhbmQgdGhlIHJlbGVhc2UgZGF0ZSBpcyBjdXJyZW50bHkgdW5rbm93bioqLCBvciB0cnkgKiphbm90aGVyIGtleXdvcmQqKi5cIixcbiAgICAgICAgICAgIGRtXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0czogSU1lZGlhW10gPSBbXTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkUmVzdWx0czogYW55W10gPSBbXTtcbiAgICAgICAgYXdhaXQgb25nb2luZy5mb3JFYWNoKGFzeW5jIG0gPT4ge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChtKTtcbiAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2goTWVkaWFGb3JtYXRIYW5kbGVyLkdldChtKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB1bnJlbGVhc2VkLmZvckVhY2goYXN5bmMgbSA9PiB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG0pO1xuICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaChNZWRpYUZvcm1hdEhhbmRsZXIuR2V0KG0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGNvbnN0IGRpc2NvcmRJZCA9IG1lc3NhZ2UuYXV0aG9yLmlkO1xuICAgICAgICAgIGNvbnN0IG1lZGlhID0gcmVzdWx0c1swXTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZWRpYSk7XG4gICAgICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQocmVzdWx0c1swXS50aXRsZSk7XG4gICAgICAgICAgYXdhaXQgTWVkaWFEYXRhLkluc2VydChtZWRpYSwgdGl0bGUpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaChcbiAgICAgICAgICAgIChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChtZWRpYS5pZE1hbCwgKHVzZXIgYXMgVXNlcikuSWQpXG4gICAgICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgU3Vic2NyaWJlRnVuY3Rpb24uRW1iZWQobWVzc2FnZSwgbWVkaWEsIHRydWUpO1xuICAgICAgICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goYXN5bmMgKHJlYXNvbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiRVhJU1RTXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCAkZW1iZWQgPSBhd2FpdCBTdWJzY3JpYmVGdW5jdGlvbi5FbWJlZChcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgJGVtYmVkLCBkbSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTZWFyY2hMaXN0LkVtYmVkKFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBTZW5kZXIuU2VuZEluZm8oXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBcIlNZU1RFTSBFUlJPUiEhIS4gSSBjb3VsZG4ndCBhcHByZWhlbmQuIFBsZWFzZSB0cnkgYWdhaW4uXCIsXG4gICAgICAgICAgZG1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgbWVkaWE6IElNZWRpYSwgbmV3U3ViOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIGNvbnN0IHQgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2UgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246IG5ld1N1YlxuICAgICAgICAgICAgPyBgWW91IGFyZSBub3cgc3Vic2NyaWJlZCB0byB0aGlzIGFuaW1lLiAqSSB3aWxsIERNIHlvdSB3aGVuIG5ldyBlcGlzb2RlIGlzIGFpcmVkLipgXG4gICAgICAgICAgICA6IGBZb3UgYXJlIGFscmVhZHkgc3Vic2NyaWJlZCB0byB0aGlzIGFuaW1lLmAsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLCB2YWx1ZTogYFxcYC11bnN1YiAke3R9XFxgYCB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3RlcjogeyBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLCB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCIgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==