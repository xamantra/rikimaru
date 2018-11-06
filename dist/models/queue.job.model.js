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
class QueueJob {
    constructor(media, queue) {
        this.media = media;
        this.queue = queue;
    }
    Check() {
        const queueEpisode = this.queue.NextEpisode;
        const media = this.media;
        const title = title_helper_1.TitleHelper.Get(media.title);
        this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
        if (media_status_1.MediaStatus.Completed(media) && media.episodes === 1) {
            this.FindUser(title, queueEpisode, media);
        }
        else if (queueEpisode < media.nextAiringEpisode.next) {
            this.FindUser(title, queueEpisode, media);
        }
    }
    FindUser(title, nextEpisode, media) {
        console.log(`Getting subscribers of "${title}"`);
        subscription_data_1.SubscriptionData.GetSubscribers(this.media.idMal)
            .then(subscribers => {
            subscribers.forEach(subscriber => {
                console.log(subscriber);
                client_1.ClientManager.GetUser(subscriber.DiscordId)
                    .then(user => {
                    if (user.id === subscriber.DiscordId) {
                        this.SendMessage(title, nextEpisode, media, user);
                    }
                })
                    .catch((err) => {
                    console.log(err.message);
                });
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    SendMessage(title, nextEpisode, media, user) {
        console.log(`Oh!, ${title} Episode ${nextEpisode} has been released!`);
        this.EmbedTemplate(media, nextEpisode).then(embed => {
            user
                .send(embed)
                .then(() => {
                this.Update();
            })
                .catch((error) => {
                console.log(`Queue Job: "${error.message}"`);
            });
        });
    }
    Log() {
        const countdown = moment_1.default(this.JobDate).toNow(true);
        const title = title_helper_1.TitleHelper.Get(this.media.title);
        console.log(`Queue Job { Queue Episode: "${this.queue.NextEpisode}", "${title} Episode ${this.media.nextAiringEpisode.next}"  in  ${countdown} }`);
    }
    async Update() {
        const media = await anime_cache_1.AnimeCache.Get(this.media.idMal);
        if (media !== null) {
            queue_data_1.QueueData.Update(media, this)
                .then(() => {
                console.log(`Removed Queue: ${media.idMal}`);
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            console.warn(`Error while searching : [MediaSearch.Find(${this.media.idMal})]. Trying again...`);
            this.Update();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUVqRCxNQUFhLFFBQVE7SUFFbkIsWUFBbUIsS0FBYSxFQUFTLEtBQVk7UUFBbEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRWxELEtBQUs7UUFDVixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsSUFBSSwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsS0FBYSxFQUFF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LFlBQVk7eUJBQ25CO3FCQUNGO2lCQUNGLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF4SEQsNEJBd0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XHJcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuLi9jb3JlL2NvbG9yc1wiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IE1lZGlhU3RhdHVzIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc3RhdHVzXCI7XHJcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXVlSm9iIHtcclxuICBwcml2YXRlIEpvYkRhdGU6IERhdGU7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XHJcblxyXG4gIHB1YmxpYyBDaGVjaygpIHtcclxuICAgIGNvbnN0IHF1ZXVlRXBpc29kZSA9IHRoaXMucXVldWUuTmV4dEVwaXNvZGU7XHJcbiAgICBjb25zdCBtZWRpYSA9IHRoaXMubWVkaWE7XHJcbiAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XHJcbiAgICB0aGlzLkpvYkRhdGUgPSB1bml4KG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLmFpcmluZ0F0KS50b0RhdGUoKTtcclxuICAgIGlmIChNZWRpYVN0YXR1cy5Db21wbGV0ZWQobWVkaWEpICYmIG1lZGlhLmVwaXNvZGVzID09PSAxKSB7XHJcbiAgICAgIHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xyXG4gICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XHJcbiAgICAgIHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBGaW5kVXNlcih0aXRsZTogc3RyaW5nLCBuZXh0RXBpc29kZTogbnVtYmVyLCBtZWRpYTogSU1lZGlhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgR2V0dGluZyBzdWJzY3JpYmVycyBvZiBcIiR7dGl0bGV9XCJgKTtcclxuICAgIFN1YnNjcmlwdGlvbkRhdGEuR2V0U3Vic2NyaWJlcnModGhpcy5tZWRpYS5pZE1hbClcclxuICAgICAgLnRoZW4oc3Vic2NyaWJlcnMgPT4ge1xyXG4gICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhzdWJzY3JpYmVyKTtcclxuICAgICAgICAgIENsaWVudE1hbmFnZXIuR2V0VXNlcihzdWJzY3JpYmVyLkRpc2NvcmRJZClcclxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IHN1YnNjcmliZXIuRGlzY29yZElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbmRNZXNzYWdlKHRpdGxlLCBuZXh0RXBpc29kZSwgbWVkaWEsIHVzZXIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNlbmRNZXNzYWdlKFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIG5leHRFcGlzb2RlOiBudW1iZXIsXHJcbiAgICBtZWRpYTogSU1lZGlhLFxyXG4gICAgdXNlcjogVXNlclxyXG4gICkge1xyXG4gICAgY29uc29sZS5sb2coYE9oISwgJHt0aXRsZX0gRXBpc29kZSAke25leHRFcGlzb2RlfSBoYXMgYmVlbiByZWxlYXNlZCFgKTtcclxuICAgIHRoaXMuRW1iZWRUZW1wbGF0ZShtZWRpYSwgbmV4dEVwaXNvZGUpLnRoZW4oZW1iZWQgPT4ge1xyXG4gICAgICB1c2VyXHJcbiAgICAgICAgLnNlbmQoZW1iZWQpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgUXVldWUgSm9iOiBcIiR7ZXJyb3IubWVzc2FnZX1cImApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgTG9nKCkge1xyXG4gICAgY29uc3QgY291bnRkb3duID0gbW9tZW50KHRoaXMuSm9iRGF0ZSkudG9Ob3codHJ1ZSk7XHJcbiAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCh0aGlzLm1lZGlhLnRpdGxlKTtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgUXVldWUgSm9iIHsgUXVldWUgRXBpc29kZTogXCIke1xyXG4gICAgICAgIHRoaXMucXVldWUuTmV4dEVwaXNvZGVcclxuICAgICAgfVwiLCBcIiR7dGl0bGV9IEVwaXNvZGUgJHtcclxuICAgICAgICB0aGlzLm1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHRcclxuICAgICAgfVwiICBpbiAgJHtjb3VudGRvd259IH1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBVcGRhdGUoKSB7XHJcbiAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHRoaXMubWVkaWEuaWRNYWwpO1xyXG4gICAgaWYgKG1lZGlhICE9PSBudWxsKSB7XHJcbiAgICAgIFF1ZXVlRGF0YS5VcGRhdGUobWVkaWEsIHRoaXMpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgYEVycm9yIHdoaWxlIHNlYXJjaGluZyA6IFtNZWRpYVNlYXJjaC5GaW5kKCR7XHJcbiAgICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXHJcbiAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIEVtYmVkVGVtcGxhdGUobWVkaWE6IElNZWRpYSwgZXBpc29kZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCkudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHQgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICAgICAgZW1iZWQ6IHtcclxuICAgICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcclxuICAgICAgICAgICAgdGh1bWJuYWlsOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBgKioqJHt0fSoqKmAsXHJcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKipFcGlzb2RlICR7ZXBpc29kZX0qKiAqaGFzIGJlZW4gYWlyZWQhKmAsXHJcbiAgICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICAgIHsgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsIHZhbHVlOiBgXFxgLXVuc3ViICR7dH1cXGBgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlc29sdmUoZW1iZWQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=