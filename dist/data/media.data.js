"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const query_1 = require("./../core/query");
const media_search_1 = require("./../core/media.search");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const subscription_model_1 = require("../models/subscription.model");
const result_mysql_model_1 = require("../models/result.mysql.model");
class MediaData {
    static Init() {
        query_1.Query.Execute(data_helper_1.DataHelper.MediaSelectAll(), async (result) => {
            const res = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
            await res.forEach(async (media) => {
                await this.LocalList.push(media);
            });
            await console.log(this.LocalList);
            await this.LoadFromApi();
        });
    }
    static LoadFromApi() {
        console.log("Loading from api...");
        this.LocalList.forEach(async (m) => {
            await media_search_1.MediaSearch.All(m.Title, async (res) => {
                await res.forEach(async ($m) => {
                    if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                        await this.MediaList.push($m);
                        await console.log($m.idMal);
                    }
                });
            });
        });
    }
    static Insert(mal_id, title, callback = null) {
        this.Exists(mal_id, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.MediaInsert(mal_id, title), async (result) => {
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
                            callback(res.InsertId);
                        }
                    }
                });
            }
        });
    }
    static LogAll() {
        this.LocalList.forEach(async (m) => {
            await console.log(m.Title);
        });
        this.MediaList.forEach(async (m) => {
            await console.log(m.idMal);
        });
    }
    static get GetLocalList() {
        return this.LocalList;
    }
    static get GetMediaList() {
        return this.MediaList;
    }
    static Exists(malId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.MediaSelect(malId), async (result) => {
            const media = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media)[0];
            if (media === undefined || media === null) {
                await callback(false);
            }
            else {
                await callback(true);
            }
        });
    }
}
MediaData.LocalList = [];
MediaData.MediaList = [];
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map