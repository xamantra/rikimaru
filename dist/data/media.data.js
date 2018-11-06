"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const subscription_data_1 = require("./subscription.data");
const json_helper_1 = require("../helpers/json.helper");
const tables_1 = require("../core/tables");
const subscription_model_1 = require("../models/subscription.model");
const array_helper_1 = require("../helpers/array.helper");
const user_data_1 = require("./user.data");
const queue_data_1 = require("./queue.data");
const random_helper_1 = require("../helpers/random.helper");
const mongo_1 = require("../core/mongo");
const anime_cache_1 = require("../core/anime.cache");
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
            const result = await mongo_1.Mongo.FindAll(tables_1.Tables.media);
            const list = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Media);
            if (list === undefined || list === null) {
                reject(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
            }
            else {
                if (list.length === 0) {
                    resolve();
                }
                else {
                    this.LocalList = list;
                    await this.LoadFromApi().catch((reason) => {
                        console.log(reason.message);
                    });
                    resolve();
                }
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
                        const $m = await anime_cache_1.AnimeCache.Get(lm.MalId);
                        iteration++;
                        if ($m !== null &&
                            (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m))) {
                            await queue_data_1.QueueData.Insert($m.idMal, $m.nextAiringEpisode.next).catch(() => {
                                this.Check(iteration, $m, resolve);
                            });
                            this.MediaList.push($m);
                            this.Check(iteration, $m, resolve);
                        }
                        else {
                            array_helper_1.ArrayHelper.remove(this.LocalList, lm, async () => {
                                const query = { _id: $m.idMal };
                                await mongo_1.Mongo.Delete(tables_1.Tables.media, query);
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
                const result = await mongo_1.Mongo.Insert(tables_1.Tables.media, data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL21lZGlhLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBcUQ7QUFDckQsMkRBQXVEO0FBQ3ZELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQTJEO0FBRTNELDBEQUFzRDtBQUN0RCwyQ0FBdUM7QUFDdkMsNkNBQXlDO0FBQ3pDLDREQUFrRDtBQUNsRCx5Q0FBc0M7QUFDdEMscURBQWlEO0FBRWpELE1BQWEsU0FBUztJQUNiLE1BQU0sS0FBSyxZQUFZO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxLQUFLLFlBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFNTSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FBUSxNQUFNLEVBQUUsMEJBQUssQ0FBQyxDQUFDO1lBQ2pFLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUN2QyxNQUFNLENBQ0osSUFBSSxLQUFLLENBQ1AsMkVBQTJFLENBQzVFLENBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2lCQUNYO3FCQUFN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TCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEvTGMsbUJBQVMsR0FBWSxFQUFFLENBQUM7QUFDeEIsbUJBQVMsR0FBYSxFQUFFLENBQUM7QUFDMUIsc0JBQVksR0FBRyxLQUFLLENBQUM7QUFYckMsOEJBeU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi8uLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuLi9jb3JlL3RhYmxlc1wiO1xuaW1wb3J0IHsgTWVkaWEsIFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYURhdGEge1xuICBwdWJsaWMgc3RhdGljIGdldCBHZXRMb2NhbExpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuTG9jYWxMaXN0O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgR2V0TWVkaWFMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLk1lZGlhTGlzdDtcbiAgfVxuICBzdGF0aWMgX2luc3RhbmNlOiBNZWRpYURhdGE7XG4gIHByaXZhdGUgc3RhdGljIExvY2FsTGlzdDogTWVkaWFbXSA9IFtdO1xuICBwcml2YXRlIHN0YXRpYyBNZWRpYUxpc3Q6IElNZWRpYVtdID0gW107XG4gIHB1YmxpYyBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLkNsZWFyKCk7XG4gICAgICB0aGlzLkluaXRpYWxpemluZyA9IHRydWU7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlcy5tZWRpYSk7XG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8TWVkaWE+KHJlc3VsdCwgTWVkaWEpO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCB8fCBsaXN0ID09PSBudWxsKSB7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgXCJKc29uSGVscGVyLkFycmF5Q29udmVydDxNZWRpYT4ocmVzdWx0LCBNZWRpYSlcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLkxvY2FsTGlzdCA9IGxpc3Q7XG4gICAgICAgICAgYXdhaXQgdGhpcy5Mb2FkRnJvbUFwaSgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIENsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHRoaXMuTG9jYWxMaXN0Lmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLk1lZGlhTGlzdC5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5Mb2NhbExpc3Quc3BsaWNlKDAsIHRoaXMuTG9jYWxMaXN0Lmxlbmd0aCk7XG4gICAgICB0aGlzLk1lZGlhTGlzdC5zcGxpY2UoMCwgdGhpcy5NZWRpYUxpc3QubGVuZ3RoKTtcbiAgICAgIGlmICh0aGlzLkxvY2FsTGlzdC5sZW5ndGggPT09IDAgJiYgdGhpcy5NZWRpYUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRoZSBhcnJheXMgd2VyZSBub3QgY2xlYXJlZC5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIExvYWRGcm9tQXBpKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1c2VyRGF0YXMgPSBVc2VyRGF0YS5BbGw7XG4gICAgICBjb25zdCBsb2NhbHMgPSB0aGlzLkxvY2FsTGlzdDtcbiAgICAgIGlmICh1c2VyRGF0YXMgPT09IHVuZGVmaW5lZCB8fCB1c2VyRGF0YXMgPT09IG51bGwpIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihgXCJ1c2VyRGF0YXMgPSB0aGlzLlVzZXJEYXRhLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJ2ApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGxvY2FscyA9PT0gdW5kZWZpbmVkIHx8IGxvY2FscyA9PT0gbnVsbCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBcImxvY2FscyA9IHRoaXMuTG9jYWxMaXN0XCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gICAgICAgIGxvY2Fscy5mb3JFYWNoKGxtID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRtID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQobG0uTWFsSWQpO1xuICAgICAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICRtICE9PSBudWxsICYmXG4gICAgICAgICAgICAgIChNZWRpYVN0YXR1cy5PbmdvaW5nKCRtKSB8fCBNZWRpYVN0YXR1cy5Ob3RZZXRBaXJlZCgkbSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYXdhaXQgUXVldWVEYXRhLkluc2VydCgkbS5pZE1hbCwgJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dCkuY2F0Y2goXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sICRtLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRoaXMuTWVkaWFMaXN0LnB1c2goJG0pO1xuICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgJG0sIHJlc29sdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTG9jYWxMaXN0LCBsbSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0geyBfaWQ6ICRtLmlkTWFsIH07XG4gICAgICAgICAgICAgICAgYXdhaXQgTW9uZ28uRGVsZXRlKFRhYmxlcy5tZWRpYSwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHVzZXJEYXRhcy5mb3JFYWNoKGFzeW5jIHggPT4ge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5EZWxldGUoJG0uaWRNYWwsIHguRGlzY29yZElkKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGpvYnMgPSBhd2FpdCBRdWV1ZURhdGEuR2V0Sm9icygpO1xuICAgICAgICAgICAgICAgICAgam9icy5mb3JFYWNoKHFqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgUXVldWVEYXRhLlJlbW92ZUpvYihxaik7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgJG0sIHJlc29sdmUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIENoZWNrKFxuICAgIGl0ZXJhdGlvbjogbnVtYmVyLFxuICAgICRtOiBJTWVkaWEsXG4gICAgcmVzOiAodmFsdWU/OiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pID0+IHZvaWRcbiAgKSB7XG4gICAgUXVldWVEYXRhLlNldFF1ZXVlKCRtKTtcbiAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLkxvY2FsTGlzdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICByZXMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChtZWRpYTogSU1lZGlhLCB0aXRsZTogc3RyaW5nLCB1c2VyOiBVc2VyID0gbnVsbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMobWVkaWEuaWRNYWwpO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgX2lkOiBtZWRpYS5pZE1hbCwgdGl0bGU6IHRpdGxlIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMubWVkaWEsIGRhdGEpO1xuICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG0gPSBuZXcgTWVkaWEoKTtcbiAgICAgICAgICBtLk1hbElkID0gbWVkaWEuaWRNYWw7XG4gICAgICAgICAgbS5UaXRsZSA9IHRpdGxlO1xuICAgICAgICAgIHRoaXMuTG9jYWxMaXN0LnB1c2gobSk7XG4gICAgICAgICAgaWYgKE1lZGlhU3RhdHVzLk9uZ29pbmcobWVkaWEpIHx8IE1lZGlhU3RhdHVzLk5vdFlldEFpcmVkKG1lZGlhKSkge1xuICAgICAgICAgICAgdGhpcy5NZWRpYUxpc3QucHVzaChtZWRpYSk7XG4gICAgICAgICAgICBhd2FpdCBRdWV1ZURhdGEuSW5zZXJ0KFxuICAgICAgICAgICAgICBtZWRpYS5pZE1hbCxcbiAgICAgICAgICAgICAgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dFxuICAgICAgICAgICAgKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc29sdmUobWVkaWEuaWRNYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShtZWRpYS5pZE1hbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEdldE1lZGlhKG1hbElkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xuICAgICAgdGhpcy5NZWRpYUxpc3QuZm9yRWFjaCgkbSA9PiB7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgICAgICBpZiAoJG0uaWRNYWwgPT09IG1hbElkKSB7XG4gICAgICAgICAgcmVzb2x2ZSgkbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5NZWRpYUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgTk8gbWVkaWEgd2l0aCBpZCBcIiR7bWFsSWR9XCIgd2FzIGZvdW5kLmApKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLk1lZGlhTGlzdFtcbiAgICAgICAgICBSYW5kb20uUmFuZ2UoMCwgdGhpcy5NZWRpYUxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKG1lZGlhICE9PSBudWxsICYmIG1lZGlhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXNvbHZlKG1lZGlhKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIExvZ0FsbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuTG9jYWxMaXN0KTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBFeGlzdHMobWFsSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzLCByZWopID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgbSA9IHRoaXMuTG9jYWxMaXN0LmZpbmQoeCA9PiB4Lk1hbElkID09PSBtYWxJZCk7XG4gICAgICBpZiAobSA9PT0gbnVsbCB8fCBtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgfVxufVxuIl19