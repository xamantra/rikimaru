"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const queue_job_model_1 = require("./../models/queue.job.model");
const result_mysql_model_1 = require("./../models/result.mysql.model");
const json_helper_1 = require("./../helpers/json.helper");
const query_1 = require("./../core/query");
const data_helper_1 = require("../helpers/data.helper");
const array_helper_1 = require("../helpers/array.helper");
class QueueData {
    static get All() {
        return this.Queues;
    }
    static async Init() {
        this.Queues = [];
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.QueueSelectAll(), async (result) => {
                const queues = json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
                if (queues === null || queues === undefined) {
                    reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
                }
                else {
                    queues.forEach(q => {
                        this.Queues.push(q);
                    });
                    resolve();
                }
            });
        });
    }
    static async GetQueue(mediaId) {
        return new Promise(async (resolve, reject) => {
            const q = this.All.find(x => x.MediaId === mediaId);
            if (q !== null && q !== undefined) {
                resolve(q);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static get GetJobs() {
        return this.QueueJobs;
    }
    static AddJob(queueJob) {
        return new Promise((resolve, reject) => {
            queueJob.StartQueue();
            this.QueueJobs.push(queueJob);
            resolve();
        });
    }
    static RemoveJob(queueJob) {
        array_helper_1.ArrayHelper.remove(this.QueueJobs, queueJob, () => {
            console.log(`Queue Job: "${queueJob}"`);
            queueJob.Cancel();
            queueJob = null;
        });
    }
    static async Insert(mediaId, next_episode) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId).then(exists => {
                if (exists === false) {
                    query_1.Query.Execute(this.DataHelper.QueueInsert(mediaId, next_episode), result => {
                        const res = json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                        console.log(res);
                        if (res !== undefined && res !== null) {
                            const q = new subscription_model_1.Queue();
                            q.Id = res.InsertId;
                            q.MediaId = mediaId;
                            q.NextEpisode = next_episode;
                            this.Queues.push(q);
                            console.log(`${q.MediaId} added to queue.`);
                            resolve(q.Id);
                        }
                        else {
                            reject(new Error(`JsonHelper.ArrayConvert<MySqlResult>(result, MySqlResult)[0] is 'null' or 'undefined'.`));
                        }
                    });
                }
                else {
                    const queue = this.Queues.find(x => x.MediaId === mediaId);
                    resolve(queue.Id);
                }
            });
        });
    }
    static async Update(user, media, queueJob) {
        return new Promise(async (resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.QueueUpdate(media.idMal, media.nextAiringEpisode.next)).then(() => {
                this.Init().then(() => {
                    this.GetQueue(media.idMal).then(q => {
                        const qj = new queue_job_model_1.QueueJob(user, media, q);
                        this.AddJob(qj).then(() => {
                            this.RemoveJob(queueJob);
                            resolve();
                        });
                    });
                });
            });
        });
    }
    static async Exists(mediaId) {
        return new Promise(async (resolve, reject) => {
            const q = this.All.find(x => x.MediaId === mediaId);
            if (q === null || q === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static async LogAll() {
        return new Promise(async (resolve, reject) => {
            if (this.Queues === null || this.Queues === undefined) {
                reject(new Error(`"Queues" is 'null' or 'undefined'.`));
            }
            else {
                this.Queues.forEach(q => {
                    console.log(`Queue:`, q.MediaId);
                });
                this.QueueJobs.forEach(qj => {
                    qj.Log();
                });
                resolve();
            }
        });
    }
}
QueueData.Queues = [];
QueueData.QueueJobs = [];
QueueData.DataHelper = data_helper_1.DataHelper.Instance;
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map