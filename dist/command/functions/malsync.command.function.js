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
        const client = client_1.ClientManager.Client;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUN2RCw4Q0FBMkM7QUFDM0Msb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBQ3JDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBQ3RELDhDQUEyQztBQUUzQyxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLDJFQUEyRSxDQUFDO1FBQzFGLE1BQU0sTUFBTSxHQUFHLGVBQU0sQ0FBQyxjQUFjLENBQUM7UUFDckMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLEdBQUcsZUFBTSxDQUFDLFFBQVEscUJBQXFCO2dCQUM5QyxXQUFXLEVBQUUsS0FB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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuLi8uLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWxTeW5jRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuR2V0QWxsKG1lc3NhZ2UsIGRtKS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XG4gICAgY29uc3QgcmVzJG0gPSBgWW91ciAqTUFMIGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XG4gICAgY29uc3QgcHJlZml4ID0gQ29uZmlnLkNPTU1BTkRfUFJFRklYO1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgdGl0bGU6IGAke0NvbmZpZy5CT1RfTkFNRX0gTUFMIEF1dG8gU3Vic2NyaWJlYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzJG0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAke3ByZWZpeH12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBQbGVhc2UgTm90ZTogYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBJZiB5b3UndmUganVzdCBtb2RpZmllZCB5b3VyIGxpc3QsIHBsZWFzZSB3YWl0IGF0IGxlYXN0IDEgbWludXRlIHRvICoqJHtwcmVmaXh9bWFsc3luYyoqLmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgR2V0QWxsKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgdGhpcy5SdW4ocmVzb2x2ZSwgcmVqZWN0LCBtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFJ1bihcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxuICAgIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCxcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGRtOiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgaWYgKG1hbCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICBpZiAodXNlciA9PT0gbnVsbCkge1xuICAgICAgICBTZW5kZXIuU2VuZEVycm9yKG1lc3NhZ2UsIGRtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IE1BTC5HZXRDV0xpc3QobWFsLk1hbFVzZXJuYW1lKTtcbiAgICAgIGlmIChsaXN0ID09PSBudWxsKSB7XG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1c2VyLklkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCAkcyA9IHN1YnNbaV07XG4gICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEuYW5pbWVfaWQgPT09ICRzLk1lZGlhSWQpO1xuICAgICAgICBpZiAobWFsQW5pbWUgIT09IG51bGwgJiYgbWFsQW5pbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsIHVzZXIuRGlzY29yZElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZnJvbUxpc3QgPSBsaXN0W2ldO1xuICAgICAgICBjb25zdCBhbmltZSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KGZyb21MaXN0LmFuaW1lX2lkKTtcbiAgICAgICAgaWYgKE1lZGlhU3RhdHVzLk9uZ29pbmcoYW5pbWUpIHx8IE1lZGlhU3RhdHVzLk5vdFlldEFpcmVkKGFuaW1lKSkge1xuICAgICAgICAgIGF3YWl0IFF1ZXVlRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIGFuaW1lLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpO1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCB1c2VyLklkKTtcbiAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICBTZW5kZXIuU2VuZChcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBgT29wcyEgWW91ciBNQUwgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKioke1xuICAgICAgICBDb25maWcuQ09NTUFORF9QUkVGSVhcbiAgICAgIH1tYWxiaW5kIG1hbHVzZXJuYW1lKipgLFxuICAgICAgZG1cbiAgICApO1xuICB9XG59XG4iXX0=