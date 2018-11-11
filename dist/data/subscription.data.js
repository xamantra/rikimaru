"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const json_helper_1 = require("../helpers/json.helper");
const tables_1 = require("../core/tables");
const subscription_model_1 = require("../models/subscription.model");
const mongo_1 = require("../core/mongo");
const mongodb_1 = require("mongodb");
const array_helper_1 = require("../helpers/array.helper");
const anime_cache_1 = require("../core/anime.cache");
const null_checker_helper_1 = require("../helpers/null.checker.helper");
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
            if (this.SubscriptionList.length === 0) {
                resolve(subscribers);
            }
            const filtered = [];
            for (let i = 0; i < this.SubscriptionList.length; i++) {
                const sub = this.SubscriptionList[i];
                if (sub.MediaId === malId) {
                    filtered.push(sub);
                }
                if (i === this.SubscriptionList.length - 1) {
                    for (let x = 0; x < filtered.length; x++) {
                        const element = filtered[x];
                        const user = await user_data_1.UserData.GetUserById(element.UserId);
                        if (null_checker_helper_1.NullCheck.Fine(user))
                            subscribers.push(user);
                        if (x === filtered.length - 1) {
                            resolve(subscribers);
                        }
                    }
                }
            }
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
            if (user instanceof subscription_model_1.User)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsd0RBQW9EO0FBQ3BELDJDQUF3QztBQUN4QyxxRUFBa0U7QUFDbEUseUNBQXNDO0FBQ3RDLHFDQUFtQztBQUNuQywwREFBc0Q7QUFDdEQscURBQWlEO0FBQ2pELHdFQUEyRDtBQUUzRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUks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QyxDQUFDLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFyTU0sNkJBQVksR0FBRyxLQUFLLENBQUM7QUFJYixpQ0FBZ0IsR0FBbUIsRUFBRSxDQUFDO0FBTHZELDRDQXVNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuLi9jb3JlL3RhYmxlc1wiO1xuaW1wb3J0IHsgVXNlciwgU3Vic2NyaXB0aW9uIH0gZnJvbSBcIi4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIi4uL2NvcmUvbW9uZ29cIjtcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcIm1vbmdvZGJcIjtcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbkRhdGEge1xuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5TdWJzY3JpcHRpb25MaXN0O1xuICB9XG4gIHByaXZhdGUgc3RhdGljIFN1YnNjcmlwdGlvbkxpc3Q6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHRoaXMuQ2xlYXIoKTtcbiAgICAgIHRoaXMuQ2xlYXIoKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlcy5zdWJzY3JpcHRpb24pO1xuICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFN1YnNjcmlwdGlvbj4oXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgU3Vic2NyaXB0aW9uXG4gICAgICApO1xuICAgICAgaWYgKHN1YnMgPT09IG51bGwgfHwgc3VicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihyZXN1bHQsU3Vic2NyaXB0aW9uKTtgXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgU3VicyBMaXN0IExlbmd0aDogJHt0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RofWApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QgPSBzdWJzO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzdWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYFN1YnMgTGlzdCBMZW5ndGg6ICR7dGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBDbGVhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3Quc3BsaWNlKDAsIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGgpO1xuICAgICAgaWYgKHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgQXJyYXkgd2FzIG5vdCBjbGVhcmVkLmApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlclN1YnModXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U3Vic2NyaXB0aW9uW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgIGlmIChzdWIuVXNlcklkID09PSB1c2VySWQpIHtcbiAgICAgICAgICBzdWJzLnB1c2goc3ViKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNvbHZlKHN1YnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXRTdWJzY3JpYmVycyhtYWxJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXJbXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVyczogVXNlcltdID0gW107XG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpbHRlcmVkOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3ViID0gdGhpcy5TdWJzY3JpcHRpb25MaXN0W2ldO1xuICAgICAgICBpZiAoc3ViLk1lZGlhSWQgPT09IG1hbElkKSB7XG4gICAgICAgICAgZmlsdGVyZWQucHVzaChzdWIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZmlsdGVyZWQubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBmaWx0ZXJlZFt4XTtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyQnlJZChlbGVtZW50LlVzZXJJZCk7XG4gICAgICAgICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHN1YnNjcmliZXJzLnB1c2godXNlcik7XG4gICAgICAgICAgICBpZiAoeCA9PT0gZmlsdGVyZWQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5zZXJ0KG1lZGlhSWQ6IG51bWJlciwgdXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhtZWRpYUlkLCB1c2VySWQpO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IFVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKTtcbiAgICAgICAgaWYgKHVzZXIgPT09IG51bGwgfHwgdXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgYFwidGhpcy5Vc2VyRGF0YS5BbGwuZmluZCh4ID0+IHguSWQgPT09IHVzZXJJZClcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcXVldWUgPSBRdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpO1xuICAgICAgICAgIGlmIChxdWV1ZSA9PT0gbnVsbCB8fCBxdWV1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgIGBcInRoaXMuUXVldWVEYXRhLkFsbC5maW5kKHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICBtZWRpYV9pZDogbWVkaWFJZCxcbiAgICAgICAgICAgICAgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXJJZClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5JbnNlcnQoVGFibGVzLnN1YnNjcmlwdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICAgIHN1Yi5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICAgICAgICBzdWIuTWVkaWFJZCA9IG1lZGlhSWQ7XG4gICAgICAgICAgICAgIHN1Yi5Vc2VySWQgPSB1c2VySWQ7XG4gICAgICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChcIkVYSVNUU1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRGVsZXRlKG1lZGlhSWQ6IG51bWJlciwgZGlzY29yZElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcywgcmVqKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgcmVqKHJlYXNvbik7XG4gICAgICB9KTtcbiAgICAgIGxldCBxdWVyeTogYW55ID0gbnVsbDtcbiAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlcilcbiAgICAgICAgcXVlcnkgPSB7IG1lZGlhX2lkOiBtZWRpYUlkLCB1c2VyX2lkOiBuZXcgT2JqZWN0SWQodXNlci5JZCkgfTtcbiAgICAgIGF3YWl0IE1vbmdvLkRlbGV0ZShUYWJsZXMuc3Vic2NyaXB0aW9uLCBxdWVyeSk7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZmluZChcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09ICh1c2VyIGFzIFVzZXIpLklkXG4gICAgICApO1xuICAgICAgaWYgKHN1YiAhPT0gbnVsbCAmJiBzdWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5TdWJzY3JpcHRpb25MaXN0LCBzdWIsICgpID0+IHtcbiAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMoKTtcbiAgICAgICAgY29uc29sZS5sb2coYE5vdGhpbmcgdG8gcmVtb3ZlLmApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBFeGlzdHMobWVkaWFJZDogbnVtYmVyLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuQWxsLmZpbmQoXG4gICAgICAgIHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkICYmIHguVXNlcklkID09PSB1c2VySWRcbiAgICAgICk7XG4gICAgICBpZiAoc3ViID09PSBudWxsIHx8IHN1YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTG9nQWxsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5BbGwgPT09IG51bGwgfHxcbiAgICAgICAgdGhpcy5BbGwgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICB0aGlzLkFsbC5sZW5ndGggPT09IDBcbiAgICAgICkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBcInRoaXMuQWxsXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQWxsKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=