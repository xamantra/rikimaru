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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvc3Vic2NyaWJlLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzRUFBa0U7QUFDbEUsK0RBQTJEO0FBQzNELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsNEVBQXlFO0FBSXpFLGdFQUE0RDtBQUM1RCw4Q0FBa0Q7QUFDbEQsOENBQTJDO0FBQzNDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFFbEQsTUFBYSxpQkFBaUI7SUFDckIsS0FBSyxDQUFDLE9BQU8sQ0FDbEIsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsT0FBaUIsRUFBRSxFQUFXO1FBQ25FLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sT0FBTyxHQUFHLE1BQU0sNEJBQVksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsTUFBTSw0QkFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxN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LENBQUMsR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQzFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztvQkFDbkIsR0FBRyxFQUFFLGlDQUFpQyxLQUFLLENBQUMsS0FBSyxHQUFHO29CQUNwRCxXQUFXLEVBQUUsTUFBTTt3QkFDakIsQ0FBQyxDQUFDLGtGQUFrRjt3QkFDcEYsQ0FBQyxDQUFDLDJDQUEyQztvQkFDL0MsTUFBTSxFQUFFO3dCQUNOLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFO3dCQUMzRDs0QkFDRSxJQUFJLEVBQUUsaUNBQWlDOzRCQUN2QyxLQUFLLEVBQUUsZUFBZTt5QkFDdkI7cUJBQ0Y7b0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtpQkFDaEU7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdEZELDhDQXNGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi8uLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU2VhcmNoTGlzdCB9IGZyb20gXCIuLy4uLy4uL2NvcmUvc2VhcmNoLmxpc3RcIjtcbmltcG9ydCB7IE1lZGlhRm9ybWF0SGFuZGxlciB9IGZyb20gXCIuLy4uLy4uL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlclwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4vLi4vLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYUhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvbWVkaWEuaGFuZGxlclwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnNjcmliZUZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIHB1YmxpYyBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5TZWFyY2gobWVzc2FnZSwgY29tbWFuZCwgZG0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBTZWFyY2gobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGRtOiBib29sZWFuKSB7XG4gICAgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBBbmltZUNhY2hlLlNlYXJjaChjb21tYW5kLlBhcmFtZXRlcik7XG4gICAgY29uc3Qgb25nb2luZyA9IGF3YWl0IE1lZGlhSGFuZGxlci5PbmdvaW5nTWVkaWEocmVzKTtcbiAgICBjb25zdCB1bnJlbGVhc2VkID0gYXdhaXQgTWVkaWFIYW5kbGVyLlVucmVsZWFzZWRNZWRpYShyZXMpO1xuICAgIGlmIChvbmdvaW5nLmxlbmd0aCA9PT0gMCAmJiB1bnJlbGVhc2VkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgU2VuZGVyLlNlbmRJbmZvKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBcIlRoZXJlIGlzIG5vdGhpbmcgdG8gc3Vic2NyaWJlLiBUaGUgYW5pbWUgeW91IHNlYXJjaCBtaWdodCBiZSAqKmFscmVhZHkgY29tcGxldGVkKiogb3IgaXQgaXMgKipub3QgeWV0IGFpcmVkIGFuZCB0aGUgcmVsZWFzZSBkYXRlIGlzIGN1cnJlbnRseSB1bmtub3duKiosIG9yIHRyeSAqKmFub3RoZXIga2V5d29yZCoqLlwiLFxuICAgICAgICBkbVxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0czogSU1lZGlhW10gPSBbXTtcbiAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHRzOiBhbnlbXSA9IFtdO1xuICAgIGF3YWl0IG9uZ29pbmcuZm9yRWFjaChhc3luYyBtID0+IHtcbiAgICAgIHJlc3VsdHMucHVzaChtKTtcbiAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaChNZWRpYUZvcm1hdEhhbmRsZXIuR2V0KG0pKTtcbiAgICB9KTtcbiAgICBhd2FpdCB1bnJlbGVhc2VkLmZvckVhY2goYXN5bmMgbSA9PiB7XG4gICAgICByZXN1bHRzLnB1c2gobSk7XG4gICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2goTWVkaWFGb3JtYXRIYW5kbGVyLkdldChtKSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBkaXNjb3JkSWQgPSBtZXNzYWdlLmF1dGhvci5pZDtcbiAgICAgIGNvbnN0IG1lZGlhID0gcmVzdWx0c1swXTtcbiAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcbiAgICAgIGF3YWl0IFF1ZXVlRGF0YS5JbnNlcnQobWVkaWEuaWRNYWwsIG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKTtcbiAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJiZWQgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChtZWRpYS5pZE1hbCwgdXNlci5JZCk7XG4gICAgICBpZiAoc3ViYmVkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgU3Vic2NyaWJlRnVuY3Rpb24uRW1iZWQobWVzc2FnZSwgbWVkaWEsIHRydWUpO1xuICAgICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgU3Vic2NyaWJlRnVuY3Rpb24uRW1iZWQobWVzc2FnZSwgbWVkaWEsIGZhbHNlKTtcbiAgICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZXN1bHRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgU2VhcmNoTGlzdC5FbWJlZChtZXNzYWdlLCBjb21tYW5kLCBmb3JtYXR0ZWRSZXN1bHRzKTtcbiAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBtZWRpYTogSU1lZGlhLCBuZXdTdWI6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVkaWEuY292ZXJJbWFnZS5sYXJnZSB9LFxuICAgICAgICAgIHRpdGxlOiBgKioqJHt0fSoqKmAsXG4gICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbmV3U3ViXG4gICAgICAgICAgICA/IGBZb3UgYXJlIG5vdyBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuICpJIHdpbGwgRE0geW91IHdoZW4gbmV3IGVwaXNvZGUgaXMgYWlyZWQuKmBcbiAgICAgICAgICAgIDogYFlvdSBhcmUgYWxyZWFkeSBzdWJzY3JpYmVkIHRvIHRoaXMgYW5pbWUuYCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsIHZhbHVlOiBgXFxgLXVuc3ViICR7dH1cXGBgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7IGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsIHRleHQ6IFwiwqkgUmlraW1hcnVcIiB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICB9KTtcbiAgfVxufVxuIl19