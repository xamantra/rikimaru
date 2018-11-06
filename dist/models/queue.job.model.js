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
    StartCheck() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUVqRCxNQUFhLFFBQVE7SUFFbkIsWUFBbUIsS0FBYSxFQUFTLEtBQVk7UUFBbEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRWxELFVBQVU7UUFDZixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsSUFBSSwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsS0FBYSxFQUFF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LFlBQVk7eUJBQ25CO3FCQUNGO2lCQUNGLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF4SEQsNEJBd0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XHJcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuLi9jb3JlL2NvbG9yc1wiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IE1lZGlhU3RhdHVzIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc3RhdHVzXCI7XHJcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXVlSm9iIHtcclxuICBwcml2YXRlIEpvYkRhdGU6IERhdGU7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XHJcblxyXG4gIHB1YmxpYyBTdGFydENoZWNrKCkge1xyXG4gICAgY29uc3QgcXVldWVFcGlzb2RlID0gdGhpcy5xdWV1ZS5OZXh0RXBpc29kZTtcclxuICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYTtcclxuICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcclxuICAgIHRoaXMuSm9iRGF0ZSA9IHVuaXgobWVkaWEubmV4dEFpcmluZ0VwaXNvZGUuYWlyaW5nQXQpLnRvRGF0ZSgpO1xyXG4gICAgaWYgKE1lZGlhU3RhdHVzLkNvbXBsZXRlZChtZWRpYSkgJiYgbWVkaWEuZXBpc29kZXMgPT09IDEpIHtcclxuICAgICAgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XHJcbiAgICB9IGVsc2UgaWYgKHF1ZXVlRXBpc29kZSA8IG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpIHtcclxuICAgICAgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcclxuICAgIGNvbnNvbGUubG9nKGBHZXR0aW5nIHN1YnNjcmliZXJzIG9mIFwiJHt0aXRsZX1cImApO1xyXG4gICAgU3Vic2NyaXB0aW9uRGF0YS5HZXRTdWJzY3JpYmVycyh0aGlzLm1lZGlhLmlkTWFsKVxyXG4gICAgICAudGhlbihzdWJzY3JpYmVycyA9PiB7XHJcbiAgICAgICAgc3Vic2NyaWJlcnMuZm9yRWFjaChzdWJzY3JpYmVyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHN1YnNjcmliZXIpO1xyXG4gICAgICAgICAgQ2xpZW50TWFuYWdlci5HZXRVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKVxyXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICBpZiAodXNlci5pZCA9PT0gc3Vic2NyaWJlci5EaXNjb3JkSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2VuZE1lc3NhZ2UodGl0bGUsIG5leHRFcGlzb2RlLCBtZWRpYSwgdXNlcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgU2VuZE1lc3NhZ2UoXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgbmV4dEVwaXNvZGU6IG51bWJlcixcclxuICAgIG1lZGlhOiBJTWVkaWEsXHJcbiAgICB1c2VyOiBVc2VyXHJcbiAgKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgT2ghLCAke3RpdGxlfSBFcGlzb2RlICR7bmV4dEVwaXNvZGV9IGhhcyBiZWVuIHJlbGVhc2VkIWApO1xyXG4gICAgdGhpcy5FbWJlZFRlbXBsYXRlKG1lZGlhLCBuZXh0RXBpc29kZSkudGhlbihlbWJlZCA9PiB7XHJcbiAgICAgIHVzZXJcclxuICAgICAgICAuc2VuZChlbWJlZClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBRdWV1ZSBKb2I6IFwiJHtlcnJvci5tZXNzYWdlfVwiYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBMb2coKSB7XHJcbiAgICBjb25zdCBjb3VudGRvd24gPSBtb21lbnQodGhpcy5Kb2JEYXRlKS50b05vdyh0cnVlKTtcclxuICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KHRoaXMubWVkaWEudGl0bGUpO1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGBRdWV1ZSBKb2IgeyBRdWV1ZSBFcGlzb2RlOiBcIiR7XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5OZXh0RXBpc29kZVxyXG4gICAgICB9XCIsIFwiJHt0aXRsZX0gRXBpc29kZSAke1xyXG4gICAgICAgIHRoaXMubWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dFxyXG4gICAgICB9XCIgIGluICAke2NvdW50ZG93bn0gfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIFVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IG1lZGlhID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQodGhpcy5tZWRpYS5pZE1hbCk7XHJcbiAgICBpZiAobWVkaWEgIT09IG51bGwpIHtcclxuICAgICAgUXVldWVEYXRhLlVwZGF0ZShtZWRpYSwgdGhpcylcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgUmVtb3ZlZCBRdWV1ZTogJHttZWRpYS5pZE1hbH1gKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICBgRXJyb3Igd2hpbGUgc2VhcmNoaW5nIDogW01lZGlhU2VhcmNoLkZpbmQoJHtcclxuICAgICAgICAgIHRoaXMubWVkaWEuaWRNYWxcclxuICAgICAgICB9KV0uIFRyeWluZyBhZ2Fpbi4uLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShtZWRpYTogSU1lZGlhLCBlcGlzb2RlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKS50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSB7XHJcbiAgICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxyXG4gICAgICAgICAgICB0aHVtYm5haWw6IHtcclxuICAgICAgICAgICAgICB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6IGAqKioke3R9KioqYCxcclxuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGAqKkVwaXNvZGUgJHtlcGlzb2RlfSoqICpoYXMgYmVlbiBhaXJlZCEqYCxcclxuICAgICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCwgdmFsdWU6IGBcXGAtdW5zdWIgJHt0fVxcYGAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzb2x2ZShlbWJlZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==