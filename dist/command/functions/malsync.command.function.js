"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_bind_data_1 = require("../../data/mal.bind.data");
const sender_1 = require("../../core/sender");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const mal_1 = require("../../core/mal");
const anime_cache_1 = require("../../core/anime.cache");
const queue_data_1 = require("../../data/queue.data");
const media_status_1 = require("../../core/media.status");
class MalSyncFunction {
    async Execute(message, command, dm) {
        await this.GetAll(message, dm).catch(err => {
            console.log(err);
            this.SendStatus(message, dm);
        });
        const client = await client_1.ClientManager.GetClient();
        const res$m = `Your *MAL currently watching list* is now synced with your subscriptions.`;
        sender_1.Sender.Send(message, {
            embed: {
                color: message.member.highestRole.color,
                thumbnail: { url: message.author.avatarURL },
                title: `Rikimaru MAL Auto Subscribe`,
                description: res$m,
                fields: [
                    {
                        name: `To unsubscribe, type:`,
                        value: `\`-unsub anime title or keyword here\``
                    },
                    {
                        name: `To view all subscription, type:`,
                        value: `\`-viewsubs\``
                    },
                    {
                        name: `Please Note: `,
                        value: `If you've just modified your list, please wait at least 1 minute to **-malsync**.`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        }, dm);
    }
    GetAll(message, dm) {
        return new Promise(async (resolve, reject) => {
            await user_data_1.UserData.Insert(message.author.id).catch(err => console.log(err));
            this.Run(resolve, reject, message, dm);
        });
    }
    async Run(resolve, reject, message, dm) {
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal === null) {
            this.SendStatus(message, dm);
            return;
        }
        if (mal.Verified === true) {
            const user = await user_data_1.UserData.GetUser(message.author.id);
            if (user === null) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const list = await mal_1.MAL.GetCWList(mal.MalUsername);
            if (list === null) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const subs = await subscription_data_1.SubscriptionData.GetUserSubs(user.Id);
            for (let i = 0; i < subs.length; i++) {
                const $s = subs[i];
                const malAnime = list.find($ma => $ma.anime_id === $s.MediaId);
                if (malAnime !== null && malAnime !== undefined) {
                }
                else {
                    await subscription_data_1.SubscriptionData.Delete($s.MediaId, user.DiscordId);
                }
            }
            for (let i = 0; i < list.length; i++) {
                const fromList = list[i];
                const anime = await anime_cache_1.AnimeCache.Get(fromList.anime_id);
                if (media_status_1.MediaStatus.Ongoing(anime) || media_status_1.MediaStatus.NotYetAired(anime)) {
                    await queue_data_1.QueueData.Insert(anime.idMal, anime.nextAiringEpisode.next);
                    await subscription_data_1.SubscriptionData.Insert(anime.idMal, user.Id);
                    if (i === list.length - 1) {
                        resolve();
                    }
                }
                else {
                    if (i === list.length - 1) {
                        resolve();
                    }
                }
            }
        }
        else {
            this.SendStatus(message, dm);
        }
    }
    SendStatus(message, dm) {
        sender_1.Sender.Send(message, `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`, dm);
    }
}
exports.MalSyncFunction = MalSyncFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUN2RCw4Q0FBMkM7QUFDM0Msb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBQ3JDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBRXRELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLE1BQU0sS0FBSyxHQUFHLDJFQUEyRSxDQUFDO1FBQzFGLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSw2QkFBNkI7Z0JBQ3BDLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixNQUFNLEVBQUU7b0JBQ047d0JBQ0UsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsS0FBSyxFQUFF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RUFBRTtnQkFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEQsSUFBSSwwQkFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSwwQkFBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDaEUsTUFBTSxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsTUFBTSxvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDekIsT0FBTyxFQUFFLENBQUM7cUJBQ1g7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQzlDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLGlHQUFpRyxFQUNqRyxFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhIRCwwQ0FnSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuLi8uLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuXG5leHBvcnQgY2xhc3MgTWFsU3luY0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLkdldEFsbChtZXNzYWdlLCBkbSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgY29uc3QgcmVzJG0gPSBgWW91ciAqTUFMIGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XG4gICAgU2VuZGVyLlNlbmQoXG4gICAgICBtZXNzYWdlLFxuICAgICAge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZXNzYWdlLmF1dGhvci5hdmF0YXJVUkwgfSxcbiAgICAgICAgICB0aXRsZTogYFJpa2ltYXJ1IE1BTCBBdXRvIFN1YnNjcmliZWAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHJlcyRtLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdW5zdWIgYW5pbWUgdGl0bGUgb3Iga2V5d29yZCBoZXJlXFxgYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBQbGVhc2UgTm90ZTogYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBJZiB5b3UndmUganVzdCBtb2RpZmllZCB5b3VyIGxpc3QsIHBsZWFzZSB3YWl0IGF0IGxlYXN0IDEgbWludXRlIHRvICoqLW1hbHN5bmMqKi5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZG1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBHZXRBbGwobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICB0aGlzLlJ1bihyZXNvbHZlLCByZWplY3QsIG1lc3NhZ2UsIGRtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgUnVuKFxuICAgIHJlc29sdmU6ICgpID0+IHZvaWQsXG4gICAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkLFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgZG06IGJvb2xlYW5cbiAgKSB7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICBpZiAobWFsID09PSBudWxsKSB7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtYWwuVmVyaWZpZWQgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKG1lc3NhZ2UuYXV0aG9yLmlkKTtcbiAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgTUFMLkdldENXTGlzdChtYWwuTWFsVXNlcm5hbWUpO1xuICAgICAgaWYgKGxpc3QgPT09IG51bGwpIHtcbiAgICAgICAgU2VuZGVyLlNlbmRFcnJvcihtZXNzYWdlLCBkbSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFVzZXJTdWJzKHVzZXIuSWQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0ICRzID0gc3Vic1tpXTtcbiAgICAgICAgY29uc3QgbWFsQW5pbWUgPSBsaXN0LmZpbmQoJG1hID0+ICRtYS5hbmltZV9pZCA9PT0gJHMuTWVkaWFJZCk7XG4gICAgICAgIGlmIChtYWxBbmltZSAhPT0gbnVsbCAmJiBtYWxBbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5EZWxldGUoJHMuTWVkaWFJZCwgdXNlci5EaXNjb3JkSWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmcm9tTGlzdCA9IGxpc3RbaV07XG4gICAgICAgIGNvbnN0IGFuaW1lID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQoZnJvbUxpc3QuYW5pbWVfaWQpO1xuICAgICAgICBpZiAoTWVkaWFTdGF0dXMuT25nb2luZyhhbmltZSkgfHwgTWVkaWFTdGF0dXMuTm90WWV0QWlyZWQoYW5pbWUpKSB7XG4gICAgICAgICAgYXdhaXQgUXVldWVEYXRhLkluc2VydChhbmltZS5pZE1hbCwgYW5pbWUubmV4dEFpcmluZ0VwaXNvZGUubmV4dCk7XG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIHVzZXIuSWQpO1xuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGkgPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgU2VuZFN0YXR1cyhtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIGBPb3BzISBZb3VyIE1BTCBhY2NvdW50IGlzIG5vdCB2ZXJpZmllZCBhbmQgYmluZGVkLlxcbiBFbnRlciB0aGUgY29tbWFuZCAqKi1tYWxiaW5kIG1hbHVzZXJuYW1lKipgLFxuICAgICAgZG1cbiAgICApO1xuICB9XG59XG4iXX0=