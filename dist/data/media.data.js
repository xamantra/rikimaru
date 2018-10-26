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
const title_helper_1 = require("../helpers/title.helper");
const queue_data_1 = require("./queue.data");
class MediaData {
    static get GetLocalList() {
        return this.LocalList;
    }
    static get GetMediaList() {
        return this.MediaList;
    }
    static async Init() {
        return new Promise(async (res, rej) => {
            this.Clear();
            query_1.Query.Execute(this.DataHelper.MediaSelectAll(), async (result) => {
                const media = json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
                if (media === undefined || media === null) {
                    rej(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
                }
                else {
                    media.forEach(m => {
                        this.LocalList.push(m);
                    });
                }
            }).then(() => {
                this.LoadFromApi()
                    .then(() => {
                    console.log(`Media List Length: ${this.MediaList.length}`);
                    res();
                })
                    .catch((reason) => {
                    console.log(reason.message);
                });
            });
        });
    }
    static async Clear() {
        return new Promise((resolve, reject) => {
            this.LocalList.length = 0;
            this.MediaList.length = 0;
            this.LocalList.splice(0, this.LocalList.length);
            this.MediaList.splice(0, this.MediaList.length);
            if (this.LocalList.length === 0 && this.MediaList.length === 0) {
                resolve();
            }
            else {
                reject(new Error(`The arrays were not cleared.`));
            }
        });
    }
    static async LoadFromApi() {
        return new Promise(async (res, rej) => {
            const userDatas = user_data_1.UserData.All;
            const locals = this.LocalList;
            if (userDatas === undefined || userDatas === null) {
                rej(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
            }
            else if (userDatas === undefined || userDatas === null) {
                rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
            }
            else {
                locals.forEach(lm => {
                    media_search_1.MediaSearch.Find(lm.MalId)
                        .then($m => {
                        if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                            queue_data_1.QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                                .then(insertId => {
                                queue_data_1.QueueData.SetQueue($m);
                            })
                                .catch(() => {
                                queue_data_1.QueueData.SetQueue($m);
                                console.log(`No need to add. Already exists.`);
                            });
                            console.log(`Pushed: ${lm.Title}`);
                            this.MediaList.push($m);
                        }
                        else {
                            array_helper_1.ArrayHelper.remove(this.LocalList, lm, () => {
                                query_1.Query.Execute(this.DataHelper.MediaDelete($m.id), () => {
                                    userDatas.forEach(x => {
                                        subscription_data_1.SubscriptionData.Delete($m.idMal, x.DiscordId).then(() => {
                                            console.log(`All subscription of "${$m.title}" has been remove`);
                                        });
                                    });
                                });
                            });
                        }
                        if (this.LocalList.length === this.MediaList.length) {
                            res();
                        }
                    })
                        .catch(err => {
                        console.log(err);
                    });
                });
            }
        });
    }
    static async Insert(media, title, user = null) {
        return new Promise((res, rej) => {
            this.Exists(media.idMal).then(async (exists) => {
                if (exists === false) {
                    query_1.Query.Execute(this.DataHelper.MediaInsert(media.idMal, title), async (result) => {
                        const myRes = json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                        if (myRes.InsertId !== undefined && myRes.InsertId !== null) {
                            const m = new subscription_model_1.Media();
                            m.MalId = myRes.InsertId;
                            m.Title = title;
                            this.LocalList.push(m);
                            if (media_status_1.MediaStatus.Ongoing(media) ||
                                media_status_1.MediaStatus.NotYetAired(media)) {
                                this.MediaList.push(media);
                                queue_data_1.QueueData.Insert(media.idMal, media.nextAiringEpisode.next)
                                    .then(qId => {
                                    res(media.idMal);
                                })
                                    .catch((reason) => {
                                    console.log(reason.message);
                                });
                            }
                        }
                    });
                }
                else {
                    res(media.idMal);
                }
            });
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            if (this.MediaList.length > 0) {
                this.MediaList.forEach(m => {
                    const title = title_helper_1.TitleHelper.Get(m.title);
                    console.log(`Media { "${title}" }`);
                });
                res();
            }
            else {
                rej(new Error(`"MediaList" doesn't have any items`));
            }
        });
    }
    static async Exists(malId) {
        return new Promise(async (res, rej) => {
            const m = this.LocalList.find(x => x.MalId === malId);
            if (m === null || m === undefined) {
                res(false);
            }
            else {
                res(true);
            }
        });
    }
}
MediaData.LocalList = [];
MediaData.MediaList = [];
MediaData.DataHelper = data_helper_1.DataHelper.Instance;
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map