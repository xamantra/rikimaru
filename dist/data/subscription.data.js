"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_helper_1 = require("./../helpers/array.helper");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const Enumerable = require("node-enumerable");
class SubscriptionData {
    static Init() {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.each(`SELECT * FROM subscription`, (err, row) => {
                if (row !== null) {
                    try {
                        const sub = converter.deserialize(row, subscription_model_1.Subscription);
                        this.SubscriptionList.push(sub);
                        console.log(sub);
                    }
                    catch (error) {
                        console.log(err);
                    }
                }
            });
        });
    }
    static Add(mediaId, userId) {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO subscription (media_id, user_id) VALUES(${mediaId},${userId})`, (result, err) => {
                if (err !== undefined) {
                    console.log(err.message);
                }
                else {
                    db.each(`SELECT * FROM subscription WHERE media_id=${mediaId} AND user_id=${userId}`, (e, row) => {
                        this.SubscriptionList.push(converter.deserialize(row, subscription_model_1.Subscription));
                    });
                }
            });
        });
    }
    static Delete(mediaId, discordId, callback) {
        const db = data_helper_1.DataHelper.DB;
        const userId = user_data_1.UserData.All.find(x => x.DiscordId === discordId).Id;
        db.serialize(() => {
            db.run(`DELETE FROM subscription WHERE media_id=${mediaId} AND user_id=${userId}`, (result, err) => {
                if (err !== undefined) {
                    console.log(err.message);
                }
                else {
                    const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === userId);
                    array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub);
                    callback();
                }
            });
        });
    }
    static Exists(mediaId, userId) {
        let e = false;
        this.SubscriptionList.forEach(sub => {
            if (sub.MediaId === mediaId && sub.UserId === userId) {
                e = true;
            }
        });
        return e;
    }
    static get All() {
        return this.SubscriptionList;
    }
    static LogAll() {
        this.All.forEach(sub => {
            console.log(sub);
        });
    }
}
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map