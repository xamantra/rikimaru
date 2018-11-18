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
const null_checker_helper_1 = require("../../helpers/null.checker.helper");
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
            if (!null_checker_helper_1.NullCheck.Fine(apiResult)) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const converted = await json_helper_1.JsonHelper.Convert(apiResult, ani_sync_model_1.ListRoot);
            if (!null_checker_helper_1.NullCheck.Fine(converted)) {
                sender_1.Sender.SendError(message, dm);
                return;
            }
            const list = converted.data.collection.lists[0].entries;
            if (!null_checker_helper_1.NullCheck.Fine(list)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL2FuaXN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDhDQUEyQztBQUMzQyxvREFBZ0Q7QUFDaEQsb0VBQWdFO0FBQ2hFLDhDQUFrRDtBQUNsRCx3REFBb0Q7QUFDcEQsc0RBQWtEO0FBQ2xELDBEQUFzRDtBQUN0RCw4Q0FBMkM7QUFDM0MsNERBQXVEO0FBQ3ZELGdEQUE2QztBQUM3QywyREFBdUQ7QUFDdkQsZ0VBQXVEO0FBQ3ZELDJFQUE4RDtBQUU5RCxNQUFhLGVBQWU7SUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FDWCxPQUFpQixFQUNqQixPQUFrQixFQUNsQixFQUFZO1FBRVosTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLCtFQUErRSxDQUFDO1FBQzlGLE1BQU0sTUFBTSxHQUFHLGVBQU0sQ0FBQyxjQUFjLENBQUM7UUFDckMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLEdBQUcsZUFB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TUFBTSxvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDekIsT0FBTyxFQUFFLENBQUM7cUJBQ1g7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQzlDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLGdGQUNFLGVBQU0sQ0FBQyxjQUNULDJCQUEyQixFQUMzQixFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdIRCwwQ0E2SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XHJcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xyXG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XHJcbmltcG9ydCB7IE1lZGlhU3RhdHVzIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc3RhdHVzXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBbmlCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL2FuaS5iaW5kLmRhdGFcIjtcclxuaW1wb3J0IHsgQW5pTGlzdCB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaWxpc3RcIjtcclxuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XHJcbmltcG9ydCB7IExpc3RSb290IH0gZnJvbSBcIi4uLy4uL21vZGVscy9hbmkuc3luYy5tb2RlbFwiO1xyXG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pU3luY0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgYXN5bmMgRXhlY3V0ZShcclxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxyXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxyXG4gICAgZG0/OiBib29sZWFuXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLkdldEFsbChtZXNzYWdlLCBkbSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50TWFuYWdlci5DbGllbnQ7XHJcbiAgICBjb25zdCByZXMkbSA9IGBZb3VyICpBbmlMaXN0IGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XHJcbiAgICBjb25zdCBwcmVmaXggPSBDb25maWcuQ09NTUFORF9QUkVGSVg7XHJcbiAgICBTZW5kZXIuU2VuZChcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZXNzYWdlLmF1dGhvci5hdmF0YXJVUkwgfSxcclxuICAgICAgICAgIHRpdGxlOiBgJHtDb25maWcuQk9UX05BTUV9IEFuaUxpc3QgQXV0byBTdWJzY3JpYmVgLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IHJlcyRtLFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXZpZXdzdWJzXFxgYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFBsZWFzZSBOb3RlOiBgLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgSWYgeW91J3ZlIGp1c3QgbW9kaWZpZWQgeW91ciBsaXN0LCBwbGVhc2Ugd2FpdCBhdCBsZWFzdCAxIG1pbnV0ZSB0byAqKiR7cHJlZml4fWFuaXN5bmMqKi5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGRtXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBHZXRBbGwobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICB0aGlzLlJ1bihyZXNvbHZlLCByZWplY3QsIG1lc3NhZ2UsIGRtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBSdW4oXHJcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxyXG4gICAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkLFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGRtOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBjb25zdCBhbmkgPSBhd2FpdCBBbmlCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xyXG4gICAgaWYgKGFuaSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFuaS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XHJcbiAgICAgICAgU2VuZGVyLlNlbmRFcnJvcihtZXNzYWdlLCBkbSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGFwaVJlc3VsdCA9IGF3YWl0IEFuaUxpc3QuTWVkaWFMaXN0UXVlcnkoYW5pLkFuaUxpc3RJZCk7XHJcbiAgICAgIGlmICghTnVsbENoZWNrLkZpbmUoYXBpUmVzdWx0KSkge1xyXG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBKc29uSGVscGVyLkNvbnZlcnQ8TGlzdFJvb3Q+KGFwaVJlc3VsdCwgTGlzdFJvb3QpO1xyXG4gICAgICBpZiAoIU51bGxDaGVjay5GaW5lKGNvbnZlcnRlZCkpIHtcclxuICAgICAgICBTZW5kZXIuU2VuZEVycm9yKG1lc3NhZ2UsIGRtKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbGlzdCA9IGNvbnZlcnRlZC5kYXRhLmNvbGxlY3Rpb24ubGlzdHNbMF0uZW50cmllcztcclxuICAgICAgaWYgKCFOdWxsQ2hlY2suRmluZShsaXN0KSkge1xyXG4gICAgICAgIFNlbmRlci5TZW5kRXJyb3IobWVzc2FnZSwgZG0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1c2VyLklkKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgJHMgPSBzdWJzW2ldO1xyXG4gICAgICAgIGNvbnN0IGFuaWxpc3RBbmltZSA9IGxpc3QuZmluZCgkbWEgPT4gJG1hLm1lZGlhLmlkTWFsID09PSAkcy5NZWRpYUlkKTtcclxuICAgICAgICBpZiAoYW5pbGlzdEFuaW1lICE9PSBudWxsICYmIGFuaWxpc3RBbmltZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsIHVzZXIuRGlzY29yZElkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGZyb21MaXN0ID0gbGlzdFtpXTtcclxuICAgICAgICBjb25zdCBhbmltZSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KGZyb21MaXN0Lm1lZGlhLmlkTWFsKTtcclxuICAgICAgICBpZiAoTWVkaWFTdGF0dXMuT25nb2luZyhhbmltZSkgfHwgTWVkaWFTdGF0dXMuTm90WWV0QWlyZWQoYW5pbWUpKSB7XHJcbiAgICAgICAgICBhd2FpdCBRdWV1ZURhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCBhbmltZS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KTtcclxuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCB1c2VyLklkKTtcclxuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcclxuICAgIFNlbmRlci5TZW5kKFxyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBgT29wcyEgWW91ciBBbmlMaXN0IGFjY291bnQgaXMgbm90IHZlcmlmaWVkIGFuZCBiaW5kZWQuXFxuIEVudGVyIHRoZSBjb21tYW5kICoqJHtcclxuICAgICAgICBDb25maWcuQ09NTUFORF9QUkVGSVhcclxuICAgICAgfWFuaWJpbmQgYW5pbGlzdHVzZXJuYW1lKipgLFxyXG4gICAgICBkbVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19