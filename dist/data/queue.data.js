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
    constructor() {
        this.Queues = [];
        this.DataHelper = data_helper_1.DataHelper.Instance;
        this.UserData = user_data_1.UserData.Instance;
        this.MediaData = media_data_1.MediaData.Instance;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get All() {
        return this.Queues;
    }
    async Init() {
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.QueueSelectAll(), async (result) => {
                const queues = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
                if (queues === null || queues === undefined) {
                    reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
                }
                else {
                    await queues.forEach(q => {
                        this.Queues.push(q);
                    });
                    resolve();
                }
            });
        });
    }
    async GetQueue(mediaId) {
        return new Promise(async (resolve, reject) => {
            const q = await this.All.find(x => x.MediaId === mediaId);
            if (q !== null && q !== undefined) {
                resolve(q);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
            }
        });
    }
    async Insert(mediaId, next_episode) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId, async (exists) => {
                if (exists === false) {
                    await query_1.Query.Execute(this.DataHelper.QueueInsert(mediaId, next_episode), async (result) => {
                        const res = await json_helper_1.JsonHelper.ArrayConvert(result, result_mysql_model_1.MySqlResult)[0];
                        if (res !== undefined && res !== null) {
                            const q = new subscription_model_1.Queue();
                            q.Id = res.InsertId;
                            q.MediaId = mediaId;
                            q.NextEpisode = next_episode;
                            await this.Queues.push(q);
                            resolve(q.Id);
                        }
                    });
                }
                else {
                    reject(new Error(`Queue with mediaId: "${mediaId}" already exists.`));
                }
            });
        });
    }
    async Update(mediaId, nextEpisode) {
        return new Promise(async (resolve, reject) => {
            const oldQueue = await this.All.find(x => x.MediaId === mediaId);
            query_1.Query.Execute(this.DataHelper.QueueUpdate(mediaId, nextEpisode), async () => {
                await this.GetQueue(mediaId)
                    .then(async (q) => {
                    await array_helper_1.ArrayHelper.remove(this.All, oldQueue, async () => {
                        await this.Queues.push(q);
                        await this.MediaData.LoadFromApi().then(async () => {
                            await this.MediaData.GetMediaList.forEach(async (m) => {
                                await this.UserData.All.forEach(async (user) => {
                                    const queueJob = new queue_job_model_1.QueueJob(user, m, q);
                                    await queueJob.StartQueue();
                                });
                            });
                        });
                        resolve();
                    });
                })
                    .catch((reason) => {
                    console.log(reason.message);
                });
            });
        });
    }
    async Exists(mediaId, callback) {
        return new Promise(async (resolve, reject) => {
            const q = await this.All.find(x => x.MediaId === mediaId);
            if (q === null || q === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    async LogAll() {
        return new Promise(async (resolve, reject) => {
            if (this.Queues === null || this.Queues === undefined) {
                reject(new Error(`"Queues" is 'null' or 'undefined'.`));
            }
            else {
                await this.Queues.forEach(q => {
                    console.log(`Queue:`, q.MediaId);
                });
                resolve();
            }
        });
    }
}
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map