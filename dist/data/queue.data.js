"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("./../models/subscription.model");
const result_mysql_model_1 = require("./../models/result.mysql.model");
const json_helper_1 = require("./../helpers/json.helper");
const query_1 = require("./../core/query");
const data_helper_1 = require("../helpers/data.helper");
class QueueData {
    static Init() {
        query_1.Query.Execute(data_helper_1.DataHelper.QueueSelectAll(), async (result) => {
            const queue = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue);
            await queue.forEach(async (q) => {
                await this.Queues.push(q);
            });
            await console.log(this.Queues);
        });
    }
    static GetQueue(mediaId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.QueueSelect(mediaId), async (result) => {
            const queue = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue)[0];
            if (queue !== undefined || queue !== null) {
                await callback(queue, false);
            }
            else {
                await callback(null, true);
            }
        });
    }
    static Insert(mediaId, next_episode, callback) {
        this.Exists(mediaId, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.QueueInsert(mediaId, next_episode), async (result) => {
                    const res = await json_helper_1.JsonHelper.ArrayConvert(result, result_mysql_model_1.MySqlResult)[0];
                    if (res.InsertId !== undefined || res.InsertId !== null) {
                        const q = new subscription_model_1.Queue();
                        q.Id = res.InsertId;
                        q.MediaId = mediaId;
                        q.NextEpisode = next_episode;
                        await this.Queues.push(q);
                        callback(q.Id);
                    }
                });
            }
        });
    }
    static Update(mediaId, nextEpisode, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.QueueUpdate(mediaId, nextEpisode), async (result) => {
            const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
            await console.log(res);
            await callback();
        });
    }
    static Exists(mediaId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.QueueSelect(mediaId), async (result) => {
            const q = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Queue)[0];
            if (q === undefined || q === null) {
                await callback(false);
            }
            else {
                await callback(true);
            }
        });
    }
    static get All() {
        return this.Queues;
    }
    static LogAll() {
        this.Queues.forEach(async (q) => {
            await console.log(q);
        });
    }
}
QueueData.Queues = [];
exports.QueueData = QueueData;
//# sourceMappingURL=queue.data.js.map