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
            const client = await client_1.ClientManager.GetClient();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsNEVBQXlFO0FBSXpFLGdFQUE0RDtBQUM1RCw4Q0FBa0Q7QUFDbEQsOENBQTJDO0FBQzNDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsOENBQTJDO0FBRTNDLE1BQWEsaUJBQWlCO0lBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQ2xCLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLE9BQWlCLEVBQUUsRUFBVztRQUNuRSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsR0FBRyxNQUFNLHdCQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLDRCQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sNEJBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFB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QUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDdkMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO29CQUMxQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2IsR0FBRyxFQUFFLEdBQUcsZUFBTSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHO29CQUMvQyxXQUFXLEVBQUUsTUFBTTt3QkFDakIsQ0FBQyxDQUFDLGtGQUFrRjt3QkFDcEYsQ0FBQyxDQUFDLDJDQUEyQztvQkFDL0MsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxRQUFROzRCQUNkLEtBQUssRUFBRSxpQkFBaUIsZUFBTSxDQUFDLGNBQWMsSUFDM0MsS0FBSyxDQUFDLEtBQ1IsbUJBQW1CLGVBQU0sQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLEVBQUUsR0FBRzt5QkFDeEQ7cUJBQ0Y7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTtxQkFDN0I7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUZELDhDQTBGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi8uLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU2VhcmNoTGlzdCB9IGZyb20gXCIuLy4uLy4uL2NvcmUvc2VhcmNoLmxpc3RcIjtcbmltcG9ydCB7IE1lZGlhRm9ybWF0SGFuZGxlciB9IGZyb20gXCIuLy4uLy4uL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlclwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYUhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvbWVkaWEuaGFuZGxlclwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLlNlYXJjaChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFNlYXJjaChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgZG06IGJvb2xlYW4pIHtcbiAgICBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFuaW1lQ2FjaGUuU2VhcmNoKGNvbW1hbmQuUGFyYW1ldGVyKTtcbiAgICBjb25zdCBvbmdvaW5nID0gYXdhaXQgTWVkaWFIYW5kbGVyLk9uZ29pbmdNZWRpYShyZXMpO1xuICAgIGNvbnN0IHVucmVsZWFzZWQgPSBhd2FpdCBNZWRpYUhhbmRsZXIuVW5yZWxlYXNlZE1lZGlhKHJlcyk7XG4gICAgaWYgKG9uZ29pbmcubGVuZ3RoID09PSAwICYmIHVucmVsZWFzZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICBTZW5kZXIuU2VuZEluZm8oXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIFwiVGhlcmUgaXMgbm90aGluZyB0byBzdWJzY3JpYmUuIFRoZSBhbmltZSB5b3Ugc2VhcmNoIG1pZ2h0IGJlICoqYWxyZWFkeSBjb21wbGV0ZWQqKiBvciBpdCBpcyAqKm5vdCB5ZXQgYWlyZWQgYW5kIHRoZSByZWxlYXNlIGRhdGUgaXMgY3VycmVudGx5IHVua25vd24qKiwgb3IgdHJ5ICoqYW5vdGhlciBrZXl3b3JkKiouXCIsXG4gICAgICAgIGRtXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHRzOiBJTWVkaWFbXSA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHM6IGFueVtdID0gW107XG4gICAgYXdhaXQgb25nb2luZy5mb3JFYWNoKGFzeW5jIG0gPT4ge1xuICAgICAgcmVzdWx0cy5wdXNoKG0pO1xuICAgICAgZm9ybWF0dGVkUmVzdWx0cy5wdXNoKE1lZGlhRm9ybWF0SGFuZGxlci5HZXQobSkpO1xuICAgIH0pO1xuICAgIGF3YWl0IHVucmVsZWFzZWQuZm9yRWFjaChhc3luYyBtID0+IHtcbiAgICAgIHJlc3VsdHMucHVzaChtKTtcbiAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaChNZWRpYUZvcm1hdEhhbmRsZXIuR2V0KG0pKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGRpc2NvcmRJZCA9IG1lc3NhZ2UuYXV0aG9yLmlkO1xuICAgICAgY29uc3QgbWVkaWEgPSByZXN1bHRzWzBdO1xuICAgICAgY29uc29sZS5sb2cobWVkaWEpO1xuICAgICAgYXdhaXQgUXVldWVEYXRhLkluc2VydChtZWRpYS5pZE1hbCwgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dCk7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpO1xuICAgICAgaWYgKHVzZXIgPT09IG51bGwpIHtcbiAgICAgICAgU2VuZGVyLlNlbmRFcnJvcihtZXNzYWdlLCBkbSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN1YmJlZCA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KG1lZGlhLmlkTWFsLCB1c2VyLklkKTtcbiAgICAgIGlmIChzdWJiZWQgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTdWJzY3JpYmVGdW5jdGlvbi5FbWJlZChtZXNzYWdlLCBtZWRpYSwgdHJ1ZSk7XG4gICAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTdWJzY3JpYmVGdW5jdGlvbi5FbWJlZChtZXNzYWdlLCBtZWRpYSwgZmFsc2UpO1xuICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlc3VsdHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTZWFyY2hMaXN0LkVtYmVkKG1lc3NhZ2UsIGNvbW1hbmQsIGZvcm1hdHRlZFJlc3VsdHMpO1xuICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UsIG1lZGlhOiBJTWVkaWEsIG5ld1N1YjogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICBjb25zdCB0ID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlIH0sXG4gICAgICAgICAgdGl0bGU6IGAke3R9YCxcbiAgICAgICAgICB1cmw6IGAke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHttZWRpYS5pZE1hbH0vYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbmV3U3ViXG4gICAgICAgICAgICA/IGBZb3UgYXJlIG5vdyBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuICpJIHdpbGwgRE0geW91IHdoZW4gbmV3IGVwaXNvZGUgaXMgYWlyZWQuKmBcbiAgICAgICAgICAgIDogYFlvdSBhcmUgYWxyZWFkeSBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuYCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYExpbmtzOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XSgke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHtcbiAgICAgICAgICAgICAgICBtZWRpYS5pZE1hbFxuICAgICAgICAgICAgICB9KSAgfCAgW0FuaUxpc3RdKCR7Q29uZmlnLkFOSV9BTklNRV9CQVNFfS8ke21lZGlhLmlkfSlgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxufVxuIl19