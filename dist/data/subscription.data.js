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
                    console.log(`Subs List Length: ${this.SubscriptionList.length}`);
                    resolve();
                }
                else {
                    this.SubscriptionList = subs;
                    for (let i = 0; i < subs.length; i++) {
                        const sub = subs[i];
                        anime_cache_1.AnimeCache.Get(sub.MediaId);
                        if (i === subs.length - 1) {
                            this.Initializing = false;
                            console.log(`Subs List Length: ${this.SubscriptionList.length}`);
                            resolve();
                        }
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
                res();
                console.log(`Nothing to remove.`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUVqRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUks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Q0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXBNTSw2QkFBWSxHQUFHLEtBQUssQ0FBQztBQUliLGlDQUFnQixHQUFtQixFQUFFLENBQUM7QUFMdkQsNENBc01DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi91c2VyLmRhdGFcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCIuLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9qc29uLmhlbHBlclwiO1xuaW1wb3J0IHsgVGFibGVzIH0gZnJvbSBcIi4uL2NvcmUvdGFibGVzXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIi4uL2NvcmUvbW9uZ29cIjtcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIjtcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uRGF0YSB7XG4gIHN0YXRpYyBJbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xuICAgIHJldHVybiB0aGlzLlN1YnNjcmlwdGlvbkxpc3Q7XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgU3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSB0cnVlO1xuICAgICAgYXdhaXQgdGhpcy5DbGVhcigpO1xuICAgICAgdGhpcy5DbGVhcigpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkZpbmRBbGwoVGFibGVzLnN1YnNjcmlwdGlvbik7XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICBTdWJzY3JpcHRpb25cbiAgICAgICk7XG4gICAgICBpZiAoc3VicyA9PT0gbnVsbCB8fCBzdWJzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBKc29uSGVscGVyLkFycmF5Q29udmVydDxTdWJzY3JpcHRpb24+KHJlc3VsdCxTdWJzY3JpcHRpb24pO2BcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBTdWJzIExpc3QgTGVuZ3RoOiAke3RoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGh9YCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdCA9IHN1YnM7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzdWIgPSBzdWJzW2ldO1xuICAgICAgICAgICAgQW5pbWVDYWNoZS5HZXQoc3ViLk1lZGlhSWQpO1xuICAgICAgICAgICAgaWYgKGkgPT09IHN1YnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU3VicyBMaXN0IExlbmd0aDogJHt0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RofWApO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIENsZWFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5zcGxpY2UoMCwgdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCk7XG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBBcnJheSB3YXMgbm90IGNsZWFyZWQuYCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXRVc2VyU3Vicyh1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTdWJzY3JpcHRpb25bXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBzdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZvckVhY2goc3ViID0+IHtcbiAgICAgICAgaWYgKHN1Yi5Vc2VySWQgPT09IHVzZXJJZCkge1xuICAgICAgICAgIHN1YnMucHVzaChzdWIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJlc29sdmUoc3Vicyk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFN1YnNjcmliZXJzKG1hbElkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VXNlcltdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YnNjcmliZXJzOiBVc2VyW10gPSBbXTtcbiAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xuICAgICAgaWYgKHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgU3Vic2NyaXB0aW9uTGlzdCBpcyBlbXB0eWApKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5mb3JFYWNoKGFzeW5jIHN1YiA9PiB7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgICAgICBpZiAoc3ViLk1lZGlhSWQgPT09IG1hbElkKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXJCeUlkKHN1Yi5Vc2VySWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIpIHN1YnNjcmliZXJzLnB1c2godXNlcik7XG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5zZXJ0KG1lZGlhSWQ6IG51bWJlciwgdXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhtZWRpYUlkLCB1c2VySWQpO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IFVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKTtcbiAgICAgICAgaWYgKHVzZXIgPT09IG51bGwgfHwgdXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgYFwidGhpcy5Vc2VyRGF0YS5BbGwuZmluZCh4ID0+IHguSWQgPT09IHVzZXJJZClcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcXVldWUgPSBRdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpO1xuICAgICAgICAgIGlmIChxdWV1ZSA9PT0gbnVsbCB8fCBxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgIGBcInRoaXMuUXVldWVEYXRhLkFsbC5maW5kKHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICBtZWRpYV9pZDogbWVkaWFJZCxcbiAgICAgICAgICAgICAgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXJJZClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5JbnNlcnQoVGFibGVzLnN1YnNjcmlwdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICAgIHN1Yi5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICAgICAgICBzdWIuTWVkaWFJZCA9IG1lZGlhSWQ7XG4gICAgICAgICAgICAgIHN1Yi5Vc2VySWQgPSB1c2VySWQ7XG4gICAgICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChcIkVYSVNUU1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRGVsZXRlKG1lZGlhSWQ6IG51bWJlciwgZGlzY29yZElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVqKHJlYXNvbik7XG4gICAgICB9KTtcbiAgICAgIGxldCBxdWVyeTogYW55ID0gbnVsbDtcbiAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlcilcbiAgICAgICAgcXVlcnkgPSB7IG1lZGlhX2lkOiBtZWRpYUlkLCB1c2VyX2lkOiBuZXcgT2JqZWN0SWQodXNlci5JZCkgfTtcbiAgICAgIGF3YWl0IE1vbmdvLkRlbGV0ZShUYWJsZXMuc3Vic2NyaXB0aW9uLCBxdWVyeSk7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZmluZChcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09ICh1c2VyIGFzIFVzZXIpLklkXG4gICAgICApO1xuICAgICAgaWYgKHN1YiAhPT0gbnVsbCAmJiBzdWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5TdWJzY3JpcHRpb25MaXN0LCBzdWIsICgpID0+IHtcbiAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMoKTtcbiAgICAgICAgY29uc29sZS5sb2coYE5vdGhpbmcgdG8gcmVtb3ZlLmApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBFeGlzdHMobWVkaWFJZDogbnVtYmVyLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuQWxsLmZpbmQoXG4gICAgICAgIHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkICYmIHguVXNlcklkID09PSB1c2VySWRcbiAgICAgICk7XG4gICAgICBpZiAoc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTG9nQWxsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5BbGwgPT09IG51bGwgfHxcbiAgICAgICAgdGhpcy5BbGwgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICB0aGlzLkFsbC5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBcInRoaXMuQWxsXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=