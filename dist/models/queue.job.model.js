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
const schedule = __importStar(require("node-schedule"));
const moment_1 = __importStar(require("moment"));
const client_1 = require("../core/client");
const title_helper_1 = require("../helpers/title.helper");
const media_search_1 = require("../core/media.search");
const colors_1 = require("../core/colors");
class QueueJob {
    constructor(user, media, queue) {
        this.user = user;
        this.media = media;
        this.queue = queue;
    }
    StartQueue() {
        client_1.ClientManager.GetUser(this.user.DiscordId).then(user => {
            const nextEpisode = this.queue.NextEpisode;
            const media = this.media;
            // const title = TitleHelper.Get(media.title);
            if (nextEpisode === media.nextAiringEpisode.next) {
                this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
                this.Job = schedule.scheduleJob(`"${media.title}"`, this.JobDate, () => {
                    user
                        .send(this.Embed(media, media.nextAiringEpisode.next))
                        .then(() => {
                        this.Update();
                    })
                        .catch((error) => {
                        console.log(error.message);
                    });
                });
            }
            else if (nextEpisode < media.nextAiringEpisode.next) {
                console.log(this.queue, media);
                user
                    .send(this.Embed(media, nextEpisode))
                    .then(() => {
                    this.Update();
                })
                    .catch((error) => {
                    console.log(error.message);
                });
            }
            else {
                this.Update();
            }
        });
    }
    Cancel() {
        if (this.Job !== undefined && this.Job !== null) {
            this.Job.cancel(false);
            this.Job = null;
        }
    }
    Log() {
        const countdown = moment_1.default(this.JobDate).toNow(true);
        console.log(`QueueJob >>> User: ${this.user.DiscordId}, Media: ${title_helper_1.TitleHelper.Get(this.media.title)} Episode ${this.media.nextAiringEpisode.next}, Queue: ${this.queue.Id} Episode: ${this.queue.NextEpisode}, JobDate: ${this.JobDate}, TimeRemaining: ${countdown}`);
    }
    Update() {
        if (this.Job !== undefined && this.Job !== null) {
            this.Job.cancel(false);
        }
        media_search_1.MediaSearch.Find(this.media.idMal).then(media => {
            queue_data_1.QueueData.Update(this.user, media, this)
                .then(() => {
                console.log(`Removed Queue: ${media.idMal}`);
            })
                .catch(reason => {
                console.log(reason);
            });
        });
    }
    Embed(media, episode) {
        const client = client_1.ClientManager.GetClient;
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
                    { name: `To view all subscription, type:`, value: `\`-mysubs\`` }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=queue.job.model.js.map