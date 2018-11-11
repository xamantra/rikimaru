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
        return new Promise((resolve, reject) => {
            this.EmbedTemplate(media, nextEpisode).then(embed => {
                user
                    .send(embed)
                    .then(async () => {
                    console.log(`DM has been sent to "${user.username}" for "${title} Episode ${nextEpisode}"`);
                    await this.Update();
                    resolve();
                })
                    .catch((error) => {
                    console.log(`Queue Job: "${error.message}"`);
                    resolve();
                });
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
                queue_data_1.QueueData.Update(media, this)
                    .then(() => {
                    console.log(`Removed Queue: ${media.idMal}`);
                    resolve();
                })
                    .catch(err => {
                    console.log(err);
                    resolve();
                });
            }
            else {
                console.warn(`Error while searching : [MediaSearch.Find(${this.media.idMal})]. Trying again...`);
                await this.Update();
                resolve();
            }
        });
    }
    async EmbedTemplate(media, episode) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
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
                            { name: `To unsubscribe, type:`, value: `\`-unsub ${t}\`` },
                            {
                                name: `To view all subscription, type:`,
                                value: `\`-viewsubs\``
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Rikimaru"
                        }
                    }
                };
                resolve(embed);
            });
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFFM0QsTUFBYSxRQUFRO0lBRW5CLFlBQW1CLEtBQWEsRUFBUyxLQUFZO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVsRCxLQUFLLENBQUMsS0FBSztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9ELElBQUksMEJBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FB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b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEtBQUssRUFBRSxjQUFLLENBQUMsTUFBTTt3QkFDbkIsU0FBUyxFQUFFOzRCQUNULEdBQUcsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUs7eUJBQzVCO3dCQUNELEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzt3QkFDbkIsR0FBRyxFQUFFLGlDQUFpQyxLQUFLLENBQUMsS0FBSyxHQUFHO3dCQUNwRCxXQUFXLEVBQUUsYUFBYSxPQUFPLHNCQUFzQjt3QkFDdkQsTUFBTSxFQUFFOzRCQUNOLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFOzRCQUMzRDtnQ0FDRSxJQUFJLEVBQUUsaUNBQWlDO2dDQUN2QyxLQUFLLEVBQUUsZUFBZTs2QkFDdkI7eUJBQ0Y7d0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO3dCQUNyQixNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzs0QkFDL0IsSUFBSSxFQUFFLFlBQVk7eUJBQ25CO3FCQUNGO2lCQUNGLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF6SUQsNEJBeUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IG1vbWVudCwgeyB1bml4IH0gZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi4vY29yZS9jb2xvcnNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XG4gIHByaXZhdGUgSm9iRGF0ZTogRGF0ZTtcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XG5cbiAgcHVibGljIGFzeW5jIENoZWNrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZUVwaXNvZGUgPSB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlO1xuICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgdGhpcy5Kb2JEYXRlID0gdW5peChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCkudG9EYXRlKCk7XG4gICAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgc3Vic2NyaWJlcnMgb2YgXCIke3RpdGxlfVwiYCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVycyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0U3Vic2NyaWJlcnMoXG4gICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICk7XG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5TZW5kTWVzc2FnZSh0aXRsZSwgbmV4dEVwaXNvZGUsIG1lZGlhLCB1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gc3Vic2NyaWJlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTZW5kTWVzc2FnZShcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG5leHRFcGlzb2RlOiBudW1iZXIsXG4gICAgbWVkaWE6IElNZWRpYSxcbiAgICB1c2VyOiBVc2VyXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLkVtYmVkVGVtcGxhdGUobWVkaWEsIG5leHRFcGlzb2RlKS50aGVuKGVtYmVkID0+IHtcbiAgICAgICAgdXNlclxuICAgICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgRE0gaGFzIGJlZW4gc2VudCB0byBcIiR7XG4gICAgICAgICAgICAgICAgdXNlci51c2VybmFtZVxuICAgICAgICAgICAgICB9XCIgZm9yIFwiJHt0aXRsZX0gRXBpc29kZSAke25leHRFcGlzb2RlfVwiYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFF1ZXVlIEpvYjogXCIke2Vycm9yLm1lc3NhZ2V9XCJgKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIExvZygpIHtcbiAgICBjb25zdCBjb3VudGRvd24gPSBtb21lbnQodGhpcy5Kb2JEYXRlKS50b05vdyh0cnVlKTtcbiAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCh0aGlzLm1lZGlhLnRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBRdWV1ZSBKb2IgeyBRdWV1ZSBFcGlzb2RlOiBcIiR7XG4gICAgICAgIHRoaXMucXVldWUuTmV4dEVwaXNvZGVcbiAgICAgIH1cIiwgXCIke3RpdGxlfSBFcGlzb2RlICR7XG4gICAgICAgIHRoaXMubWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dFxuICAgICAgfVwiICBpbiAgJHtjb3VudGRvd259IH1gXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgVXBkYXRlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHRoaXMubWVkaWEuaWRNYWwpO1xuICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSB7XG4gICAgICAgIFF1ZXVlRGF0YS5VcGRhdGUobWVkaWEsIHRoaXMpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEVycm9yIHdoaWxlIHNlYXJjaGluZyA6IFtNZWRpYVNlYXJjaC5GaW5kKCR7XG4gICAgICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXG4gICAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShtZWRpYTogSU1lZGlhLCBlcGlzb2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpLnRoZW4oY2xpZW50ID0+IHtcbiAgICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxuICAgICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICAgIHVybDogbWVkaWEuY292ZXJJbWFnZS5sYXJnZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiBgKioqJHt0fSoqKmAsXG4gICAgICAgICAgICB1cmw6IGBodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke21lZGlhLmlkTWFsfS9gLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGAqKkVwaXNvZGUgJHtlcGlzb2RlfSoqICpoYXMgYmVlbiBhaXJlZCEqYCxcbiAgICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgICB7IG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLCB2YWx1ZTogYFxcYC11bnN1YiAke3R9XFxgYCB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19