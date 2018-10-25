"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const queue_job_model_1 = require("./../models/queue.job.model");
const user_data_1 = require("./user.data");
const result_mysql_model_1 = require("./../models/result.mysql.model");
const json_helper_1 = require("./../helpers/json.helper");
const query_1 = require("./../core/query");
const data_helper_1 = require("../helpers/data.helper");
const array_helper_1 = require("../helpers/array.helper");
const media_data_1 = require("./media.data");
class QueueData {
    static async Init() {
        await query_1.Query.Execute(data_helper_1.DataHelper.QueueSelectAll(), async (result) => {
            const queues = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
            await queues.forEach(q => {
                this.Queues.push(q);
            });
        });
    }
    static async GetQueue(mediaId, callback) {
        const q = await this.All.find(x => x.MediaId === mediaId);
        if (q !== null && q !== undefined) {
            await callback(q, false);
        }
        else {
            await callback(null, true);
        }
    }
    static async Insert(mediaId, next_episode, callback) {
        await this.Exists(mediaId, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(await data_helper_1.DataHelper.QueueInsert(mediaId, next_episode), async (result) => {
                    const res = await json_helper_1.JsonHelper.ArrayConvert(result, result_mysql_model_1.MySqlResult)[0];
                    if (res.InsertId !== undefined || res.InsertId !== null) {
                        const q = new subscription_model_1.Queue();
                        q.Id = res.InsertId;
                        q.MediaId = mediaId;
                        q.NextEpisode = next_episode;
                        await this.Queues.push(q);
                        await callback(q.Id);
                    }
                });
            }
        });
    }
    static async Update(mediaId, nextEpisode, callback) {
        const oldQueue = await this.All.find(x => x.MediaId === mediaId);
        await query_1.Query.Execute(await data_helper_1.DataHelper.QueueUpdate(mediaId, nextEpisode), async () => {
            await this.GetQueue(mediaId, async (q, err) => {
                if (err === false) {
                    await array_helper_1.ArrayHelper.remove(this.All, oldQueue, async () => {
                        await this.Queues.push(q);
                        await callback().then(async () => {
                            await media_data_1.MediaData.LoadFromApi().then(async () => {
                                await media_data_1.MediaData.Exists(q.MediaId, async (exists) => {
                                    if (exists === true) {
                                        user_data_1.UserData.All.forEach(user => {
                                            const queueJob = new queue_job_model_1.QueueJob(user, q);
                                            queueJob.StartQueue();
                                        });
                                    }
                                });
                            });
                        });
                    });
                }
            });
        });
    }
    static async Exists(mediaId, callback) {
        const q = this.All.find(x => x.MediaId === mediaId);
        if (q === null || q === undefined) {
            await callback(false);
        }
        else {
            await callback(true);
        }
    }
    static get All() {
        return this.Queues;
    }
    static LogAll() {
        this.Queues.forEach(async (q) => {
            await console.log(`Queue:`, q);
        });
    }
}
QueueData.Queues = [];
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map