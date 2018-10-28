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
const queue_data_1 = require("./queue.data");
class MediaData {
    static get GetLocalList() {
        return this.LocalList;
    }
    static get GetMediaList() {
        return this.MediaList;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            this.Clear().then(() => {
                query_1.Query.Execute(this.DataHelper.MediaSelectAll()).then(async (result) => {
                    const $result = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
                    console.log($result);
                    if ($result === undefined || $result === null) {
                        reject(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
                    }
                    else {
                        let iteration = 0;
                        $result.forEach(m => {
                            iteration++;
                            this.LocalList.push(m);
                            if (iteration === $result.length) {
                                this.LoadFromApi()
                                    .then(() => {
                                    console.log(`Media List Length: ${this.MediaList.length}`);
                                    resolve();
                                })
                                    .catch((reason) => { console.log(reason.message); });
                            }
                        });
                    }
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
            console.log(this.LocalList);
            if (userDatas === undefined || userDatas === null) {
                rej(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
            }
            else if (locals === undefined || locals === null) {
                rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
            }
            else {
                let iteration = 0;
                console.log(`Iterating through "locals (${this.LocalList.length} items)"`);
                locals.forEach(lm => {
                    iteration++;
                    console.log(`Iteration: ${iteration}`);
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
                            if (iteration === locals.length) {
                                res();
                            }
                        }
                        else {
                            array_helper_1.ArrayHelper.remove(this.LocalList, lm, () => {
                                query_1.Query.Execute(this.DataHelper.MediaDelete($m.id), () => {
                                    userDatas.forEach(x => {
                                        subscription_data_1.SubscriptionData.Delete($m.idMal, x.DiscordId).then(() => {
                                            const qj = queue_data_1.QueueData.GetJobs.find(j => j.user.Id === x.Id && j.media.idMal === $m.idMal);
                                            queue_data_1.QueueData.RemoveJob(qj);
                                            console.log(`All subscription of "${$m.title}" has been remove`);
                                        });
                                    });
                                });
                                if (iteration === locals.length) {
                                    res();
                                }
                            });
                        }
                    })
                        .catch(error => {
                        console.warn(`Error while searching : [MediaSearch.Find(${lm.MalId})]`);
                    });
                });
            }
        });
    }
    static async Insert(media, title, user = null) {
        return new Promise(async (resolve, reject) => {
            const exist = await this.Exists(media.idMal);
            if (exist === false) {
                const result = await query_1.Query.Execute(this.DataHelper.MediaInsert(media.idMal, title));
                const myRes = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
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
                            resolve(media.idMal);
                        })
                            .catch((reason) => { console.log(reason.message); });
                    }
                }
            }
            else {
                resolve(media.idMal);
            }
        });
    }
    static GetMedia(malId) {
        return new Promise((resolve, reject) => {
            let iteration = 0;
            this.MediaList.forEach($m => {
                iteration++;
                if ($m.idMal === malId) {
                    resolve($m);
                }
                if (iteration === this.MediaList.length) {
                    reject(new Error(`NO media with id "${malId}" was found.`));
                }
            });
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            let iteration = 1;
            this.LocalList.forEach(m => {
                console.log(m);
                if (iteration === this.LocalList.length) {
                    res();
                }
                else {
                    iteration++;
                }
            });
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