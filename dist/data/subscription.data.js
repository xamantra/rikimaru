"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./../core/query");
const queue_job_model_1 = require("./../models/queue.job.model");
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
class SubscriptionData {
    static async Init() {
        await query_1.Query.Execute(data_helper_1.DataHelper.SubsSelectAll(), async (result) => {
            const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
            await subs.forEach(async (sub) => {
                await this.SubscriptionList.push(sub);
                const queue = await queue_data_1.QueueData.All.find(q => q.MediaId === sub.MediaId);
                await user_data_1.UserData.All.forEach(async (u) => {
                    const queueJob = new queue_job_model_1.QueueJob(u, queue);
                    await queueJob.StartQueue();
                });
            });
        });
    }
    static GetSub(mediaId, userId, callback) {
        const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
        if (sub !== null && sub !== undefined) {
            callback(sub, false);
        }
        else {
            callback(null, true);
        }
    }
    static async Insert(mediaId, userId, callback) {
        await this.Exists(mediaId, userId, async (exists) => {
            if (exists === false) {
                const user = user_data_1.UserData.All.find(x => x.Id === userId);
                const queue = queue_data_1.QueueData.All.find(x => x.MediaId === mediaId);
                await query_1.Query.Execute(await data_helper_1.DataHelper.SubsInsert(mediaId, userId), async (result) => {
                    const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                    if (res.InsertId !== undefined && res.InsertId !== null) {
                        const sub = new subscription_model_1.Subscription();
                        sub.Id = res.InsertId;
                        sub.MediaId = mediaId;
                        sub.UserId = userId;
                        await this.SubscriptionList.push(sub);
                        if (callback !== null) {
                            const queueJob = new queue_job_model_1.QueueJob(user, queue);
                            await queueJob.StartQueue();
                            await callback();
                        }
                    }
                });
            }
        });
    }
    static async Delete(mediaId, discordId, callback) {
        await user_data_1.UserData.GetUser(discordId, async (user, err) => {
            if (err === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.SubsDelete(mediaId, user.Id), async (result) => {
                    await console.log(result);
                    const sub = await this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
                    if (sub !== null || sub !== undefined) {
                        await array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, async () => {
                            if (callback !== null) {
                                await callback();
                            }
                        });
                    }
                });
            }
            else {
                console.log("Delete Error.");
            }
        });
    }
    static Exists(mediaId, userId, callback) {
        const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
        if (sub === null || sub === undefined) {
            callback(false);
        }
        else {
            callback(true);
        }
    }
    static get All() {
        return this.SubscriptionList;
    }
    static LogAll() {
        this.All.forEach(async (sub) => {
            await console.log(`Subscription:`, sub);
        });
    }
}
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map