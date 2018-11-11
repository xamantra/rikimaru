"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_data_1 = require("./../../data/subscription.data");
const title_helper_1 = require("./../../helpers/title.helper");
const user_data_1 = require("./../../data/user.data");
const search_list_1 = require("./../../core/search.list");
const media_list_handler_1 = require("./../../handlers/media.list.handler");
const media_handler_1 = require("../../handlers/media.handler");
const client_1 = require("../../core/client");
const sender_1 = require("../../core/sender");
const anime_cache_1 = require("../../core/anime.cache");
const queue_data_1 = require("../../data/queue.data");
class SubscribeFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        user_data_1.UserData.Insert(message.author.id).catch((err) => {
            console.log(err);
        });
        const res = await anime_cache_1.AnimeCache.Search(command.Parameter);
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
            await queue_data_1.QueueData.Insert(media.idMal, media.nextAiringEpisode.next);
            const user = await user_data_1.UserData.GetUser(discordId);
            if (user === null)
                return;
            const subbed = await subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id);
            if (subbed === true) {
                const embed = await SubscribeFunction.Embed(message, media, true);
                sender_1.Sender.SendInfo(message, embed, dm);
            }
            else {
                const embed = await SubscribeFunction.Embed(message, media, false);
                sender_1.Sender.SendInfo(message, embed, dm);
            }
        }
        else if (results.length > 1) {
            const embed = await search_list_1.SearchList.Embed(message, command, formattedResults);
            sender_1.Sender.SendInfo(message, embed, dm);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsNEVBQXlFO0FBSXpFLGdFQUE0RDtBQUM1RCw4Q0FBa0Q7QUFDbEQsOENBQTJDO0FBQzNDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFFbEQsTUFBYSxpQkFBaUI7SUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FDbEIsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsT0FBaUIsRUFBRSxFQUFXO1FBQ25FLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sT0FBTyxHQUFHLE1BQU0sNEJBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsTUFBTSw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxN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LE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDdkMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO29CQUMxQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7b0JBQ25CLEdBQUcsRUFBRSxpQ0FBaUMsS0FBSyxDQUFDLEtBQUssR0FBRztvQkFDcEQsV0FBVyxFQUFFLE1BQU07d0JBQ2pCLENBQUMsQ0FBQyxrRkFBa0Y7d0JBQ3BGLENBQUMsQ0FBQywyQ0FBMkM7b0JBQy9DLE1BQU0sRUFBRTt3QkFDTixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRTt3QkFDM0Q7NEJBQ0UsSUFBSSxFQUFFLGlDQUFpQzs0QkFDdkMsS0FBSyxFQUFFLGVBQWU7eUJBQ3ZCO3FCQUNGO29CQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7aUJBQ2hFO2FBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5GRCw4Q0FtRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4vLi4vLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IFNlYXJjaExpc3QgfSBmcm9tIFwiLi8uLi8uLi9jb3JlL3NlYXJjaC5saXN0XCI7XG5pbXBvcnQgeyBNZWRpYUZvcm1hdEhhbmRsZXIgfSBmcm9tIFwiLi8uLi8uLi9oYW5kbGVycy9tZWRpYS5saXN0LmhhbmRsZXJcIjtcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLy4uLy4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVkaWFIYW5kbGVyIH0gZnJvbSBcIi4uLy4uL2hhbmRsZXJzL21lZGlhLmhhbmRsZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuU2VhcmNoKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgU2VhcmNoKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBkbTogYm9vbGVhbikge1xuICAgIFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgQW5pbWVDYWNoZS5TZWFyY2goY29tbWFuZC5QYXJhbWV0ZXIpO1xuICAgIGNvbnN0IG9uZ29pbmcgPSBhd2FpdCBNZWRpYUhhbmRsZXIuT25nb2luZ01lZGlhKHJlcyk7XG4gICAgY29uc3QgdW5yZWxlYXNlZCA9IGF3YWl0IE1lZGlhSGFuZGxlci5VbnJlbGVhc2VkTWVkaWEocmVzKTtcbiAgICBpZiAob25nb2luZy5sZW5ndGggPT09IDAgJiYgdW5yZWxlYXNlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIFNlbmRlci5TZW5kSW5mbyhcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgXCJUaGVyZSBpcyBub3RoaW5nIHRvIHN1YnNjcmliZS4gVGhlIGFuaW1lIHlvdSBzZWFyY2ggbWlnaHQgYmUgKiphbHJlYWR5IGNvbXBsZXRlZCoqIG9yIGl0IGlzICoqbm90IHlldCBhaXJlZCBhbmQgdGhlIHJlbGVhc2UgZGF0ZSBpcyBjdXJyZW50bHkgdW5rbm93bioqLCBvciB0cnkgKiphbm90aGVyIGtleXdvcmQqKi5cIixcbiAgICAgICAgZG1cbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdHM6IElNZWRpYVtdID0gW107XG4gICAgY29uc3QgZm9ybWF0dGVkUmVzdWx0czogYW55W10gPSBbXTtcbiAgICBhd2FpdCBvbmdvaW5nLmZvckVhY2goYXN5bmMgbSA9PiB7XG4gICAgICByZXN1bHRzLnB1c2gobSk7XG4gICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2goTWVkaWFGb3JtYXRIYW5kbGVyLkdldChtKSk7XG4gICAgfSk7XG4gICAgYXdhaXQgdW5yZWxlYXNlZC5mb3JFYWNoKGFzeW5jIG0gPT4ge1xuICAgICAgcmVzdWx0cy5wdXNoKG0pO1xuICAgICAgZm9ybWF0dGVkUmVzdWx0cy5wdXNoKE1lZGlhRm9ybWF0SGFuZGxlci5HZXQobSkpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZGlzY29yZElkID0gbWVzc2FnZS5hdXRob3IuaWQ7XG4gICAgICBjb25zdCBtZWRpYSA9IHJlc3VsdHNbMF07XG4gICAgICBjb25zb2xlLmxvZyhtZWRpYSk7XG4gICAgICBhd2FpdCBRdWV1ZURhdGEuSW5zZXJ0KG1lZGlhLmlkTWFsLCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KTtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCk7XG4gICAgICBpZiAodXNlciA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3Qgc3ViYmVkID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5JbnNlcnQobWVkaWEuaWRNYWwsIHVzZXIuSWQpO1xuICAgICAgaWYgKHN1YmJlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKG1lc3NhZ2UsIG1lZGlhLCB0cnVlKTtcbiAgICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKG1lc3NhZ2UsIG1lZGlhLCBmYWxzZSk7XG4gICAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVzdWx0cy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFNlYXJjaExpc3QuRW1iZWQobWVzc2FnZSwgY29tbWFuZCwgZm9ybWF0dGVkUmVzdWx0cyk7XG4gICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICB9XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgbWVkaWE6IElNZWRpYSwgbmV3U3ViOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIGNvbnN0IHQgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2UgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246IG5ld1N1YlxuICAgICAgICAgICAgPyBgWW91IGFyZSBub3cgc3Vic2NyaWJlZCB0byB0aGlzIGFuaW1lLiAqSSB3aWxsIERNIHlvdSB3aGVuIG5ldyBlcGlzb2RlIGlzIGFpcmVkLipgXG4gICAgICAgICAgICA6IGBZb3UgYXJlIGFscmVhZHkgc3Vic2NyaWJlZCB0byB0aGlzIGFuaW1lLmAsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLCB2YWx1ZTogYFxcYC11bnN1YiAke3R9XFxgYCB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3RlcjogeyBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLCB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCIgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==