"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../data/queue.data");
const moment_1 = __importStar(require("moment"));
const client_1 = require("../core/client");
const title_helper_1 = require("../helpers/title.helper");
const colors_1 = require("../core/colors");
const subscription_data_1 = require("../data/subscription.data");
const media_status_1 = require("../core/media.status");
const anime_cache_1 = require("../core/anime.cache");
const null_checker_helper_1 = require("../helpers/null.checker.helper");
const config_1 = require("../core/config");
class QueueJob {
    constructor(media, queue) {
        this.media = media;
        this.queue = queue;
    }
    async Check() {
        return new Promise(async (resolve, reject) => {
            const queueEpisode = this.queue.NextEpisode;
            const media = this.media;
            const title = title_helper_1.TitleHelper.Get(media.title);
            this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
            if (media_status_1.MediaStatus.Completed(media) && media.episodes === 1) {
                await this.FindUser(title, queueEpisode, media);
                resolve();
            }
            else if (queueEpisode < media.nextAiringEpisode.next) {
                await this.FindUser(title, queueEpisode, media);
                resolve();
            }
        });
    }
    FindUser(title, nextEpisode, media) {
        return new Promise(async (resolve, reject) => {
            console.log(`Getting subscribers of "${title}"`);
            const subscribers = await subscription_data_1.SubscriptionData.GetSubscribers(this.media.idMal);
            if (subscribers.length === 0) {
                this.Update();
                resolve();
            }
            for (let i = 0; i < subscribers.length; i++) {
                const subscriber = subscribers[i];
                const user = await client_1.ClientManager.GetUser(subscriber.DiscordId);
                if (null_checker_helper_1.NullCheck.Fine(user)) {
                    await this.SendMessage(title, nextEpisode, media, user);
                }
                if (i === subscribers.length - 1) {
                    resolve();
                }
            }
        });
    }
    SendMessage(title, nextEpisode, media, user) {
        return new Promise(async (resolve, reject) => {
            const embed = await this.EmbedTemplate(media, nextEpisode);
            await user
                .send(embed)
                .then(async () => {
                console.log(`DM has been sent to "${user.username}" for "${title} Episode ${nextEpisode}"`);
                await this.Update();
                const support = await this.SupportTemplate();
                user.send(support).catch(err => {
                    console.log(err);
                });
                resolve();
            })
                .catch(err => {
                console.log(err);
            });
        });
    }
    Log() {
        const countdown = moment_1.default(this.JobDate).toNow(true);
        const title = title_helper_1.TitleHelper.Get(this.media.title);
        console.log(`Queue Job { Queue Episode: "${this.queue.NextEpisode}", "${title} Episode ${this.media.nextAiringEpisode.next}"  in  ${countdown} }`);
    }
    Update() {
        return new Promise(async (resolve, reject) => {
            const media = await anime_cache_1.AnimeCache.Get(this.media.idMal);
            if (media !== null) {
                await queue_data_1.QueueData.Update(media, this);
                console.log(`Removed Queue: ${media.idMal}`);
                resolve();
            }
            else {
                console.warn(`Error while searching : [MediaSearch.Find(${this.media.idMal})]. Trying again...`);
                await this.Update();
                resolve();
            }
        });
    }
    EmbedTemplate(media, episode) {
        return new Promise(async (resolve, reject) => {
            const prefix = config_1.Config.COMMAND_PREFIX;
            const client = await client_1.ClientManager.GetClient();
            const t = title_helper_1.TitleHelper.Get(media.title);
            const embed = {
                embed: {
                    color: colors_1.Color.Random,
                    thumbnail: {
                        url: media.coverImage.large
                    },
                    title: `***${t}***`,
                    url: `https://myanimelist.net/anime/${media.idMal}/`,
                    description: `**Episode ${episode}** *has been aired!*`,
                    fields: [
                        {
                            name: `To unsub, type:`,
                            value: `\`${prefix}unsub ${t}\``
                        },
                        {
                            name: `To view subscriptions, type:`,
                            value: `\`${prefix}viewsubs\``
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
    SupportTemplate() {
        return new Promise((resolve, reject) => {
            const embed = {
                embed: {
                    color: colors_1.Color.Random,
                    fields: [
                        {
                            name: `Support me on Discord Bot List (DBL)`,
                            value: `[Vote to ${config_1.Config.BOT_NAME}](${config_1.Config.DBL_BOT_LINK}/vote)`
                        }
                    ]
                }
            };
            resolve(embed);
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFDM0QsMkNBQXdDO0FBRXhDLE1BQWEsUUFBUTtJQUVuQixZQUFtQixLQUFhLEVBQVMsS0FBWTtRQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7SUFFbEQsS0FBSyxDQUFDLEtBQUs7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxLQUFLLEdBQUcsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvRCxJQUFJLDBCQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENB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Q0Y7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUpELDRCQTBKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2NvcmUvY29sb3JzXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XG4gIHByaXZhdGUgSm9iRGF0ZTogRGF0ZTtcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XG5cbiAgcHVibGljIGFzeW5jIENoZWNrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZUVwaXNvZGUgPSB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlO1xuICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgdGhpcy5Kb2JEYXRlID0gdW5peChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCkudG9EYXRlKCk7XG4gICAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgc3Vic2NyaWJlcnMgb2YgXCIke3RpdGxlfVwiYCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVycyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0U3Vic2NyaWJlcnMoXG4gICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICk7XG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5TZW5kTWVzc2FnZSh0aXRsZSwgbmV4dEVwaXNvZGUsIG1lZGlhLCB1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gc3Vic2NyaWJlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTZW5kTWVzc2FnZShcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG5leHRFcGlzb2RlOiBudW1iZXIsXG4gICAgbWVkaWE6IElNZWRpYSxcbiAgICB1c2VyOiBVc2VyXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZWRpYSwgbmV4dEVwaXNvZGUpO1xuICAgICAgYXdhaXQgdXNlclxuICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYERNIGhhcyBiZWVuIHNlbnQgdG8gXCIke1xuICAgICAgICAgICAgICB1c2VyLnVzZXJuYW1lXG4gICAgICAgICAgICB9XCIgZm9yIFwiJHt0aXRsZX0gRXBpc29kZSAke25leHRFcGlzb2RlfVwiYFxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgICBjb25zdCBzdXBwb3J0ID0gYXdhaXQgdGhpcy5TdXBwb3J0VGVtcGxhdGUoKTtcbiAgICAgICAgICB1c2VyLnNlbmQoc3VwcG9ydCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBMb2coKSB7XG4gICAgY29uc3QgY291bnRkb3duID0gbW9tZW50KHRoaXMuSm9iRGF0ZSkudG9Ob3codHJ1ZSk7XG4gICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQodGhpcy5tZWRpYS50aXRsZSk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUXVldWUgSm9iIHsgUXVldWUgRXBpc29kZTogXCIke1xuICAgICAgICB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlXG4gICAgICB9XCIsIFwiJHt0aXRsZX0gRXBpc29kZSAke1xuICAgICAgICB0aGlzLm1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHRcbiAgICAgIH1cIiAgaW4gICR7Y291bnRkb3dufSB9YFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIFVwZGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldCh0aGlzLm1lZGlhLmlkTWFsKTtcbiAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkge1xuICAgICAgICBhd2FpdCBRdWV1ZURhdGEuVXBkYXRlKG1lZGlhLCB0aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgRXJyb3Igd2hpbGUgc2VhcmNoaW5nIDogW01lZGlhU2VhcmNoLkZpbmQoJHtcbiAgICAgICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICAgICB9KV0uIFRyeWluZyBhZ2Fpbi4uLmBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lZGlhOiBJTWVkaWEsIGVwaXNvZGU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IENvbmZpZy5DT01NQU5EX1BSRUZJWDtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICBjb25zdCB0ID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBDb2xvci5SYW5kb20sXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiBgKioqJHt0fSoqKmAsXG4gICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqRXBpc29kZSAke2VwaXNvZGV9KiogKmhhcyBiZWVuIGFpcmVkISpgLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWIsIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAke3ByZWZpeH11bnN1YiAke3R9XFxgYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgc3Vic2NyaXB0aW9ucywgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYCR7cHJlZml4fXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFN1cHBvcnRUZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgU3VwcG9ydCBtZSBvbiBEaXNjb3JkIEJvdCBMaXN0IChEQkwpYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBbVm90ZSB0byAke0NvbmZpZy5CT1RfTkFNRX1dKCR7Q29uZmlnLkRCTF9CT1RfTElOS30vdm90ZSlgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==