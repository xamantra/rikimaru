"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./../core/query");
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
class SubscriptionData {
    static get All() {
        return this.SubscriptionList;
    }
    static async Init() {
        return new Promise((resolve, reject) => {
            query_1.Query.Execute(this.DataHelper.SubsSelectAll(), async (result) => {
                const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
                console.log(subs);
                if (subs === null || subs === undefined) {
                    reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
                }
                else {
                    subs.forEach(sub => {
                        this.SubscriptionList.push(sub);
                    });
                    resolve();
                }
            });
        });
    }
    static async GetUserSubs(userId) {
        return new Promise((resolve, reject) => {
            const subs = [];
            this.SubscriptionList.forEach(sub => {
                if (sub.UserId === userId) {
                    subs.push(sub);
                    // console.log(`Pushed: ${sub.Id}`);
                }
            });
            resolve(subs);
        });
    }
    static async GetSubscribers(malId) {
        return new Promise((resolve, reject) => {
            const subscribers = [];
            this.SubscriptionList.forEach(sub => {
                if (sub.MediaId === malId) {
                    user_data_1.UserData.GetUserById(sub.UserId).then(user => {
                        subscribers.push(user);
                    });
                }
            });
            resolve(subscribers);
        });
    }
    static async Insert(mediaId, userId) {
        return new Promise((resolve, reject) => {
            this.Exists(mediaId, userId).then(async (exists) => {
                if (exists === false) {
                    const user = user_data_1.UserData.All.find(x => x.Id === userId);
                    if (user === null || user === undefined) {
                        reject(`"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`);
                    }
                    else {
                        const queue = queue_data_1.QueueData.All.find(x => x.MediaId === mediaId);
                        if (queue === null || queue === undefined) {
                            reject(`"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`);
                        }
                        else {
                            query_1.Query.Execute(this.DataHelper.SubsInsert(mediaId, userId), async (result) => {
                                const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
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
                    reject("EXISTS");
                }
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
                        array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                            console.log(`User <${user.DiscordId}> unsubscribed to Media: "${mediaId}".`);
                        });
                        res();
                    }
                    else {
                        rej(new Error(`"this.SubscriptionList.find(   x => x.MediaId === mediaId && x.UserId === user.Id )" is 'null' or 'undefined'.`));
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
            if (this.All === null ||
                this.All === undefined ||
                this.All.length === 0) {
                reject(new Error(`"this.All" is 'null' or 'undefined'.`));
            }
            else {
                this.All.forEach(sub => {
                    console.log(sub);
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