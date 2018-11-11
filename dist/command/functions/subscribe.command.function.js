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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBRTNELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsNEVBQXlFO0FBSXpFLGdFQUE0RDtBQUM1RCw4Q0FBa0Q7QUFDbEQsOENBQTJDO0FBRTNDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFFbEQsTUFBYSxpQkFBaUI7SUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FDbEIsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsT0FBaUIsRUFBRSxFQUFXO1FBQ25FLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sT0FBTyxHQUFHLE1BQU0sNEJBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsTUFBTSw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxN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LE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDdkMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO29CQUMxQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7b0JBQ25CLEdBQUcsRUFBRSxpQ0FBaUMsS0FBSyxDQUFDLEtBQUssR0FBRztvQkFDcEQsV0FBVyxFQUFFLE1BQU07d0JBQ2pCLENBQUMsQ0FBQyxrRkFBa0Y7d0JBQ3BGLENBQUMsQ0FBQywyQ0FBMkM7b0JBQy9DLE1BQU0sRUFBRTt3QkFDTixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRTt3QkFDM0Q7NEJBQ0UsSUFBSSxFQUFFLGlDQUFpQzs0QkFDdkMsS0FBSyxFQUFFLGVBQWU7eUJBQ3ZCO3FCQUNGO29CQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7aUJBQ2hFO2FBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5GRCw4Q0FtRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi8uLi8uLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4vLi4vLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU2VhcmNoTGlzdCB9IGZyb20gXCIuLy4uLy4uL2NvcmUvc2VhcmNoLmxpc3RcIjtcbmltcG9ydCB7IE1lZGlhRm9ybWF0SGFuZGxlciB9IGZyb20gXCIuLy4uLy4uL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlclwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYUhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvbWVkaWEuaGFuZGxlclwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuXG5leHBvcnQgY2xhc3MgU3Vic2NyaWJlRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLlNlYXJjaChtZXNzYWdlLCBjb21tYW5kLCBkbSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFNlYXJjaChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCwgZG06IGJvb2xlYW4pIHtcbiAgICBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFuaW1lQ2FjaGUuU2VhcmNoKGNvbW1hbmQuUGFyYW1ldGVyKTtcbiAgICBjb25zdCBvbmdvaW5nID0gYXdhaXQgTWVkaWFIYW5kbGVyLk9uZ29pbmdNZWRpYShyZXMpO1xuICAgIGNvbnN0IHVucmVsZWFzZWQgPSBhd2FpdCBNZWRpYUhhbmRsZXIuVW5yZWxlYXNlZE1lZGlhKHJlcyk7XG4gICAgaWYgKG9uZ29pbmcubGVuZ3RoID09PSAwICYmIHVucmVsZWFzZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICBTZW5kZXIuU2VuZEluZm8oXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIFwiVGhlcmUgaXMgbm90aGluZyB0byBzdWJzY3JpYmUuIFRoZSBhbmltZSB5b3Ugc2VhcmNoIG1pZ2h0IGJlICoqYWxyZWFkeSBjb21wbGV0ZWQqKiBvciBpdCBpcyAqKm5vdCB5ZXQgYWlyZWQgYW5kIHRoZSByZWxlYXNlIGRhdGUgaXMgY3VycmVudGx5IHVua25vd24qKiwgb3IgdHJ5ICoqYW5vdGhlciBrZXl3b3JkKiouXCIsXG4gICAgICAgIGRtXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHRzOiBJTWVkaWFbXSA9IFtdO1xuICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHM6IGFueVtdID0gW107XG4gICAgYXdhaXQgb25nb2luZy5mb3JFYWNoKGFzeW5jIG0gPT4ge1xuICAgICAgcmVzdWx0cy5wdXNoKG0pO1xuICAgICAgZm9ybWF0dGVkUmVzdWx0cy5wdXNoKE1lZGlhRm9ybWF0SGFuZGxlci5HZXQobSkpO1xuICAgIH0pO1xuICAgIGF3YWl0IHVucmVsZWFzZWQuZm9yRWFjaChhc3luYyBtID0+IHtcbiAgICAgIHJlc3VsdHMucHVzaChtKTtcbiAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaChNZWRpYUZvcm1hdEhhbmRsZXIuR2V0KG0pKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGRpc2NvcmRJZCA9IG1lc3NhZ2UuYXV0aG9yLmlkO1xuICAgICAgY29uc3QgbWVkaWEgPSByZXN1bHRzWzBdO1xuICAgICAgY29uc29sZS5sb2cobWVkaWEpO1xuICAgICAgYXdhaXQgUXVldWVEYXRhLkluc2VydChtZWRpYS5pZE1hbCwgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dCk7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpO1xuICAgICAgaWYgKHVzZXIgPT09IG51bGwpIHJldHVybjtcbiAgICAgIGNvbnN0IHN1YmJlZCA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KG1lZGlhLmlkTWFsLCB1c2VyLklkKTtcbiAgICAgIGlmIChzdWJiZWQgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTdWJzY3JpYmVGdW5jdGlvbi5FbWJlZChtZXNzYWdlLCBtZWRpYSwgdHJ1ZSk7XG4gICAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTdWJzY3JpYmVGdW5jdGlvbi5FbWJlZChtZXNzYWdlLCBtZWRpYSwgZmFsc2UpO1xuICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlc3VsdHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBTZWFyY2hMaXN0LkVtYmVkKG1lc3NhZ2UsIGNvbW1hbmQsIGZvcm1hdHRlZFJlc3VsdHMpO1xuICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UsIG1lZGlhOiBJTWVkaWEsIG5ld1N1YjogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICBjb25zdCB0ID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlIH0sXG4gICAgICAgICAgdGl0bGU6IGAqKioke3R9KioqYCxcbiAgICAgICAgICB1cmw6IGBodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke21lZGlhLmlkTWFsfS9gLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBuZXdTdWJcbiAgICAgICAgICAgID8gYFlvdSBhcmUgbm93IHN1YnNjcmliZWQgdG8gdGhpcyBhbmltZS4gKkkgd2lsbCBETSB5b3Ugd2hlbiBuZXcgZXBpc29kZSBpcyBhaXJlZC4qYFxuICAgICAgICAgICAgOiBgWW91IGFyZSBhbHJlYWR5IHN1YnNjcmliZWQgdG8gdGhpcyBhbmltZS5gLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCwgdmFsdWU6IGBcXGAtdW5zdWIgJHt0fVxcYGAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHsgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCwgdGV4dDogXCLCqSBSaWtpbWFydVwiIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=