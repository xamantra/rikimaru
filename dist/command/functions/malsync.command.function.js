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
const config_1 = require("../../core/config");
class MalSyncFunction {
    async Execute(message, command, dm) {
        await this.GetAll(message, dm).catch(err => {
            console.log(err);
            this.SendStatus(message, dm);
        });
        const client = await client_1.ClientManager.GetClient();
        const res$m = `Your *MAL currently watching list* is now synced with your subscriptions.`;
        const prefix = config_1.Config.COMMAND_PREFIX;
        sender_1.Sender.Send(message, {
            embed: {
                color: message.member.highestRole.color,
                thumbnail: { url: message.author.avatarURL },
                title: `${config_1.Config.BOT_NAME} MAL Auto Subscribe`,
                description: res$m,
                fields: [
                    {
                        name: `To unsubscribe, type:`,
                        value: `\`${prefix}unsub anime title or keyword here\``
                    },
                    {
                        name: `To view all subscription, type:`,
                        value: `\`${prefix}viewsubs\``
                    },
                    {
                        name: `Please Note: `,
                        value: `If you've just modified your list, please wait at least 1 minute to **${prefix}malsync**.`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `© ${config_1.Config.BOT_NAME}`
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
        sender_1.Sender.Send(message, `Oops! Your MAL account is not verified and binded.\n Enter the command **${config_1.Config.COMMAND_PREFIX}malbind malusername**`, dm);
    }
}
exports.MalSyncFunction = MalSyncFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUN2RCw4Q0FBMkM7QUFDM0Msb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBQ3JDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBQ3RELDhDQUEyQztBQUUzQyxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRywyRUFBMkUsQ0FBQztRQUMxRixNQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3JDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSxHQUFHLGVBQU0sQ0FBQyxRQUFRLHFCQUFxQjtnQkFDOUMsV0FB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bUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vLi4vY29yZS9tYWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgTWFsU3luY0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLkdldEFsbChtZXNzYWdlLCBkbSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgY29uc3QgcmVzJG0gPSBgWW91ciAqTUFMIGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XG4gICAgY29uc3QgcHJlZml4ID0gQ29uZmlnLkNPTU1BTkRfUFJFRklYO1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgdGl0bGU6IGAke0NvbmZpZy5CT1RfTkFNRX0gTUFMIEF1dG8gU3Vic2NyaWJlYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzJG0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAke3ByZWZpeH12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBQbGVhc2UgTm90ZTogYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBJZiB5b3UndmUganVzdCBtb2RpZmllZCB5b3VyIGxpc3QsIHBsZWFzZSB3YWl0IGF0IGxlYXN0IDEgbWludXRlIHRvICoqJHtwcmVmaXh9bWFsc3luYyoqLmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgR2V0QWxsKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgdGhpcy5SdW4ocmVzb2x2ZSwgcmVqZWN0LCBtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFJ1bihcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxuICAgIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCxcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGRtOiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgaWYgKG1hbCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICBpZiAodXNlciA9PT0gbnVsbCkge1xuICAgICAgICBTZW5kZXIuU2VuZEVycm9yKG1lc3NhZ2UsIGRtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IE1BTC5HZXRDV0xpc3QobWFsLk1hbFVzZXJuYW1lKTtcbiAgICAgIGlmIChsaXN0ID09PSBudWxsKSB7XG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1c2VyLklkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCAkcyA9IHN1YnNbaV07XG4gICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEuYW5pbWVfaWQgPT09ICRzLk1lZGlhSWQpO1xuICAgICAgICBpZiAobWFsQW5pbWUgIT09IG51bGwgJiYgbWFsQW5pbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsIHVzZXIuRGlzY29yZElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZnJvbUxpc3QgPSBsaXN0W2ldO1xuICAgICAgICBjb25zdCBhbmltZSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KGZyb21MaXN0LmFuaW1lX2lkKTtcbiAgICAgICAgaWYgKE1lZGlhU3RhdHVzLk9uZ29pbmcoYW5pbWUpIHx8IE1lZGlhU3RhdHVzLk5vdFlldEFpcmVkKGFuaW1lKSkge1xuICAgICAgICAgIGF3YWl0IFF1ZXVlRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIGFuaW1lLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpO1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCB1c2VyLklkKTtcbiAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICBTZW5kZXIuU2VuZChcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBgT29wcyEgWW91ciBNQUwgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKioke1xuICAgICAgICBDb25maWcuQ09NTUFORF9QUkVGSVhcbiAgICAgIH1tYWxiaW5kIG1hbHVzZXJuYW1lKipgLFxuICAgICAgZG1cbiAgICApO1xuICB9XG59XG4iXX0=