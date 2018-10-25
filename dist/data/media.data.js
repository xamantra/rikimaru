"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const subscription_data_1 = require("./subscription.data");
const query_1 = require("./../core/query");
const media_search_1 = require("./../core/media.search");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const subscription_model_1 = require("../models/subscription.model");
const result_mysql_model_1 = require("../models/result.mysql.model");
const array_helper_1 = require("../helpers/array.helper");
const user_data_1 = require("./user.data");
class MediaData {
    static async Init() {
        await query_1.Query.Execute(data_helper_1.DataHelper.MediaSelectAll(), async (result) => {
            const res = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
            await res.forEach(async (media) => {
                await this.LocalList.push(media);
            });
            await this.LoadFromApi();
        });
    }
    static async LoadFromApi() {
        this.MediaList = [];
        const userDatas = user_data_1.UserData.All;
        const locals = this.LocalList;
        await locals.forEach(async (lm) => {
            await media_search_1.MediaSearch.All(lm.Title, async (res) => {
                await res.forEach(async ($m) => {
                    if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                        await this.MediaList.push($m);
                        return;
                    }
                    else {
                        if ($m.idMal === lm.MalId) {
                            await array_helper_1.ArrayHelper.remove(this.LocalList, lm, async () => {
                                await query_1.Query.Execute(data_helper_1.DataHelper.MediaDelete($m.id), () => {
                                    userDatas.forEach(x => {
                                        subscription_data_1.SubscriptionData.Delete($m.idMal, x.DiscordId, () => {
                                            console.log(`All subscription of "${$m.title}" has been remove`);
                                        });
                                    });
                                });
                            });
                        }
                    }
                });
            });
        });
    }
    static async Insert(mal_id, title, callback = null) {
        await this.Exists(mal_id, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(await data_helper_1.DataHelper.MediaInsert(mal_id, title), async (result) => {
                    const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                    if (res.InsertId !== undefined && res.InsertId !== null) {
                        const media = new subscription_model_1.Media();
                        media.MalId = res.InsertId;
                        media.Title = title;
                        await this.LocalList.push(media);
                        await media_search_1.MediaSearch.All(title, async (ms) => {
                            await ms.forEach(async ($m) => {
                                if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                                    await this.MediaList.push($m);
                                }
                            });
                        });
                        if (callback !== null) {
                            await callback(res.InsertId);
                        }
                    }
                });
            }
        });
    }
    static LogAll() {
        this.MediaList.forEach(async (m) => {
            await console.log(`Media:`, m.idMal, m.title);
        });
    }
    static get GetLocalList() {
        return this.LocalList;
    }
    static get GetMediaList() {
        return this.MediaList;
    }
    static async Exists(malId, callback) {
        const m = this.LocalList.find(x => x.MalId === malId);
        if (m === null || m === undefined) {
            await callback(false);
        }
        else {
            await callback(true);
        }
    }
}
MediaData.LocalList = [];
MediaData.MediaList = [];
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map