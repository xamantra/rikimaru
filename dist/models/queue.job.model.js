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
const media_search_1 = require("../core/media.search");
const colors_1 = require("../core/colors");
const subscription_data_1 = require("../data/subscription.data");
const media_status_1 = require("../core/media.status");
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
    Update() {
        media_search_1.MediaSearch.Find(this.media.idMal)
            .then(media => {
            queue_data_1.QueueData.Update(media, this)
                .then(() => {
                console.log(`Removed Queue: ${media.idMal}`);
            })
                .catch(err => {
                console.log(err);
            });
        })
            .catch(error => {
            console.warn(`Error while searching : [MediaSearch.Find(${this.media.idMal})]. Trying again...`);
            this.Update();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBQ3RELHVEQUFtRDtBQUNuRCwyQ0FBdUM7QUFDdkMsaUVBQTZEO0FBRTdELHVEQUFtRDtBQUVuRCxNQUFhLFFBQVE7SUFFbkIsWUFBbUIsS0FBYSxFQUFTLEtBQVk7UUFBbEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRWxELEtBQUs7UUFDVixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsSUFBSSwwQkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFTyxRQUFRLENBQUMsS0FBYSxFQUFFLFdBQW1CLEVBQUUsS0FBYTtRQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELG9DQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDbEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsc0JBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztxQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNYLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsU0FBUyxFQUFFO3dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNuRDtnQkFDSCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxXQUFXLENBQ2pCLEtBQWEsRUFDYixXQUFtQixFQUNuQixLQUFhLEVBQ2IsSUFBVTtRQUVWLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsRCxJQUFJO2lCQUNELElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxHQUFHO1FBQ1IsTUFBTSxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FDVCwrQkFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQ2IsT0FBTyxLQUFLLFlBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUMvQixVQUFVLFNBQVMsSUFBSSxDQUN4QixDQUFDO0lBQ0osQ0FBQztJQUVPLE1BQU07UUFDWiwwQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWixzQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO2lCQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxJQUFJLENBQ1YsNkNBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUNiLHFCQUFxQixDQUN0QixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQWU7UUFDeEQsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxDQUFDLEdBQUcsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLEtBQUssR0FBRztvQkFDWixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLGNBQUssQ0FBQyxNQUFNO3dCQUNuQixTQUFTLEVBQUU7NEJBQ1QsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSzt5QkFDNUI7d0JBQ0QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3dCQUNuQixHQUFHLEVBQUUsaUNBQWlDLEtBQUssQ0FBQyxLQUFLLEdBQUc7d0JBQ3BELFdBQVcsRUFBRSxhQUFhLE9BQU8sc0JBQXNCO3dCQUN2RCxNQUFNLEVBQUU7NEJBQ04sRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUU7NEJBQzNEO2dDQUNFLElBQUksRUFBRSxpQ0FBaUM7Z0NBQ3ZDLEtBQUssRUFBRSxlQUFlOzZCQUN2Qjt5QkFDRjt3QkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7d0JBQ3JCLE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTOzRCQUMvQixJQUFJLEVBQUUsWUFBWTt5QkFDbkI7cUJBQ0Y7aUJBQ0YsQ0FBQztnQkFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpIRCw0QkF5SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IG1vbWVudCwgeyB1bml4IH0gZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2NvcmUvY29sb3JzXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XHJcbiAgcHJpdmF0ZSBKb2JEYXRlOiBEYXRlO1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYTogSU1lZGlhLCBwdWJsaWMgcXVldWU6IFF1ZXVlKSB7fVxyXG5cclxuICBwdWJsaWMgQ2hlY2soKSB7XHJcbiAgICBjb25zdCBxdWV1ZUVwaXNvZGUgPSB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlO1xyXG4gICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xyXG4gICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xyXG4gICAgdGhpcy5Kb2JEYXRlID0gdW5peChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCkudG9EYXRlKCk7XHJcbiAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xyXG4gICAgICB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcclxuICAgIH0gZWxzZSBpZiAocXVldWVFcGlzb2RlIDwgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dCkge1xyXG4gICAgICB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgRmluZFVzZXIodGl0bGU6IHN0cmluZywgbmV4dEVwaXNvZGU6IG51bWJlciwgbWVkaWE6IElNZWRpYSkge1xyXG4gICAgY29uc29sZS5sb2coYEdldHRpbmcgc3Vic2NyaWJlcnMgb2YgXCIke3RpdGxlfVwiYCk7XHJcbiAgICBTdWJzY3JpcHRpb25EYXRhLkdldFN1YnNjcmliZXJzKHRoaXMubWVkaWEuaWRNYWwpXHJcbiAgICAgIC50aGVuKHN1YnNjcmliZXJzID0+IHtcclxuICAgICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKHN1YnNjcmliZXIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coc3Vic2NyaWJlcik7XHJcbiAgICAgICAgICBDbGllbnRNYW5hZ2VyLkdldFVzZXIoc3Vic2NyaWJlci5EaXNjb3JkSWQpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh1c2VyLmlkID09PSBzdWJzY3JpYmVyLkRpc2NvcmRJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZW5kTWVzc2FnZSh0aXRsZSwgbmV4dEVwaXNvZGUsIG1lZGlhLCB1c2VyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZW5kTWVzc2FnZShcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBuZXh0RXBpc29kZTogbnVtYmVyLFxyXG4gICAgbWVkaWE6IElNZWRpYSxcclxuICAgIHVzZXI6IFVzZXJcclxuICApIHtcclxuICAgIGNvbnNvbGUubG9nKGBPaCEsICR7dGl0bGV9IEVwaXNvZGUgJHtuZXh0RXBpc29kZX0gaGFzIGJlZW4gcmVsZWFzZWQhYCk7XHJcbiAgICB0aGlzLkVtYmVkVGVtcGxhdGUobWVkaWEsIG5leHRFcGlzb2RlKS50aGVuKGVtYmVkID0+IHtcclxuICAgICAgdXNlclxyXG4gICAgICAgIC5zZW5kKGVtYmVkKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFF1ZXVlIEpvYjogXCIke2Vycm9yLm1lc3NhZ2V9XCJgKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIExvZygpIHtcclxuICAgIGNvbnN0IGNvdW50ZG93biA9IG1vbWVudCh0aGlzLkpvYkRhdGUpLnRvTm93KHRydWUpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQodGhpcy5tZWRpYS50aXRsZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYFF1ZXVlIEpvYiB7IFF1ZXVlIEVwaXNvZGU6IFwiJHtcclxuICAgICAgICB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlXHJcbiAgICAgIH1cIiwgXCIke3RpdGxlfSBFcGlzb2RlICR7XHJcbiAgICAgICAgdGhpcy5tZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0XHJcbiAgICAgIH1cIiAgaW4gICR7Y291bnRkb3dufSB9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgVXBkYXRlKCkge1xyXG4gICAgTWVkaWFTZWFyY2guRmluZCh0aGlzLm1lZGlhLmlkTWFsKVxyXG4gICAgICAudGhlbihtZWRpYSA9PiB7XHJcbiAgICAgICAgUXVldWVEYXRhLlVwZGF0ZShtZWRpYSwgdGhpcylcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICBgRXJyb3Igd2hpbGUgc2VhcmNoaW5nIDogW01lZGlhU2VhcmNoLkZpbmQoJHtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYS5pZE1hbFxyXG4gICAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShtZWRpYTogSU1lZGlhLCBlcGlzb2RlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKS50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSB7XHJcbiAgICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxyXG4gICAgICAgICAgICB0aHVtYm5haWw6IHtcclxuICAgICAgICAgICAgICB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6IGAqKioke3R9KioqYCxcclxuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHttZWRpYS5pZE1hbH0vYCxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGAqKkVwaXNvZGUgJHtlcGlzb2RlfSoqICpoYXMgYmVlbiBhaXJlZCEqYCxcclxuICAgICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgICAgeyBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCwgdmFsdWU6IGBcXGAtdW5zdWIgJHt0fVxcYGAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzb2x2ZShlbWJlZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==