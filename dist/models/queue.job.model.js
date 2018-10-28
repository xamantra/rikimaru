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
        const nextEpisode = this.queue.NextEpisode;
        const media = this.media;
        const title = title_helper_1.TitleHelper.Get(media.title);
        this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
        if (media_status_1.MediaStatus.Completed(media) && media.episodes === 1) {
            this.FindUser(title, nextEpisode, media);
        }
        else if (nextEpisode < media.nextAiringEpisode.next) {
            this.FindUser(title, nextEpisode, media);
        }
    }
    FindUser(title, nextEpisode, media) {
        subscription_data_1.SubscriptionData.GetSubscribers(this.media.idMal).then(subscribers => {
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
//# sourceMappingURL=queue.job.model.js.map