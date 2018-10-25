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
const moment_1 = require("moment");
const client_1 = require("../core/client");
class QueueJob {
    constructor(user, media, queue) {
        this.user = user;
        this.media = media;
        this.queue = queue;
    }
    StartQueue() {
        const user = client_1.ClientManager.GetClient.users.get(this.user.DiscordId);
        const mediaId = this.queue.MediaId;
        const nextEpisode = this.queue.NextEpisode;
        const media = this.media;
        let job = null;
        if (nextEpisode === media.nextAiringEpisode.next) {
            const date = moment_1.unix(media.nextAiringEpisode.timeUntilAiring).toDate();
            job = schedule.scheduleJob(date, () => {
                user.send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`);
                job = null;
                job.cancel(false);
                this.StartQueue();
            });
            return;
        }
        if (nextEpisode < media.nextAiringEpisode.next) {
            queue_data_1.QueueData.Update(mediaId, media.nextAiringEpisode.next)
                .then(() => {
                user.send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`);
                if (job !== null) {
                    job.cancel(false);
                    job = null;
                }
                this.StartQueue();
            })
                .catch((reason) => {
                console.log(reason.message);
            });
            return;
        }
    }
    Log() {
        console.log(`QueueJob >>> User: ${this.user.DiscordId}, Media: ${this.media.title} Episode ${this.media.nextAiringEpisode.next}, Queue: ${this.queue.Id} Episode: ${this.queue.NextEpisode}`);
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=queue.job.model.js.map