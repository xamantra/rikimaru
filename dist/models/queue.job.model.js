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
const media_data_1 = require("../data/media.data");
const moment_1 = require("moment");
const client_1 = require("../core/client");
class QueueJob {
    constructor(user, queue) {
        this.user = user;
        this.queue = queue;
    }
    async StartQueue() {
        const user = await client_1.ClientManager.GetClient.users.get(this.user.DiscordId);
        const mediaId = this.queue.MediaId;
        const nextEpisode = this.queue.NextEpisode;
        const media = await media_data_1.MediaData.GetMediaList.find(x => x.idMal === mediaId);
        let job = null;
        if (nextEpisode === media.nextAiringEpisode.next) {
            const date = await moment_1.unix(media.nextAiringEpisode.timeUntilAiring).toDate();
            job = await schedule.scheduleJob(date, async () => {
                user.send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`);
                await job.cancel(false);
                job = null;
            });
            return;
        }
        if (nextEpisode < media.nextAiringEpisode.next) {
            await queue_data_1.QueueData.Update(mediaId, media.nextAiringEpisode.next, async () => {
                await user.send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`);
                if (job !== null) {
                    await job.cancel(false);
                    job = null;
                }
            });
            return;
        }
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=queue.job.model.js.map