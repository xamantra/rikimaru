"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
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
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO subscription (media_id, user_id) VALUES("${mediaId}","${userId}")`, (result, err) => {
                if (err.message !== null) {
                    console.log(err.message);
                }
            });
        });
    }
    static get All() {
        return this.SubscriptionList;
    }
}
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map