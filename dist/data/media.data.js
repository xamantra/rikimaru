"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const queue_data_1 = require("./queue.data");
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
    constructor() {
        this.LocalList = [];
        this.DataHelper = data_helper_1.DataHelper.Instance;
        this.UserData = user_data_1.UserData.Instance;
        this.QueueData = queue_data_1.QueueData.Instance;
        this.SubscriptionData = subscription_data_1.SubscriptionData.Instance;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get GetLocalList() {
        return this.LocalList;
    }
    get GetMediaList() {
        return this.MediaList;
    }
    async Init() {
        return new Promise(async (res, rej) => {
            this.MediaList = [];
            await query_1.Query.Execute(this.DataHelper.MediaSelectAll(), async (result) => {
                const media = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
                if (media === undefined || media === null) {
                    rej(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
                }
                else {
                    await media.forEach(m => {
                        this.LocalList.push(m);
                        console.log(`Pushed: ${m.Title}`);
                    });
                }
            }).then(async () => {
                await this.LoadFromApi().then(() => {
                    console.log(this.MediaList.length);
                });
                res();
            });
        });
    }
    async LoadFromApi() {
        return new Promise(async (res, rej) => {
            const userDatas = this.UserData.All;
            const locals = this.LocalList;
            if (userDatas === undefined || userDatas === null) {
                rej(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
            }
            else if (userDatas === undefined || userDatas === null) {
                rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
            }
            else {
                await locals.forEach(async (lm) => {
                    await media_search_1.MediaSearch.All(lm.Title, async (media) => {
                        await media.forEach(async ($m) => {
                            if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                                await this.QueueData.Insert($m.idMal, $m.nextAiringEpisode.next).then(async () => {
                                    await this.MediaList.push($m);
                                });
                            }
                            else {
                                if ($m.idMal === lm.MalId) {
                                    await array_helper_1.ArrayHelper.remove(this.LocalList, lm, async () => {
                                        await query_1.Query.Execute(await this.DataHelper.MediaDelete($m.id), async () => {
                                            await userDatas.forEach(async (x) => {
                                                await this.SubscriptionData.Delete($m.idMal, x.DiscordId, () => {
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
                res();
            }
        });
    }
    async Insert(mal_id, title) {
        return new Promise((res, rej) => {
            this.Exists(mal_id)
                .then(async (exists) => {
                if (exists === false) {
                    await query_1.Query.Execute(await this.DataHelper.MediaInsert(mal_id, title), async (result) => {
                        const myRes = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                        if (myRes.InsertId !== undefined && myRes.InsertId !== null) {
                            const media = new subscription_model_1.Media();
                            media.MalId = myRes.InsertId;
                            media.Title = title;
                            await this.LocalList.push(media);
                            await media_search_1.MediaSearch.All(title, (ms) => {
                                ms.forEach(async ($m) => {
                                    if (media_status_1.MediaStatus.Ongoing($m) ||
                                        media_status_1.MediaStatus.NotYetAired($m)) {
                                        await this.MediaList.push($m);
                                    }
                                });
                            });
                            res(myRes.InsertId);
                        }
                    });
                }
                else {
                    rej(new Error(`Media with Id: "${mal_id}" already exists!`));
                }
            })
                .catch(() => {
                rej(new Error(`Media with Id: "${mal_id}" already exists!`));
            });
        });
    }
    async LogAll() {
        return new Promise(async (res, rej) => {
            if (this.MediaList.length > 0) {
                await this.MediaList.forEach(m => {
                    console.log(`${MediaList.length} Media:`, m.idMal, m.title);
                });
                res();
            }
            else {
                rej(new Error(`"MediaList" doesn't have any items`));
            }
        });
    }
    async Exists(malId) {
        return new Promise(async (res, rej) => {
            const m = await this.LocalList.find(x => x.MalId === malId);
            if (m === null || m === undefined) {
                res(false);
            }
            else {
                res(true);
            }
        });
    }
}
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map