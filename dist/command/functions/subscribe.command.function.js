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
const config_1 = require("../../core/config");
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
            if (user === null) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
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
            const client = client_1.ClientManager.Client;
            const t = title_helper_1.TitleHelper.Get(media.title);
            const embed = {
                embed: {
                    color: message.member.highestRole.color,
                    thumbnail: { url: media.coverImage.large },
                    title: `${t}`,
                    url: `${config_1.Config.MAL_ANIME_BASE}/${media.idMal}/`,
                    description: newSub
                        ? `You are now subscribed to this anime. *I will DM you when new episode is aired.*`
                        : `You are already subscribed to this anime.`,
                    fields: [
                        {
                            name: `Links:`,
                            value: `[MyAnimeList](${config_1.Config.MAL_ANIME_BASE}/${media.idMal})  |  [AniList](${config_1.Config.ANI_ANIME_BASE}/${media.id})`
                        }
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
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsNEVBQXlFO0FBSXpFLGdFQUE0RDtBQUM1RCw4Q0FBa0Q7QUFDbEQsOENBQTJDO0FBQzNDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsOENBQTJDO0FBRTNDLE1BQWEsaUJBQWlCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsRUFBVztRQUNuRSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLHdCQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLDRCQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sNEJBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFB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QUFNLENBQUMsR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQzFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDYixHQUFHLEVBQUUsR0FBRyxlQUFNLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUc7b0JBQy9DLFdBQVcsRUFBRSxNQUFNO3dCQUNqQixDQUFDLENBQUMsa0ZBQWtGO3dCQUNwRixDQUFDLENBQUMsMkNBQTJDO29CQUMvQyxNQUFNLEVBQUU7d0JBQ047NEJBQ0UsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsS0FBSyxFQUFFLGlCQUFpQixlQUFNLENBQUMsY0FBYyxJQUMzQyxLQUFLLENBQUMsS0FDUixtQkFBbUIsZUFBTSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsRUFBRSxHQUFHO3lCQUN4RDtxQkFDRjtvQkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtpQkFDRjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExRkQsOENBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLy4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLy4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTZWFyY2hMaXN0IH0gZnJvbSBcIi4vLi4vLi4vY29yZS9zZWFyY2gubGlzdFwiO1xuaW1wb3J0IHsgTWVkaWFGb3JtYXRIYW5kbGVyIH0gZnJvbSBcIi4vLi4vLi4vaGFuZGxlcnMvbWVkaWEubGlzdC5oYW5kbGVyXCI7XG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lZGlhSGFuZGxlciB9IGZyb20gXCIuLi8uLi9oYW5kbGVycy9tZWRpYS5oYW5kbGVyXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuU2VhcmNoKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgU2VhcmNoKG1lc3NhZ2U6IE1lc3NhZ2UsIGNvbW1hbmQ6IElDb21tYW5kLCBkbTogYm9vbGVhbikge1xuICAgIFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgQW5pbWVDYWNoZS5TZWFyY2goY29tbWFuZC5QYXJhbWV0ZXIpO1xuICAgIGNvbnN0IG9uZ29pbmcgPSBhd2FpdCBNZWRpYUhhbmRsZXIuT25nb2luZ01lZGlhKHJlcyk7XG4gICAgY29uc3QgdW5yZWxlYXNlZCA9IGF3YWl0IE1lZGlhSGFuZGxlci5VbnJlbGVhc2VkTWVkaWEocmVzKTtcbiAgICBpZiAob25nb2luZy5sZW5ndGggPT09IDAgJiYgdW5yZWxlYXNlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIFNlbmRlci5TZW5kSW5mbyhcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgXCJUaGVyZSBpcyBub3RoaW5nIHRvIHN1YnNjcmliZS4gVGhlIGFuaW1lIHlvdSBzZWFyY2ggbWlnaHQgYmUgKiphbHJlYWR5IGNvbXBsZXRlZCoqIG9yIGl0IGlzICoqbm90IHlldCBhaXJlZCBhbmQgdGhlIHJlbGVhc2UgZGF0ZSBpcyBjdXJyZW50bHkgdW5rbm93bioqLCBvciB0cnkgKiphbm90aGVyIGtleXdvcmQqKi5cIixcbiAgICAgICAgZG1cbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdHM6IElNZWRpYVtdID0gW107XG4gICAgY29uc3QgZm9ybWF0dGVkUmVzdWx0czogYW55W10gPSBbXTtcbiAgICBhd2FpdCBvbmdvaW5nLmZvckVhY2goYXN5bmMgbSA9PiB7XG4gICAgICByZXN1bHRzLnB1c2gobSk7XG4gICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2goTWVkaWFGb3JtYXRIYW5kbGVyLkdldChtKSk7XG4gICAgfSk7XG4gICAgYXdhaXQgdW5yZWxlYXNlZC5mb3JFYWNoKGFzeW5jIG0gPT4ge1xuICAgICAgcmVzdWx0cy5wdXNoKG0pO1xuICAgICAgZm9ybWF0dGVkUmVzdWx0cy5wdXNoKE1lZGlhRm9ybWF0SGFuZGxlci5HZXQobSkpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZGlzY29yZElkID0gbWVzc2FnZS5hdXRob3IuaWQ7XG4gICAgICBjb25zdCBtZWRpYSA9IHJlc3VsdHNbMF07XG4gICAgICBjb25zb2xlLmxvZyhtZWRpYSk7XG4gICAgICBhd2FpdCBRdWV1ZURhdGEuSW5zZXJ0KG1lZGlhLmlkTWFsLCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KTtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCk7XG4gICAgICBpZiAodXNlciA9PT0gbnVsbCkge1xuICAgICAgICBTZW5kZXIuU2VuZEVycm9yKG1lc3NhZ2UsIGRtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3ViYmVkID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5JbnNlcnQobWVkaWEuaWRNYWwsIHVzZXIuSWQpO1xuICAgICAgaWYgKHN1YmJlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKG1lc3NhZ2UsIG1lZGlhLCB0cnVlKTtcbiAgICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFN1YnNjcmliZUZ1bmN0aW9uLkVtYmVkKG1lc3NhZ2UsIG1lZGlhLCBmYWxzZSk7XG4gICAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVzdWx0cy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IFNlYXJjaExpc3QuRW1iZWQobWVzc2FnZSwgY29tbWFuZCwgZm9ybWF0dGVkUmVzdWx0cyk7XG4gICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICB9XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWVtYmVyLW9yZGVyaW5nXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgbWVkaWE6IElNZWRpYSwgbmV3U3ViOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XG4gICAgICBjb25zdCB0ID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlIH0sXG4gICAgICAgICAgdGl0bGU6IGAke3R9YCxcbiAgICAgICAgICB1cmw6IGAke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHttZWRpYS5pZE1hbH0vYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbmV3U3ViXG4gICAgICAgICAgICA/IGBZb3UgYXJlIG5vdyBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuICpJIHdpbGwgRE0geW91IHdoZW4gbmV3IGVwaXNvZGUgaXMgYWlyZWQuKmBcbiAgICAgICAgICAgIDogYFlvdSBhcmUgYWxyZWFkeSBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuYCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYExpbmtzOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XSgke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHtcbiAgICAgICAgICAgICAgICBtZWRpYS5pZE1hbFxuICAgICAgICAgICAgICB9KSAgfCAgW0FuaUxpc3RdKCR7Q29uZmlnLkFOSV9BTklNRV9CQVNFfS8ke21lZGlhLmlkfSlgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxufVxuIl19