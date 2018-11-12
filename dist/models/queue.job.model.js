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
            console.log(subscribers);
            if (subscribers.length === 0) {
                this.Update();
                resolve();
            }
            for (let i = 0; i < subscribers.length; i++) {
                const subscriber = subscribers[i];
                const user = await client_1.ClientManager.GetUser(subscriber.DiscordId);
                if (null_checker_helper_1.NullCheck.Fine(user)) {
                    await this.SendMessage(title, nextEpisode, media, user);
                    if (i === subscribers.length - 1) {
                        await this.Update();
                        resolve();
                    }
                }
                else {
                    if (i === subscribers.length - 1) {
                        await this.Update();
                        resolve();
                    }
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
                await this.Sleep(1000);
                const support = await this.SupportTemplate();
                await user.send(support).catch(err => {
                    console.log(err);
                });
                resolve();
            })
                .catch(err => {
                console.log(err);
                resolve();
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
            if (null_checker_helper_1.NullCheck.Fine(media)) {
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
    Sleep(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFDM0QsMkNBQXdDO0FBRXhDLE1BQWEsUUFBUTtJQUVuQixZQUFtQixLQUFhLEVBQVMsS0FBWTtRQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7SUFFbEQsS0FBSyxDQUFDLEtBQUs7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxLQUFLLEdBQUcsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvRCxJQUFJLDBCQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENB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LENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsTUFBTSxLQUFLLEdBQUc7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxjQUFLLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLElBQUksRUFBRSxzQ0FBc0M7NEJBQzVDLEtBQUssRUFBRSxZQUFZLGVBQU0sQ0FBQyxRQUFRLEtBQUssZUFBTSxDQUFDLFlBQVksUUFBUTt5QkFDbkU7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxPQUFlO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUtELDRCQTBLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2NvcmUvY29sb3JzXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XG4gIHByaXZhdGUgSm9iRGF0ZTogRGF0ZTtcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XG5cbiAgcHVibGljIGFzeW5jIENoZWNrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZUVwaXNvZGUgPSB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlO1xuICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgdGhpcy5Kb2JEYXRlID0gdW5peChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCkudG9EYXRlKCk7XG4gICAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgc3Vic2NyaWJlcnMgb2YgXCIke3RpdGxlfVwiYCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVycyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0U3Vic2NyaWJlcnMoXG4gICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhzdWJzY3JpYmVycyk7XG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5TZW5kTWVzc2FnZSh0aXRsZSwgbmV4dEVwaXNvZGUsIG1lZGlhLCB1c2VyKTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3Vic2NyaWJlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN1YnNjcmliZXJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNlbmRNZXNzYWdlKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbmV4dEVwaXNvZGU6IG51bWJlcixcbiAgICBtZWRpYTogSU1lZGlhLFxuICAgIHVzZXI6IFVzZXJcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lZGlhLCBuZXh0RXBpc29kZSk7XG4gICAgICBhd2FpdCB1c2VyXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgRE0gaGFzIGJlZW4gc2VudCB0byBcIiR7XG4gICAgICAgICAgICAgIHVzZXIudXNlcm5hbWVcbiAgICAgICAgICAgIH1cIiBmb3IgXCIke3RpdGxlfSBFcGlzb2RlICR7bmV4dEVwaXNvZGV9XCJgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLlNsZWVwKDEwMDApO1xuICAgICAgICAgIGNvbnN0IHN1cHBvcnQgPSBhd2FpdCB0aGlzLlN1cHBvcnRUZW1wbGF0ZSgpO1xuICAgICAgICAgIGF3YWl0IHVzZXIuc2VuZChzdXBwb3J0KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBMb2coKSB7XG4gICAgY29uc3QgY291bnRkb3duID0gbW9tZW50KHRoaXMuSm9iRGF0ZSkudG9Ob3codHJ1ZSk7XG4gICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQodGhpcy5tZWRpYS50aXRsZSk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUXVldWUgSm9iIHsgUXVldWUgRXBpc29kZTogXCIke1xuICAgICAgICB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlXG4gICAgICB9XCIsIFwiJHt0aXRsZX0gRXBpc29kZSAke1xuICAgICAgICB0aGlzLm1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHRcbiAgICAgIH1cIiAgaW4gICR7Y291bnRkb3dufSB9YFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIFVwZGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldCh0aGlzLm1lZGlhLmlkTWFsKTtcbiAgICAgIGlmIChOdWxsQ2hlY2suRmluZShtZWRpYSkpIHtcbiAgICAgICAgYXdhaXQgUXVldWVEYXRhLlVwZGF0ZShtZWRpYSwgdGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmVkIFF1ZXVlOiAke21lZGlhLmlkTWFsfWApO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEVycm9yIHdoaWxlIHNlYXJjaGluZyA6IFtNZWRpYVNlYXJjaC5GaW5kKCR7XG4gICAgICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXG4gICAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZWRpYTogSU1lZGlhLCBlcGlzb2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBDb25maWcuQ09NTUFORF9QUkVGSVg7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxuICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKkVwaXNvZGUgJHtlcGlzb2RlfSoqICpoYXMgYmVlbiBhaXJlZCEqYCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHVuc3ViLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgJHtwcmVmaXh9dW5zdWIgJHt0fVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IHN1YnNjcmlwdGlvbnMsIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAke3ByZWZpeH12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTdXBwb3J0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFN1cHBvcnQgbWUgb24gRGlzY29yZCBCb3QgTGlzdCAoREJMKWAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW1ZvdGUgdG8gJHtDb25maWcuQk9UX05BTUV9XSgke0NvbmZpZy5EQkxfQk9UX0xJTkt9L3ZvdGUpYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTbGVlcCh0aW1lb3V0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=