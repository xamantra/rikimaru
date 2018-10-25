"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_data_1 = require("./../data/media.data");
const queue_data_1 = require("./../data/queue.data");
const schedule = __importStar(require("node-schedule"));
const moment_1 = __importStar(require("moment"));
const client_1 = require("../core/client");
const title_helper_1 = require("../helpers/title.helper");
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
        if (nextEpisode === media.nextAiringEpisode.next) {
            this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
            this.Job = schedule.scheduleJob(`User: "${user.username}", Media: "${media.title}"`, this.JobDate, () => {
                user
                    .send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`)
                    .then(() => {
                    this.Job = null;
                    this.Job.cancel(false);
                    queue_data_1.QueueData.RemoveJob(this);
                    media_data_1.MediaData.LoadFromApi().catch((reason) => {
                        console.log(reason.message);
                    });
                })
                    .catch(error => {
                    console.log(error);
                });
            });
        }
        if (nextEpisode < media.nextAiringEpisode.next) {
            queue_data_1.QueueData.Update(mediaId, media.nextAiringEpisode.next)
                .then(() => {
                user.send(`***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`);
                if (this.Job !== null) {
                    queue_data_1.QueueData.RemoveJob(this);
                }
            })
                .catch((reason) => {
                console.log(reason.message);
            });
            return;
        }
    }
    Cancel() {
        this.Job.cancel(false);
        this.Job = null;
    }
    Log() {
        const countdown = moment_1.default(this.JobDate).toNow(true);
        console.log(`QueueJob >>> User: ${this.user.DiscordId}, Media: ${title_helper_1.TitleHelper.Get(this.media.title)} Episode ${this.media.nextAiringEpisode.next}, Queue: ${this.queue.Id} Episode: ${this.queue.NextEpisode}, JobDate: ${this.JobDate}, TimeRemaining: ${countdown}`);
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=queue.job.model.js.map