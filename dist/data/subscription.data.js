"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const table_1 = require("../core/table");
const subscription_model_2 = require("../models/subscription.model");
const mongo_1 = require("../core/mongo");
const mongodb_1 = require("mongodb");
const array_helper_1 = require("../helpers/array.helper");
const anime_cache_1 = require("../core/anime.cache");
class SubscriptionData {
    static get All() {
        return this.SubscriptionList;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            await this.Clear();
            this.Clear().catch(err => console.log(err));
            const result = await mongo_1.Mongo.FindAll(table_1.Table.subscription);
            const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
            if (subs === null || subs === undefined) {
                this.Initializing = false;
                reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
            }
            else {
                if (subs.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                for (let i = 0; i < subs.length; i++) {
                    const sub = subs[i];
                    this.SubscriptionList.push(sub);
                    const media = await anime_cache_1.AnimeCache.Get(sub.MediaId);
                    if (media !== null) {
                        const user = await user_data_1.UserData.GetUserById(sub.UserId);
                    }
                    if (i === subs.length - 1) {
                        this.Initializing = false;
                        resolve();
                    }
                }
            }
        });
    }
    static Clear() {
        return new Promise((resolve, reject) => {
            this.SubscriptionList.length = 0;
            this.SubscriptionList.splice(0, this.SubscriptionList.length);
            if (this.SubscriptionList.length === 0) {
                resolve();
            }
            else {
                reject(new Error(`Array was not cleared.`));
            }
        });
    }
    static async GetUserSubs(userId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const subs = [];
            this.SubscriptionList.forEach(sub => {
                if (sub.UserId === userId) {
                    subs.push(sub);
                }
            });
            resolve(subs);
        });
    }
    static async GetSubscribers(malId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const subscribers = [];
            let iteration = 0;
            if (this.SubscriptionList.length === 0) {
                reject(new Error(`SubscriptionList is empty`));
            }
            this.SubscriptionList.forEach(async (sub) => {
                iteration++;
                if (sub.MediaId === malId) {
                    const user = await user_data_1.UserData.GetUserById(sub.UserId).catch(err => {
                        console.log(err);
                        if (iteration === this.SubscriptionList.length) {
                            resolve(subscribers);
                        }
                    });
                    if (user instanceof subscription_model_2.User)
                        subscribers.push(user);
                    if (iteration === this.SubscriptionList.length) {
                        resolve(subscribers);
                    }
                }
            });
        });
    }
    static async Insert(mediaId, userId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(mediaId, userId);
            if (exists === false) {
                const user = user_data_1.UserData.All.find(x => x.Id === userId);
                if (user === null || user === undefined) {
                    reject(`"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`);
                }
                else {
                    const queue = queue_data_1.QueueData.All.find(x => x.MediaId === mediaId);
                    if (queue === null || queue === undefined) {
                        reject(`"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`);
                    }
                    else {
                        const data = {
                            media_id: mediaId,
                            user_id: new mongodb_1.ObjectId(userId)
                        };
                        const result = await mongo_1.Mongo.Insert(table_1.Table.subscription, data);
                        if (result.insertedId !== undefined && result.insertedId !== null) {
                            const sub = new subscription_model_1.Subscription();
                            sub.Id = result.insertedId;
                            sub.MediaId = mediaId;
                            sub.UserId = userId;
                            this.SubscriptionList.push(sub);
                            resolve();
                        }
                    }
                }
            }
            else {
                reject("EXISTS");
            }
        });
    }
    static async Delete(mediaId, discordId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const user = await user_data_1.UserData.GetUser(discordId).catch((reason) => {
                rej(reason);
            });
            let query = null;
            if (user instanceof subscription_model_2.User)
                query = { media_id: mediaId, user_id: new mongodb_1.ObjectId(user.Id) };
            await mongo_1.Mongo.Delete(table_1.Table.subscription, query);
            const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
            if (sub !== null && sub !== undefined) {
                array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                    res();
                });
            }
            else {
                rej(new Error(`Nothing to remove.`));
            }
        });
    }
    static async Exists(mediaId, userId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
            if (sub === null || sub === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static async LogAll() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            if (this.All === null ||
                this.All === undefined ||
                this.All.length === 0) {
                reject(new Error(`"this.All" is 'null' or 'undefined'.`));
            }
            else {
                console.log(this.All);
                resolve();
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
SubscriptionData.Initializing = false;
SubscriptionData.SubscriptionList = [];
exports.SubscriptionData = SubscriptionData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCx5Q0FBc0M7QUFDdEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUVqRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxhQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUks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LE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFuTU0sNkJBQVksR0FBRyxLQUFLLENBQUM7QUFJYixpQ0FBZ0IsR0FBbUIsRUFBRSxDQUFDO0FBTHZELDRDQXFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcIi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiLi4vY29yZS90YWJsZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xyXG5pbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XHJcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XHJcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuL21lZGlhLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcclxuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uRGF0YSB7XHJcbiAgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLlN1YnNjcmlwdGlvbkxpc3Q7XHJcbiAgfVxyXG4gIHByaXZhdGUgc3RhdGljIFN1YnNjcmlwdGlvbkxpc3Q6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICB0aGlzLkluaXRpYWxpemluZyA9IHRydWU7XHJcbiAgICAgIGF3YWl0IHRoaXMuQ2xlYXIoKTtcclxuICAgICAgdGhpcy5DbGVhcigpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZS5zdWJzY3JpcHRpb24pO1xyXG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihcclxuICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzdWJzID09PSBudWxsIHx8IHN1YnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihyZXN1bHQsU3Vic2NyaXB0aW9uKTtgXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1tpXTtcclxuICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XHJcbiAgICAgICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcclxuICAgICAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlckJ5SWQoc3ViLlVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBDbGVhcigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3Quc3BsaWNlKDAsIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGgpO1xyXG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yKGBBcnJheSB3YXMgbm90IGNsZWFyZWQuYCkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlclN1YnModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTdWJzY3JpcHRpb25bXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3Qgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZvckVhY2goc3ViID0+IHtcclxuICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gdXNlcklkKSB7XHJcbiAgICAgICAgICBzdWJzLnB1c2goc3ViKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXNvbHZlKHN1YnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFN1YnNjcmliZXJzKG1hbElkOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHN1YnNjcmliZXJzOiBVc2VyW10gPSBbXTtcclxuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcbiAgICAgIGlmICh0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgU3Vic2NyaXB0aW9uTGlzdCBpcyBlbXB0eWApKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZm9yRWFjaChhc3luYyBzdWIgPT4ge1xyXG4gICAgICAgIGl0ZXJhdGlvbisrO1xyXG4gICAgICAgIGlmIChzdWIuTWVkaWFJZCA9PT0gbWFsSWQpIHtcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyQnlJZChzdWIuVXNlcklkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBVc2VyKSBzdWJzY3JpYmVycy5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMobWVkaWFJZCwgdXNlcklkKTtcclxuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gVXNlckRhdGEuQWxsLmZpbmQoeCA9PiB4LklkID09PSB1c2VySWQpO1xyXG4gICAgICAgIGlmICh1c2VyID09PSBudWxsIHx8IHVzZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICBgXCJ0aGlzLlVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBxdWV1ZSA9IFF1ZXVlRGF0YS5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCk7XHJcbiAgICAgICAgICBpZiAocXVldWUgPT09IG51bGwgfHwgcXVldWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgYFwidGhpcy5RdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgbWVkaWFfaWQ6IG1lZGlhSWQsXHJcbiAgICAgICAgICAgICAgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXJJZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uSW5zZXJ0KFRhYmxlLnN1YnNjcmlwdGlvbiwgZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC5pbnNlcnRlZElkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gICAgICAgICAgICAgIHN1Yi5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xyXG4gICAgICAgICAgICAgIHN1Yi5NZWRpYUlkID0gbWVkaWFJZDtcclxuICAgICAgICAgICAgICBzdWIuVXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChcIkVYSVNUU1wiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIERlbGV0ZShtZWRpYUlkOiBudW1iZXIsIGRpc2NvcmRJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XHJcbiAgICAgICAgcmVqKHJlYXNvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgcXVlcnk6IGFueSA9IG51bGw7XHJcbiAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlcilcclxuICAgICAgICBxdWVyeSA9IHsgbWVkaWFfaWQ6IG1lZGlhSWQsIHVzZXJfaWQ6IG5ldyBPYmplY3RJZCh1c2VyLklkKSB9O1xyXG4gICAgICBhd2FpdCBNb25nby5EZWxldGUoVGFibGUuc3Vic2NyaXB0aW9uLCBxdWVyeSk7XHJcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5maW5kKFxyXG4gICAgICAgIHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkICYmIHguVXNlcklkID09PSAodXNlciBhcyBVc2VyKS5JZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoc3ViICE9PSBudWxsICYmIHN1YiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuU3Vic2NyaXB0aW9uTGlzdCwgc3ViLCAoKSA9PiB7XHJcbiAgICAgICAgICByZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWoobmV3IEVycm9yKGBOb3RoaW5nIHRvIHJlbW92ZS5gKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFeGlzdHMobWVkaWFJZDogbnVtYmVyLCB1c2VySWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuQWxsLmZpbmQoXHJcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09IHVzZXJJZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIExvZ0FsbCgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5BbGwgPT09IG51bGwgfHxcclxuICAgICAgICB0aGlzLkFsbCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgdGhpcy5BbGwubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFwidGhpcy5BbGxcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==