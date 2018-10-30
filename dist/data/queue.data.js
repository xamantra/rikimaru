"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const queue_job_model_1 = require("./../models/queue.job.model");
const json_helper_1 = require("./../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const array_helper_1 = require("../helpers/array.helper");
const mongo_1 = require("../core/mongo");
class QueueData {
    static get All() {
        return this.Queues;
    }
    static async Init() {
        return new Promise((resolve, reject) => {
            this.Clear()
                .then(() => {
                mongo_1.Mongo.FindAll(data_helper_1.DataHelper.queue).then(async (result) => {
                    const queues = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
                    if (queues === null || queues === undefined) {
                        reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
                    }
                    else {
                        queues.forEach(q => {
                            this.Queues.push(q);
                            console.log(q);
                        });
                        resolve();
                    }
                });
            })
                .catch((err) => {
                console.log(err.message);
            });
        });
    }
    static async Clear() {
        return new Promise((resolve, reject) => {
            this.Queues.length = 0;
            this.QueueJobs.length = 0;
            this.Queues.splice(0, this.Queues.length);
            this.QueueJobs.splice(0, this.QueueJobs.length);
            if (this.Queues.length === 0 && this.QueueJobs.length === 0) {
                resolve();
            }
            else {
                reject(new Error(`The arrays were not cleared.`));
            }
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
    static SetQueue($m) {
        this.GetQueue($m.idMal).then(queue => {
            const queueJob = new queue_job_model_1.QueueJob($m, queue);
            this.AddJob(queueJob);
        });
    }
    static get GetJobs() {
        return this.QueueJobs;
    }
    static AddJob(queueJob) {
        return new Promise((resolve, reject) => {
            queueJob.Check();
            this.QueueJobs.push(queueJob);
            resolve();
        });
    }
    static RemoveJob(queueJob) {
        array_helper_1.ArrayHelper.remove(this.QueueJobs, queueJob, () => {
            console.log(`Queue Job: "${queueJob.queue.MediaId}"`);
            queueJob = null;
        });
    }
    static async Insert(mediaId, next_episode) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId).then(exists => {
                if (exists === false) {
                    const data = { media_id: mediaId, next_episode: next_episode };
                    mongo_1.Mongo.Insert(data_helper_1.DataHelper.queue, data).then(result => {
                        if (result.InsertId !== undefined && result.InsertId !== null) {
                            const q = new subscription_model_1.Queue();
                            q.Id = result.InsertId;
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
    static async Update(media, queueJob) {
        return new Promise(async (resolve, reject) => {
            const query = { media_id: media.idMal };
            const newValues = {
                $set: { next_episode: media.nextAiringEpisode.next }
            };
            mongo_1.Mongo.Update(data_helper_1.DataHelper.queue, query, newValues).then(result => {
                this.Init().then(() => {
                    this.GetQueue(media.idMal)
                        .then(q => {
                        const qj = new queue_job_model_1.QueueJob(media, q);
                        this.AddJob(qj).then(() => {
                            this.RemoveJob(queueJob);
                            console.log(`New/Refreshed queue job: ${qj.queue.MediaId}`);
                            resolve();
                        });
                    })
                        .catch(err => {
                        console.log(err);
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
                    console.log(q);
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
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map