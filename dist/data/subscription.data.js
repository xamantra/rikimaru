"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./../core/query");
const media_data_1 = require("./media.data");
const queue_job_model_1 = require("./../models/queue.job.model");
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
class SubscriptionData {
    constructor() {
        this.DataHelper = data_helper_1.DataHelper.Instance;
        this.UserData = user_data_1.UserData.Instance;
        this.QueueData = queue_data_1.QueueData.Instance;
        this.MediaData = media_data_1.MediaData.Instance;
        this.SubscriptionList = [];
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get All() {
        return this.SubscriptionList;
    }
    async Init() {
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.SubsSelectAll(), async (result) => {
                const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
                if (subs === null || subs === undefined) {
                    reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
                }
                else {
                    await subs.forEach(async (sub) => {
                        await this.SubscriptionList.push(sub);
                        const queue = await this.QueueData.All.find(q => q.MediaId === sub.MediaId);
                        const media = await this.MediaData.GetMediaList.find(x => x.idMal === queue.MediaId);
                        if (queue !== undefined &&
                            queue !== null &&
                            media !== undefined &&
                            media !== null) {
                            await this.UserData.All.forEach(u => {
                                const queueJob = new queue_job_model_1.QueueJob(u, media, queue);
                                queueJob.StartQueue();
                            });
                        }
                    });
                    resolve();
                }
            });
        });
    }
    async GetSub(mediaId, userId) {
        return new Promise(async (resolve, reject) => {
            const sub = await this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
            if (sub !== null && sub !== undefined) {
                resolve(sub);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId && x.UserId === userId)" is 'null' or 'undefined'.`));
            }
        });
    }
    async Insert(mediaId, userId) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId, userId)
                .then(async (exists) => {
                if (exists === false) {
                    const user = await this.UserData.All.find(x => x.Id === userId);
                    if (user === null || user === undefined) {
                        reject(new Error(`"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`));
                    }
                    else {
                        const queue = await this.QueueData.All.find(x => x.MediaId === mediaId);
                        if (queue === null || queue === undefined) {
                            reject(new Error(`"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
                        }
                        else {
                            await query_1.Query.Execute(await this.DataHelper.SubsInsert(mediaId, userId), async (result) => {
                                const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                                if (res.InsertId !== undefined && res.InsertId !== null) {
                                    const sub = new subscription_model_1.Subscription();
                                    sub.Id = res.InsertId;
                                    sub.MediaId = mediaId;
                                    sub.UserId = userId;
                                    await this.SubscriptionList.push(sub);
                                    if (queue !== undefined && queue !== null) {
                                        const media = await this.MediaData.GetMediaList.find(x => x.idMal === sub.MediaId);
                                        const queueJob = new queue_job_model_1.QueueJob(user, media, queue);
                                        await queueJob.StartQueue();
                                    }
                                }
                                resolve();
                            });
                        }
                    }
                }
                else {
                    reject(new Error(`Subscription with MediaId: "${mediaId}" and UserId: "${userId}" already exists!`));
                }
            })
                .catch((reason) => {
                console.log(reason.message);
            });
        });
    }
    async Delete(mediaId, discordId, callback) {
        return new Promise((res, rej) => {
            this.UserData.GetUser(discordId)
                .then(user => {
                query_1.Query.Execute(this.DataHelper.SubsDelete(mediaId, user.Id), result => {
                    const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
                    if (sub !== null && sub !== undefined) {
                        array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                            if (callback !== null) {
                                callback();
                            }
                        });
                        res();
                    }
                    else {
                        rej(new Error(`"this.SubscriptionList.find(
                  x => x.MediaId === mediaId && x.UserId === user.Id
                )" is 'null' or 'undefined'.`));
                    }
                });
            })
                .catch((reason) => {
                rej(reason);
            });
        });
    }
    async Exists(mediaId, userId) {
        return new Promise((resolve, reject) => {
            const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
            if (sub === null || sub === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    async LogAll() {
        return new Promise((resolve, reject) => {
            if (this.All === null || this.All === undefined) {
                reject(new Error(`"this.All" is 'null' or 'undefined'.`));
            }
            else {
                this.All.forEach(sub => {
                    console.log(`Subscription:`, sub);
                });
                resolve();
            }
        });
    }
}
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map