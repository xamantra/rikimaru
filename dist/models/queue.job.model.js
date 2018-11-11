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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFFM0QsTUFBYSxRQUFRO0lBRW5CLFlBQW1CLEtBQWEsRUFBUyxLQUFZO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVsRCxLQUFLLENBQUMsS0FBSztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9ELElBQUksMEJBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FB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RCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7d0JBQ25CLEdBQUcsRUFBRSxpQ0FBaUMsS0FBSyxDQUFDLEtBQUssR0FBRzt3QkFDcEQsV0FBVyxFQUFFLGFBQWEsT0FBTyxzQkFBc0I7d0JBQ3ZELE1BQU0sRUFBRTs0QkFDTixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRTs0QkFDM0Q7Z0NBQ0UsSUFBSSxFQUFFLGlDQUFpQztnQ0FDdkMsS0FBSyxFQUFFLGVBQWU7NkJBQ3ZCO3lCQUNGO3dCQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDckIsTUFBTSxFQUFFOzRCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7NEJBQy9CLElBQUksRUFBRSxZQUFZO3lCQUNuQjtxQkFDRjtpQkFDRixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBcElELDRCQW9JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2NvcmUvY29sb3JzXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgUXVldWVKb2Ige1xuICBwcml2YXRlIEpvYkRhdGU6IERhdGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYTogSU1lZGlhLCBwdWJsaWMgcXVldWU6IFF1ZXVlKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBDaGVjaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVldWVFcGlzb2RlID0gdGhpcy5xdWV1ZS5OZXh0RXBpc29kZTtcbiAgICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYTtcbiAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIHRoaXMuSm9iRGF0ZSA9IHVuaXgobWVkaWEubmV4dEFpcmluZ0VwaXNvZGUuYWlyaW5nQXQpLnRvRGF0ZSgpO1xuICAgICAgaWYgKE1lZGlhU3RhdHVzLkNvbXBsZXRlZChtZWRpYSkgJiYgbWVkaWEuZXBpc29kZXMgPT09IDEpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAocXVldWVFcGlzb2RlIDwgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dCkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBGaW5kVXNlcih0aXRsZTogc3RyaW5nLCBuZXh0RXBpc29kZTogbnVtYmVyLCBtZWRpYTogSU1lZGlhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBHZXR0aW5nIHN1YnNjcmliZXJzIG9mIFwiJHt0aXRsZX1cImApO1xuICAgICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFN1YnNjcmliZXJzKFxuICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXG4gICAgICApO1xuICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0VXNlcihzdWJzY3JpYmVyLkRpc2NvcmRJZCk7XG4gICAgICAgIGlmIChOdWxsQ2hlY2suRmluZSh1c2VyKSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuU2VuZE1lc3NhZ2UodGl0bGUsIG5leHRFcGlzb2RlLCBtZWRpYSwgdXNlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IHN1YnNjcmliZXJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgU2VuZE1lc3NhZ2UoXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBuZXh0RXBpc29kZTogbnVtYmVyLFxuICAgIG1lZGlhOiBJTWVkaWEsXG4gICAgdXNlcjogVXNlclxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5FbWJlZFRlbXBsYXRlKG1lZGlhLCBuZXh0RXBpc29kZSkudGhlbihlbWJlZCA9PiB7XG4gICAgICAgIHVzZXJcbiAgICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYERNIGhhcyBiZWVuIHNlbnQgdG8gXCIke1xuICAgICAgICAgICAgICAgIHVzZXIudXNlcm5hbWVcbiAgICAgICAgICAgICAgfVwiIGZvciBcIiR7dGl0bGV9IEVwaXNvZGUgJHtuZXh0RXBpc29kZX1cImBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBRdWV1ZSBKb2I6IFwiJHtlcnJvci5tZXNzYWdlfVwiYCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBMb2coKSB7XG4gICAgY29uc3QgY291bnRkb3duID0gbW9tZW50KHRoaXMuSm9iRGF0ZSkudG9Ob3codHJ1ZSk7XG4gICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQodGhpcy5tZWRpYS50aXRsZSk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgUXVldWUgSm9iIHsgUXVldWUgRXBpc29kZTogXCIke1xuICAgICAgICB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlXG4gICAgICB9XCIsIFwiJHt0aXRsZX0gRXBpc29kZSAke1xuICAgICAgICB0aGlzLm1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHRcbiAgICAgIH1cIiAgaW4gICR7Y291bnRkb3dufSB9YFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIFVwZGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldCh0aGlzLm1lZGlhLmlkTWFsKTtcbiAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkge1xuICAgICAgICBhd2FpdCBRdWV1ZURhdGEuVXBkYXRlKG1lZGlhLCB0aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgRXJyb3Igd2hpbGUgc2VhcmNoaW5nIDogW01lZGlhU2VhcmNoLkZpbmQoJHtcbiAgICAgICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICAgICB9KV0uIFRyeWluZyBhZ2Fpbi4uLmBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZFRlbXBsYXRlKG1lZGlhOiBJTWVkaWEsIGVwaXNvZGU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCB0ID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICAgIGNvbG9yOiBDb2xvci5SYW5kb20sXG4gICAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgICAgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGl0bGU6IGAqKioke3R9KioqYCxcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqRXBpc29kZSAke2VwaXNvZGV9KiogKmhhcyBiZWVuIGFpcmVkISpgLFxuICAgICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAgIHsgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsIHZhbHVlOiBgXFxgLXVuc3ViICR7dH1cXGBgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXNvbHZlKGVtYmVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=