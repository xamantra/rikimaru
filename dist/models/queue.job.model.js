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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUVqRCxNQUFhLFFBQVE7SUFFbkIsWUFBbUIsS0FBYSxFQUFTLEtBQVk7UUFBbEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRWxELEtBQUs7UUFDVixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsSUFBSSwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsS0FBYSxFQUFF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LFlBQVk7eUJBQ25CO3FCQUNGO2lCQUNGLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF4SEQsNEJBd0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IG1vbWVudCwgeyB1bml4IH0gZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi4vY29yZS9jb2xvcnNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XG4gIHByaXZhdGUgSm9iRGF0ZTogRGF0ZTtcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XG5cbiAgcHVibGljIENoZWNrKCkge1xuICAgIGNvbnN0IHF1ZXVlRXBpc29kZSA9IHRoaXMucXVldWUuTmV4dEVwaXNvZGU7XG4gICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICB0aGlzLkpvYkRhdGUgPSB1bml4KG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLmFpcmluZ0F0KS50b0RhdGUoKTtcbiAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xuICAgICAgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XG4gICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XG4gICAgICB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcbiAgICBjb25zb2xlLmxvZyhgR2V0dGluZyBzdWJzY3JpYmVycyBvZiBcIiR7dGl0bGV9XCJgKTtcbiAgICBTdWJzY3JpcHRpb25EYXRhLkdldFN1YnNjcmliZXJzKHRoaXMubWVkaWEuaWRNYWwpXG4gICAgICAudGhlbihzdWJzY3JpYmVycyA9PiB7XG4gICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goc3Vic2NyaWJlciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coc3Vic2NyaWJlcik7XG4gICAgICAgICAgQ2xpZW50TWFuYWdlci5HZXRVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKVxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgIGlmICh1c2VyLmlkID09PSBzdWJzY3JpYmVyLkRpc2NvcmRJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuU2VuZE1lc3NhZ2UodGl0bGUsIG5leHRFcGlzb2RlLCBtZWRpYSwgdXNlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNlbmRNZXNzYWdlKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbmV4dEVwaXNvZGU6IG51bWJlcixcbiAgICBtZWRpYTogSU1lZGlhLFxuICAgIHVzZXI6IFVzZXJcbiAgKSB7XG4gICAgY29uc29sZS5sb2coYE9oISwgJHt0aXRsZX0gRXBpc29kZSAke25leHRFcGlzb2RlfSBoYXMgYmVlbiByZWxlYXNlZCFgKTtcbiAgICB0aGlzLkVtYmVkVGVtcGxhdGUobWVkaWEsIG5leHRFcGlzb2RlKS50aGVuKGVtYmVkID0+IHtcbiAgICAgIHVzZXJcbiAgICAgICAgLnNlbmQoZW1iZWQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBRdWV1ZSBKb2I6IFwiJHtlcnJvci5tZXNzYWdlfVwiYCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIExvZygpIHtcbiAgICBjb25zdCBjb3VudGRvd24gPSBtb21lbnQodGhpcy5Kb2JEYXRlKS50b05vdyh0cnVlKTtcbiAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCh0aGlzLm1lZGlhLnRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBRdWV1ZSBKb2IgeyBRdWV1ZSBFcGlzb2RlOiBcIiR7XG4gICAgICAgIHRoaXMucXVldWUuTmV4dEVwaXNvZGVcbiAgICAgIH1cIiwgXCIke3RpdGxlfSBFcGlzb2RlICR7XG4gICAgICAgIHRoaXMubWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dFxuICAgICAgfVwiICBpbiAgJHtjb3VudGRvd259IH1gXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgVXBkYXRlKCkge1xuICAgIGNvbnN0IG1lZGlhID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQodGhpcy5tZWRpYS5pZE1hbCk7XG4gICAgaWYgKG1lZGlhICE9PSBudWxsKSB7XG4gICAgICBRdWV1ZURhdGEuVXBkYXRlKG1lZGlhLCB0aGlzKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBFcnJvciB3aGlsZSBzZWFyY2hpbmcgOiBbTWVkaWFTZWFyY2guRmluZCgke1xuICAgICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXG4gICAgICApO1xuICAgICAgdGhpcy5VcGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIEVtYmVkVGVtcGxhdGUobWVkaWE6IElNZWRpYSwgZXBpc29kZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKS50aGVuKGNsaWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHQgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgICBlbWJlZDoge1xuICAgICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcbiAgICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgICB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKipFcGlzb2RlICR7ZXBpc29kZX0qKiAqaGFzIGJlZW4gYWlyZWQhKmAsXG4gICAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgICAgeyBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCwgdmFsdWU6IGBcXGAtdW5zdWIgJHt0fVxcYGAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==