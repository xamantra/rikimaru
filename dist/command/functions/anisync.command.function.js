"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const anime_cache_1 = require("../../core/anime.cache");
const queue_data_1 = require("../../data/queue.data");
const media_status_1 = require("../../core/media.status");
const config_1 = require("../../core/config");
const ani_bind_data_1 = require("../../data/ani.bind.data");
const anilist_1 = require("../../core/anilist");
const json_helper_1 = require("../../helpers/json.helper");
const ani_sync_model_1 = require("../../models/ani.sync.model");
class AniSyncFunction {
    async Execute(message, command, dm) {
        await this.GetAll(message, dm).catch(err => {
            console.log(err);
            this.SendStatus(message, dm);
        });
        const client = client_1.ClientManager.Client;
        const res$m = `Your *AniList currently watching list* is now synced with your subscriptions.`;
        const prefix = config_1.Config.COMMAND_PREFIX;
        sender_1.Sender.Send(message, {
            embed: {
                color: message.member.highestRole.color,
                thumbnail: { url: message.author.avatarURL },
                title: `${config_1.Config.BOT_NAME} AniList Auto Subscribe`,
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
                        value: `If you've just modified your list, please wait at least 1 minute to **${prefix}anisync**.`
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
        const ani = await ani_bind_data_1.AniBindData.Get(message.author.id);
        if (ani === null) {
            this.SendStatus(message, dm);
            return;
        }
        if (ani.Verified === true) {
            const user = await user_data_1.UserData.GetUser(message.author.id);
            if (user === null) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const apiResult = await anilist_1.AniList.MediaListQuery(ani.AniListId);
            const converted = await json_helper_1.JsonHelper.Convert(apiResult, ani_sync_model_1.ListRoot);
            const list = converted.data.collection.lists[0].entries;
            if (list === null) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const subs = await subscription_data_1.SubscriptionData.GetUserSubs(user.Id);
            for (let i = 0; i < subs.length; i++) {
                const $s = subs[i];
                const anilistAnime = list.find($ma => $ma.media.idMal === $s.MediaId);
                if (anilistAnime !== null && anilistAnime !== undefined) {
                }
                else {
                    await subscription_data_1.SubscriptionData.Delete($s.MediaId, user.DiscordId);
                }
            }
            for (let i = 0; i < list.length; i++) {
                const fromList = list[i];
                const anime = await anime_cache_1.AnimeCache.Get(fromList.media.idMal);
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
        sender_1.Sender.Send(message, `Oops! Your AniList account is not verified and binded.\n Enter the command **${config_1.Config.COMMAND_PREFIX}anibind anilistusername**`, dm);
    }
}
exports.AniSyncFunction = AniSyncFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL2FuaXN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQyxvREFBZ0Q7QUFDaEQsb0VBQWdFO0FBQ2hFLDhDQUFrRDtBQUNsRCx3REFBb0Q7QUFDcEQsc0RBQWtEO0FBQ2xELDBEQUFzRDtBQUN0RCw4Q0FBMkM7QUFDM0MsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsZ0VBQXVEO0FBRXZELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxNQUFNLENBQUM7UUFDcEMsTUFBTSxLQUFLLEdBQUcsK0VBQStFLENBQUM7UUFDOUYsTUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLGNBQWMsQ0FBQztRQUNyQyxlQUFNLENBQUMsSUFBSSxDQUNULE9BQU8sRUFDUDtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztnQkFDdkMsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsR0FBRyxlQUFNLENBQUMsUUFBUSx5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Q0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxPQUFnQixFQUFFLEVBQVc7UUFDOUMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1AsZ0ZBQ0UsZUFBTSxDQUFDLGNBQ1QsMkJBQTJCLEVBQzNCLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckhELDBDQXFIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcclxuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XHJcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XHJcbmltcG9ydCB7IEFuaUJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvYW5pLmJpbmQuZGF0YVwiO1xyXG5pbXBvcnQgeyBBbmlMaXN0IH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbGlzdFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgTGlzdFJvb3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2FuaS5zeW5jLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pU3luY0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgYXN5bmMgRXhlY3V0ZShcclxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxyXG4gICAgZG0/OiBib29sZWFuXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLkdldEFsbChtZXNzYWdlLCBkbSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICBjb25zdCByZXMkbSA9IGBZb3VyICpBbmlMaXN0IGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XHJcbiAgICBjb25zdCBwcmVmaXggPSBDb25maWcuQ09NTUFORF9QUkVGSVg7XHJcbiAgICBTZW5kZXIuU2VuZChcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZXNzYWdlLmF1dGhvci5hdmF0YXJVUkwgfSxcclxuICAgICAgICAgIHRpdGxlOiBgJHtDb25maWcuQk9UX05BTUV9IEFuaUxpc3QgQXV0byBTdWJzY3JpYmVgLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IHJlcyRtLFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXZpZXdzdWJzXFxgYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFBsZWFzZSBOb3RlOiBgLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgSWYgeW91J3ZlIGp1c3QgbW9kaWZpZWQgeW91ciBsaXN0LCBwbGVhc2Ugd2FpdCBhdCBsZWFzdCAxIG1pbnV0ZSB0byAqKiR7cHJlZml4fWFuaXN5bmMqKi5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGRtXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBHZXRBbGwobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICB0aGlzLlJ1bihyZXNvbHZlLCByZWplY3QsIG1lc3NhZ2UsIGRtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBSdW4oXHJcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxyXG4gICAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkLFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGRtOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBjb25zdCBhbmkgPSBhd2FpdCBBbmlCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xyXG4gICAgaWYgKGFuaSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFuaS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmRFcnJvcihtZXNzYWdlLCBkbSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFwaVJlc3VsdCA9IGF3YWl0IEFuaUxpc3QuTWVkaWFMaXN0UXVlcnkoYW5pLkFuaUxpc3RJZCk7XHJcbiAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IEpzb25IZWxwZXIuQ29udmVydDxMaXN0Um9vdD4oYXBpUmVzdWx0LCBMaXN0Um9vdCk7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBjb252ZXJ0ZWQuZGF0YS5jb2xsZWN0aW9uLmxpc3RzWzBdLmVudHJpZXM7XHJcbiAgICAgIGlmIChsaXN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmRFcnJvcihtZXNzYWdlLCBkbSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFVzZXJTdWJzKHVzZXIuSWQpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCAkcyA9IHN1YnNbaV07XHJcbiAgICAgICAgY29uc3QgYW5pbGlzdEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEubWVkaWEuaWRNYWwgPT09ICRzLk1lZGlhSWQpO1xyXG4gICAgICAgIGlmIChhbmlsaXN0QW5pbWUgIT09IG51bGwgJiYgYW5pbGlzdEFuaW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5EZWxldGUoJHMuTWVkaWFJZCwgdXNlci5EaXNjb3JkSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZnJvbUxpc3QgPSBsaXN0W2ldO1xyXG4gICAgICAgIGNvbnN0IGFuaW1lID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQoZnJvbUxpc3QubWVkaWEuaWRNYWwpO1xyXG4gICAgICAgIGlmIChNZWRpYVN0YXR1cy5PbmdvaW5nKGFuaW1lKSB8fCBNZWRpYVN0YXR1cy5Ob3RZZXRBaXJlZChhbmltZSkpIHtcclxuICAgICAgICAgIGF3YWl0IFF1ZXVlRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIGFuaW1lLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpO1xyXG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIHVzZXIuSWQpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IGxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2VuZFN0YXR1cyhtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xyXG4gICAgU2VuZGVyLlNlbmQoXHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGBPb3BzISBZb3VyIEFuaUxpc3QgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKioke1xyXG4gICAgICAgIENvbmZpZy5DT01NQU5EX1BSRUZJWFxyXG4gICAgICB9YW5pYmluZCBhbmlsaXN0dXNlcm5hbWUqKmAsXHJcbiAgICAgIGRtXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=