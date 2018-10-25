"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./../core/query");
const media_data_1 = require("./media.data");
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
const media_result_1 = require("../core/media.result");
const process_1 = require("process");
class SubscriptionData {
    static get All() {
        return this.SubscriptionList;
    }
    static async Init() {
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.SubsSelectAll(), async (result) => {
                const subs = json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
                if (subs === null || subs === undefined) {
                    reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
                }
                else {
                    subs.forEach(async (sub) => {
                        this.SubscriptionList.push(sub);
                        const queue = queue_data_1.QueueData.All.find(q => q.MediaId === sub.MediaId);
                        const media = media_data_1.MediaData.GetMediaList.find(x => x.idMal === queue.MediaId);
                    });
                    resolve();
                }
            });
        });
    }
    static async GetSub(mediaId, userId) {
        return new Promise(async (resolve, reject) => {
            const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
            if (sub !== null && sub !== undefined) {
                resolve(sub);
            }
            else {
                reject(new Error(`"this.All.find(x => x.MediaId === mediaId && x.UserId === userId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async Insert(mediaId, userId, message, dm) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId, userId)
                .then(async (exists) => {
                if (exists === false) {
                    const user = user_data_1.UserData.All.find(x => x.Id === userId);
                    if (user === null || user === undefined) {
                        reject(new Error(`"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`));
                    }
                    else {
                        const queue = queue_data_1.QueueData.All.find(x => x.MediaId === mediaId);
                        if (queue === null || queue === undefined) {
                            reject(new Error(`"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`));
                        }
                        else {
                            query_1.Query.Execute(this.DataHelper.SubsInsert(mediaId, userId), async (result) => {
                                const res = json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                                if (res.InsertId !== undefined && res.InsertId !== null) {
                                    const sub = new subscription_model_1.Subscription();
                                    sub.Id = res.InsertId;
                                    sub.MediaId = mediaId;
                                    sub.UserId = userId;
                                    this.SubscriptionList.push(sub);
                                }
                                resolve();
                            });
                        }
                    }
                }
                else {
                    media_result_1.MediaResult.SendInfo(message, `Cool! You are already subscribed to ***${process_1.title}***.\nEnter the command \`-unsub ${process_1.title}\`  to unsubscribe to this anime.`, dm);
                    reject(new Error(`Subscription with MediaId: "${mediaId}" and UserId: "${userId}" already exists!`));
                }
            })
                .catch((reason) => {
                console.log(reason.message);
            });
        });
    }
    static async Delete(mediaId, discordId) {
        return new Promise((res, rej) => {
            user_data_1.UserData.GetUser(discordId)
                .then(user => {
                query_1.Query.Execute(this.DataHelper.SubsDelete(mediaId, user.Id), result => {
                    const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
                    if (sub !== null && sub !== undefined) {
                        const queueJob = queue_data_1.QueueData.GetJobs.find(x => x.user.DiscordId === discordId && x.media.idMal === mediaId);
                        array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                            queueJob.Cancel();
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
    static async Exists(mediaId, userId) {
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
    static async LogAll() {
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
SubscriptionData.DataHelper = data_helper_1.DataHelper.Instance;
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map