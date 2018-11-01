"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const subscription_data_1 = require("./subscription.data");
const media_search_1 = require("./../core/media.search");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const subscription_model_1 = require("../models/subscription.model");
const array_helper_1 = require("../helpers/array.helper");
const user_data_1 = require("./user.data");
const queue_data_1 = require("./queue.data");
const random_helper_1 = require("../helpers/random.helper");
const mongo_1 = require("../core/mongo");
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
                this.Initializing = true;
                mongo_1.Mongo.FindAll(data_helper_1.DataHelper.media).then(async (result) => {
                    const $result = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
                    if ($result === undefined || $result === null) {
                        reject(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
                    }
                    else {
                        if ($result.length === 0) {
                            resolve();
                        }
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
                                    .catch((reason) => {
                                    console.log(reason.message);
                                });
                            }
                        });
                    }
                });
            });
        });
    }
    static async Clear() {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
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
        });
    }
    static async LoadFromApi() {
        return new Promise(async (resolve, reject) => {
            const userDatas = user_data_1.UserData.All;
            const locals = this.LocalList;
            // console.log(this.LocalList);
            if (userDatas === undefined || userDatas === null) {
                reject(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
            }
            else if (locals === undefined || locals === null) {
                reject(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
            }
            else {
                let iteration = 0;
                console.log(`Iterating through "locals (${this.LocalList.length} items)"`);
                locals.forEach(lm => {
                    setTimeout(() => {
                        media_search_1.MediaSearch.Find(lm.MalId)
                            .then($m => {
                            iteration++;
                            if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                                queue_data_1.QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                                    .then(insertId => {
                                    this.MediaList.push($m);
                                    console.log(`Pushed: ${lm.Title}`);
                                    this.Check(iteration, $m, resolve);
                                })
                                    .catch(() => {
                                    this.Check(iteration, $m, resolve);
                                    console.log(`No need to add. Already exists.`);
                                });
                            }
                            else {
                                array_helper_1.ArrayHelper.remove(this.LocalList, lm, () => {
                                    const query = { _id: $m.idMal };
                                    mongo_1.Mongo.Delete(data_helper_1.DataHelper.media, query).then(() => {
                                        userDatas.forEach(x => {
                                            subscription_data_1.SubscriptionData.Delete($m.idMal, x.DiscordId).then(() => {
                                                queue_data_1.QueueData.GetJobs().then(jobs => {
                                                    jobs.forEach(qj => {
                                                        queue_data_1.QueueData.RemoveJob(qj);
                                                        console.log(`All subscription of "${$m.title}" has been remove`);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                    this.Check(iteration, $m, resolve);
                                });
                            }
                        })
                            .catch(error => {
                            console.warn(`Error while searching : [MediaSearch.Find(${lm.MalId})]`);
                        });
                    }, 100);
                });
            }
        });
    }
    static Check(iteration, $m, res) {
        queue_data_1.QueueData.SetQueue($m);
        if (iteration === this.LocalList.length) {
            console.log(`Iteration: ${iteration}`);
            this.Initializing = false;
            res();
        }
    }
    static async Insert(media, title, user = null) {
        console.log(`inserting media...`);
        return new Promise(async (resolve, reject) => {
            this.OnReady().then(() => {
                this.Exists(media.idMal).then(exists => {
                    if (exists === false) {
                        console.log(`new media`);
                        const data = { _id: media.idMal, title: title };
                        mongo_1.Mongo.Insert(data_helper_1.DataHelper.media, data).then(result => {
                            console.log(`checking insertId...`);
                            if (result.insertedId !== undefined &&
                                result.insertedId !== null) {
                                console.log(`result was ok!.`);
                                const m = new subscription_model_1.Media();
                                m.MalId = media.idMal;
                                m.Title = title;
                                this.LocalList.push(m);
                                if (media_status_1.MediaStatus.Ongoing(media) ||
                                    media_status_1.MediaStatus.NotYetAired(media)) {
                                    this.MediaList.push(media);
                                    queue_data_1.QueueData.Insert(media.idMal, media.nextAiringEpisode.next)
                                        .then(qId => {
                                        console.log(`resolving media....`);
                                        resolve(media.idMal);
                                    })
                                        .catch((reason) => {
                                        console.log(reason.message);
                                    });
                                }
                            }
                        });
                    }
                    else {
                        resolve(media.idMal);
                    }
                });
            });
        });
    }
    static GetMedia(malId) {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
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
        });
    }
    static GetRandom() {
        return new Promise((resolve, reject) => {
            this.OnReady().then(() => {
                setInterval(() => {
                    const media = this.MediaList[random_helper_1.Random.Range(0, this.MediaList.length - 1)];
                    if (media !== null && media !== undefined) {
                        resolve(media);
                    }
                }, 0);
            });
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            this.OnReady().then(() => {
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
        });
    }
    static async Exists(malId) {
        return new Promise(async (res, rej) => {
            this.OnReady().then(() => {
                const m = this.LocalList.find(x => x.MalId === malId);
                if (m === null || m === undefined) {
                    res(false);
                }
                else {
                    res(true);
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
MediaData.LocalList = [];
MediaData.MediaList = [];
MediaData.Initializing = false;
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map