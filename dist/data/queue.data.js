"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_job_model_1 = require("./../models/queue.job.model");
const json_helper_1 = require("./../helpers/json.helper");
const tables_1 = require("../core/tables");
const array_helper_1 = require("../helpers/array.helper");
const mongo_1 = require("../core/mongo");
const subscription_model_1 = require("../models/subscription.model");
class QueueData {
    static get All() {
        return this.Queues;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            await this.Clear()
                .then(() => {
                this.Initializing = true;
            })
                .catch((err) => {
                console.log(err.message);
            });
            const result = await mongo_1.Mongo.FindAll(tables_1.Tables.queue);
            const queues = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
            if (queues === null || queues === undefined) {
                this.Initializing = false;
                reject(new Error(`"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`));
            }
            else {
                if (queues.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                queues.forEach(q => {
                    this.Queues.push(q);
                });
                this.Initializing = false;
                resolve();
            }
        });
    }
    static async Clear() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
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
            await this.OnReady();
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
        this.GetQueue($m.idMal).then(async (queue) => {
            await this.OnReady();
            const queueJob = new queue_job_model_1.QueueJob($m, queue);
            this.AddJob(queueJob);
        });
    }
    static GetJobs() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            resolve(this.QueueJobs);
        });
    }
    static AddJob(queueJob) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            queueJob.Check();
            this.QueueJobs.push(queueJob);
            resolve();
        });
    }
    static async RemoveJob(queueJob) {
        await this.OnReady();
        array_helper_1.ArrayHelper.remove(this.QueueJobs, queueJob, async () => {
            queueJob = null;
        });
    }
    static async Insert(mediaId, next_episode) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(mediaId);
            if (exists === false) {
                const data = { media_id: mediaId, next_episode: next_episode };
                const result = await mongo_1.Mongo.Insert(tables_1.Tables.queue, data);
                if (result.insertedId !== undefined && result.insertedId !== null) {
                    const q = new subscription_model_1.Queue();
                    q.Id = result.insertedId;
                    q.MediaId = mediaId;
                    q.NextEpisode = next_episode;
                    this.Queues.push(q);
                    resolve(q.Id);
                }
                else {
                    reject(new Error(`ERROR: 654567898765`));
                }
            }
            else {
                const queue = this.Queues.find(x => x.MediaId === mediaId);
                resolve(queue.Id);
            }
        });
    }
    static async Update(media, queueJob) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const query = { media_id: media.idMal };
            const newValues = {
                $set: { next_episode: media.nextAiringEpisode.next }
            };
            await mongo_1.Mongo.Update(tables_1.Tables.queue, query, newValues);
            await this.Init();
            await this.Init().catch(err => {
                console.log(err);
            });
            const q = await this.GetQueue(media.idMal).catch(err => {
                console.log(err);
            });
            let qj = null;
            if (q instanceof subscription_model_1.Queue)
                qj = new queue_job_model_1.QueueJob(media, q);
            await this.AddJob(qj);
            await this.RemoveJob(queueJob);
            resolve();
        });
    }
    static async Exists(mediaId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
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
            await this.OnReady();
            if (this.Queues === null || this.Queues === undefined) {
                reject(new Error(`"Queues" is 'null' or 'undefined'.`));
            }
            else {
                console.log(this.Queues);
                console.log(this.QueueJobs);
                resolve();
            }
        });
    }
    static OnReady() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (this.Initializing === false) {
                    resolve();
                }
            }, 1);
        });
    }
}
QueueData.Queues = [];
QueueData.QueueJobs = [];
QueueData.Initializing = false;
exports.QueueData = QueueData;
