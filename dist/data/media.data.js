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
            await this.Clear();
            this.Initializing = true;
            const result = await mongo_1.Mongo.FindAll(data_helper_1.DataHelper.media);
            const $result = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
            if ($result === undefined || $result === null) {
                reject(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
            }
            else {
                if ($result.length === 0) {
                    resolve();
                }
                let iteration = 0;
                $result.forEach(async (m) => {
                    iteration++;
                    this.LocalList.push(m);
                    if (iteration === $result.length) {
                        await this.LoadFromApi().catch((reason) => {
                            console.log(reason.message);
                        });
                        console.log(`Media List Length: ${this.MediaList.length}`);
                        resolve();
                    }
                });
            }
        });
    }
    static async Clear() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
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
        return new Promise(async (resolve, reject) => {
            const userDatas = user_data_1.UserData.All;
            const locals = this.LocalList;
            if (userDatas === undefined || userDatas === null) {
                reject(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
            }
            else if (locals === undefined || locals === null) {
                reject(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
            }
            else {
                let iteration = 0;
                locals.forEach(lm => {
                    setTimeout(async () => {
                        const $m = await media_search_1.MediaSearch.Find(lm.MalId);
                        iteration++;
                        if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                            await queue_data_1.QueueData.Insert($m.idMal, $m.nextAiringEpisode.next).catch(() => {
                                this.Check(iteration, $m, resolve);
                            });
                            this.MediaList.push($m);
                            this.Check(iteration, $m, resolve);
                        }
                        else {
                            array_helper_1.ArrayHelper.remove(this.LocalList, lm, async () => {
                                const query = { _id: $m.idMal };
                                await mongo_1.Mongo.Delete(data_helper_1.DataHelper.media, query);
                                userDatas.forEach(async (x) => {
                                    await subscription_data_1.SubscriptionData.Delete($m.idMal, x.DiscordId);
                                    const jobs = await queue_data_1.QueueData.GetJobs();
                                    jobs.forEach(qj => {
                                        queue_data_1.QueueData.RemoveJob(qj);
                                    });
                                });
                                this.Check(iteration, $m, resolve);
                            });
                        }
                    }, 100);
                });
            }
        });
    }
    static Check(iteration, $m, res) {
        queue_data_1.QueueData.SetQueue($m);
        if (iteration === this.LocalList.length) {
            this.Initializing = false;
            res();
        }
    }
    static async Insert(media, title, user = null) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(media.idMal);
            if (exists === false) {
                const data = { _id: media.idMal, title: title };
                const result = await mongo_1.Mongo.Insert(data_helper_1.DataHelper.media, data);
                if (result.insertedId !== undefined && result.insertedId !== null) {
                    const m = new subscription_model_1.Media();
                    m.MalId = media.idMal;
                    m.Title = title;
                    this.LocalList.push(m);
                    if (media_status_1.MediaStatus.Ongoing(media) || media_status_1.MediaStatus.NotYetAired(media)) {
                        this.MediaList.push(media);
                        await queue_data_1.QueueData.Insert(media.idMal, media.nextAiringEpisode.next).catch((reason) => {
                            console.log(reason.message);
                        });
                        resolve(media.idMal);
                    }
                }
            }
            else {
                resolve(media.idMal);
            }
        });
    }
    static GetMedia(malId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
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
    static GetRandom() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            setInterval(() => {
                const media = this.MediaList[random_helper_1.Random.Range(0, this.MediaList.length - 1)];
                if (media !== null && media !== undefined) {
                    resolve(media);
                }
            }, 0);
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            console.log(this.LocalList);
            res();
        });
    }
    static async Exists(malId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const m = this.LocalList.find(x => x.MalId === malId);
            if (m === null || m === undefined) {
                res(false);
            }
            else {
                res(true);
            }
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