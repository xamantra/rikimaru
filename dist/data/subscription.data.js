"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const subscription_model_1 = require("./../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const tables_1 = require("../core/tables");
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
            const result = await mongo_1.Mongo.FindAll(tables_1.Tables.subscription);
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
                        const result = await mongo_1.Mongo.Insert(tables_1.Tables.subscription, data);
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
            await mongo_1.Mongo.Delete(tables_1.Tables.subscription, query);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUVqRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUks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LE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFuTU0sNkJBQVksR0FBRyxLQUFLLENBQUM7QUFJYixpQ0FBZ0IsR0FBbUIsRUFBRSxDQUFDO0FBTHZELDRDQXFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcIi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgVGFibGVzIH0gZnJvbSBcIi4uL2NvcmUvdGFibGVzXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gXCIuLi9jb3JlL21vbmdvXCI7XHJcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIjtcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vbWVkaWEuZGF0YVwiO1xyXG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25EYXRhIHtcclxuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuU3Vic2NyaXB0aW9uTGlzdDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdGF0aWMgU3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcclxuICAgICAgYXdhaXQgdGhpcy5DbGVhcigpO1xyXG4gICAgICB0aGlzLkNsZWFyKCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlcy5zdWJzY3JpcHRpb24pO1xyXG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihcclxuICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzdWJzID09PSBudWxsIHx8IHN1YnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihyZXN1bHQsU3Vic2NyaXB0aW9uKTtgXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1tpXTtcclxuICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XHJcbiAgICAgICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcclxuICAgICAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlckJ5SWQoc3ViLlVzZXJJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBDbGVhcigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3Quc3BsaWNlKDAsIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGgpO1xyXG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yKGBBcnJheSB3YXMgbm90IGNsZWFyZWQuYCkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlclN1YnModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTdWJzY3JpcHRpb25bXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3Qgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZvckVhY2goc3ViID0+IHtcclxuICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gdXNlcklkKSB7XHJcbiAgICAgICAgICBzdWJzLnB1c2goc3ViKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXNvbHZlKHN1YnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFN1YnNjcmliZXJzKG1hbElkOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHN1YnNjcmliZXJzOiBVc2VyW10gPSBbXTtcclxuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcbiAgICAgIGlmICh0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgU3Vic2NyaXB0aW9uTGlzdCBpcyBlbXB0eWApKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZm9yRWFjaChhc3luYyBzdWIgPT4ge1xyXG4gICAgICAgIGl0ZXJhdGlvbisrO1xyXG4gICAgICAgIGlmIChzdWIuTWVkaWFJZCA9PT0gbWFsSWQpIHtcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyQnlJZChzdWIuVXNlcklkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBVc2VyKSBzdWJzY3JpYmVycy5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMobWVkaWFJZCwgdXNlcklkKTtcclxuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gVXNlckRhdGEuQWxsLmZpbmQoeCA9PiB4LklkID09PSB1c2VySWQpO1xyXG4gICAgICAgIGlmICh1c2VyID09PSBudWxsIHx8IHVzZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICBgXCJ0aGlzLlVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBxdWV1ZSA9IFF1ZXVlRGF0YS5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCk7XHJcbiAgICAgICAgICBpZiAocXVldWUgPT09IG51bGwgfHwgcXVldWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgYFwidGhpcy5RdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgbWVkaWFfaWQ6IG1lZGlhSWQsXHJcbiAgICAgICAgICAgICAgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXJJZClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uSW5zZXJ0KFRhYmxlcy5zdWJzY3JpcHRpb24sIGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICAgICAgICAgICAgICBzdWIuSWQgPSByZXN1bHQuaW5zZXJ0ZWRJZDtcclxuICAgICAgICAgICAgICBzdWIuTWVkaWFJZCA9IG1lZGlhSWQ7XHJcbiAgICAgICAgICAgICAgc3ViLlVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICAgICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QucHVzaChzdWIpO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoXCJFWElTVFNcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBEZWxldGUobWVkaWFJZDogbnVtYmVyLCBkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMsIHJlaikgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIHJlaihyZWFzb24pO1xyXG4gICAgICB9KTtcclxuICAgICAgbGV0IHF1ZXJ5OiBhbnkgPSBudWxsO1xyXG4gICAgICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIpXHJcbiAgICAgICAgcXVlcnkgPSB7IG1lZGlhX2lkOiBtZWRpYUlkLCB1c2VyX2lkOiBuZXcgT2JqZWN0SWQodXNlci5JZCkgfTtcclxuICAgICAgYXdhaXQgTW9uZ28uRGVsZXRlKFRhYmxlcy5zdWJzY3JpcHRpb24sIHF1ZXJ5KTtcclxuICAgICAgY29uc3Qgc3ViID0gdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZpbmQoXHJcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09ICh1c2VyIGFzIFVzZXIpLklkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzdWIgIT09IG51bGwgJiYgc3ViICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5TdWJzY3JpcHRpb25MaXN0LCBzdWIsICgpID0+IHtcclxuICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlaihuZXcgRXJyb3IoYE5vdGhpbmcgdG8gcmVtb3ZlLmApKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3Qgc3ViID0gdGhpcy5BbGwuZmluZChcclxuICAgICAgICB4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCAmJiB4LlVzZXJJZCA9PT0gdXNlcklkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChzdWIgPT09IG51bGwgfHwgc3ViID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTG9nQWxsKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLkFsbCA9PT0gbnVsbCB8fFxyXG4gICAgICAgIHRoaXMuQWxsID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICB0aGlzLkFsbC5sZW5ndGggPT09IDBcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJ0aGlzLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGwpO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIE9uUmVhZHkoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuSW5pdGlhbGl6aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgMSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19