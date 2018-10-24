"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./../core/query");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
class SubscriptionData {
    static Init() {
        query_1.Query.Execute(data_helper_1.DataHelper.SubsSelectAll(), async (result) => {
            const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
            await subs.forEach(async (sub) => {
                await this.SubscriptionList.push(sub);
            });
        });
    }
    static GetSub(mediaId, userId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.SubsSelect(mediaId, userId), async (result) => {
            const sub = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription)[0];
            if (sub !== undefined || sub !== null) {
                callback(sub, false);
            }
            else {
                callback(null, false);
            }
        });
    }
    static Insert(mediaId, userId, callback) {
        this.Exists(mediaId, userId, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.SubsInsert(mediaId, userId), async (result) => {
                    const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                    if (res.InsertId !== undefined && res.InsertId !== null) {
                        const sub = new subscription_model_1.Subscription();
                        sub.Id = res.InsertId;
                        sub.MediaId = mediaId;
                        sub.UserId = userId;
                        await this.SubscriptionList.push(sub);
                        await callback();
                    }
                });
            }
        });
    }
    static Delete(mediaId, discordId, callback) {
        user_data_1.UserData.GetUser(discordId, async (user, err) => {
            if (err === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.SubsDelete(mediaId, user.Id), async (result) => {
                    await console.log(result);
                    const sub = await this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
                    if (sub !== null || sub !== undefined) {
                        await array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub);
                        await callback();
                    }
                });
            }
            else {
                console.log("Delete Error.");
            }
        });
    }
    static Exists(mediaId, userId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.SubsSelect(mediaId, userId), async (result) => {
            const sub = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription)[0];
            if (sub === undefined || sub === null) {
                await callback(false);
            }
            else {
                await callback(true);
            }
        });
    }
    static get All() {
        return this.SubscriptionList;
    }
    static LogAll() {
        this.All.forEach(async (sub) => {
            await console.log(sub);
        });
    }
}
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=subscription.data.js.map