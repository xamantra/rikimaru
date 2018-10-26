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
            const title = title_helper_1.TitleHelper.Get(media.title);
            if (nextEpisode === media.nextAiringEpisode.next) {
                this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
                this.Job = schedule.scheduleJob(`"${media.title}"`, this.JobDate, () => {
                    user
                        .send(`***${title}***  *Episode: ${nextEpisode}*  has been aired!`)
                        .then(() => {
                        this.Update(media.idMal);
                    })
                        .catch((error) => {
                        console.log(error.message);
                    });
                });
            }
            else if (nextEpisode < media.nextAiringEpisode.next) {
                user
                    .send(`***${title}***  *Episode: ${nextEpisode}*  has been aired!`)
                    .then(() => {
                    this.Update(media.idMal);
                })
                    .catch((error) => {
                    console.log(error.message);
                });
            }
            else {
                this.Update(media.idMal);
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
    Update(mediaId) {
        media_search_1.MediaSearch.Find(mediaId)
            .then($m => {
            queue_data_1.QueueData.Update($m)
                .then(() => {
                queue_data_1.QueueData.RemoveJob(this);
            })
                .catch((reason) => {
                console.log(reason.message);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    Embed() { }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=queue.job.model.js.map