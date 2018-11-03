"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const mongo_1 = require("../core/mongo");
const mongodb_1 = require("mongodb");
const array_helper_1 = require("../helpers/array.helper");
class SubscriptionData {
    static get All() {
        return this.SubscriptionList;
    }
    static async Init() {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                this.Initializing = true;
                this.Clear()
                    .then(() => {
                    mongo_1.Mongo.FindAll(data_helper_1.DataHelper.subscription).then(async (result) => {
                        const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
                        // console.log(subs);
                        if (subs === null || subs === undefined) {
                            this.Initializing = false;
                            reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
                        }
                        else {
                            if (subs.length === 0) {
                                this.Initializing = false;
                                resolve();
                            }
                            subs.forEach(sub => {
                                this.SubscriptionList.push(sub);
                            });
                            this.Initializing = false;
                            resolve();
                        }
                    });
                })
                    .catch(err => console.log(err));
            });
        });
    }
    static Clear() {
        return new Promise((resolve, reject) => {
            this.SubscriptionList.length = 0;
            this.SubscriptionList.splice(0, this.SubscriptionList.length);
            if (this.SubscriptionList.length === 0) {
                resolve();
            }
            else {
                reject(new Error(`Array was not cleared.`));
            }
        });
    }
    static async GetUserSubs(userId) {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                const subs = [];
                this.SubscriptionList.forEach(sub => {
                    if (sub.UserId === userId) {
                        subs.push(sub);
                        // console.log(`Pushed: ${sub.Id}`);
                    }
                });
                resolve(subs);
            });
        });
    }
    static async GetSubscribers(malId) {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                const subscribers = [];
                let iteration = 0;
                if (this.SubscriptionList.length === 0) {
                    reject(new Error(`SubscriptionList is empty`));
                }
                this.SubscriptionList.forEach(sub => {
                    iteration++;
                    if (sub.MediaId === malId) {
                        user_data_1.UserData.GetUserById(sub.UserId)
                            .then(user => {
                            console.log(`Subscriber found: "${user.DiscordId}"`);
                            subscribers.push(user);
                            if (iteration === this.SubscriptionList.length) {
                                console.log(`Resolving subscribers...`);
                                resolve(subscribers);
                            }
                        })
                            .catch(err => {
                            console.log(err);
                            if (iteration === this.SubscriptionList.length) {
                                resolve(subscribers);
                            }
                        });
                    }
                });
            });
        });
    }
    static async Insert(mediaId, userId) {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
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
                                const data = {
                                    media_id: mediaId,
                                    user_id: new mongodb_1.ObjectId(userId)
                                };
                                mongo_1.Mongo.Insert(data_helper_1.DataHelper.subscription, data).then(async (result) => {
                                    if (result.insertedId !== undefined &&
                                        result.insertedId !== null) {
                                        const sub = new subscription_model_1.Subscription();
                                        sub.Id = result.insertedId;
                                        sub.MediaId = mediaId;
                                        sub.UserId = userId;
                                        this.SubscriptionList.push(sub);
                                        resolve();
                                    }
                                });
                            }
                        }
                    }
                    else {
                        reject("EXISTS");
                    }
                });
            });
        });
    }
    static async Delete(mediaId, discordId) {
        return new Promise((res, rej) => {
            this.OnReady().then(() => {
                user_data_1.UserData.GetUser(discordId)
                    .then(user => {
                    const query = { media_id: mediaId, user_id: new mongodb_1.ObjectId(user.Id) };
                    mongo_1.Mongo.Delete(data_helper_1.DataHelper.subscription, query).then(() => {
                        const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
                        if (sub !== null && sub !== undefined) {
                            array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                                res();
                            });
                        }
                        else {
                            rej(new Error(`Nothing to remove.`));
                        }
                    });
                })
                    .catch((reason) => {
                    rej(reason);
                });
            });
        });
    }
    static async Exists(mediaId, userId) {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
                if (sub === null || sub === undefined) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static async LogAll() {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                if (this.All === null ||
                    this.All === undefined ||
                    this.All.length === 0) {
                    reject(new Error(`"this.All" is 'null' or 'undefined'.`));
                }
                else {
                    console.log(this.All);
                    resolve();
                }
            });
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
SubscriptionData.Initializing = false;
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map