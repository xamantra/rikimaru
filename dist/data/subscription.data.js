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
            for (let i = 0; i < this.SubscriptionList.length; i++) {
                const sub = this.SubscriptionList.find(x => x.MediaId === malId);
                const user = await user_data_1.UserData.GetUserById(sub.UserId);
                if (null_checker_helper_1.NullCheck.Fine(user))
                    subscribers.push(user);
                if (i === this.SubscriptionList.length - 1) {
                    resolve(subscribers);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFFM0QsTUFBYSxnQkFBZ0I7SUFFcEIsTUFBTSxLQUFLLEdBQUc7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUdNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hELE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQ3hDLE1BQU0sRUFDTixpQ0FBWSxDQUNiLENBQUM7WUFDRixJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1B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QUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE1TE0sNkJBQVksR0FBRyxLQUFLLENBQUM7QUFJYixpQ0FBZ0IsR0FBbUIsRUFBRSxDQUFDO0FBTHZELDRDQThMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwiLi8uLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuLi9jb3JlL3RhYmxlc1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gXCIuLi9jb3JlL21vbmdvXCI7XG5pbXBvcnQgeyBPYmplY3RJZCB9IGZyb20gXCJtb25nb2RiXCI7XG5pbXBvcnQgeyBBcnJheUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2FycmF5LmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbkRhdGEge1xuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5TdWJzY3JpcHRpb25MaXN0O1xuICB9XG4gIHByaXZhdGUgc3RhdGljIFN1YnNjcmlwdGlvbkxpc3Q6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgICAgIGF3YWl0IHRoaXMuQ2xlYXIoKTtcbiAgICAgIHRoaXMuQ2xlYXIoKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5GaW5kQWxsKFRhYmxlcy5zdWJzY3JpcHRpb24pO1xuICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFN1YnNjcmlwdGlvbj4oXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgU3Vic2NyaXB0aW9uXG4gICAgICApO1xuICAgICAgaWYgKHN1YnMgPT09IG51bGwgfHwgc3VicyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgIHJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihyZXN1bHQsU3Vic2NyaXB0aW9uKTtgXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgU3VicyBMaXN0IExlbmd0aDogJHt0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RofWApO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QgPSBzdWJzO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcbiAgICAgICAgICAgIGlmIChpID09PSBzdWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYFN1YnMgTGlzdCBMZW5ndGg6ICR7dGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBDbGVhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3Quc3BsaWNlKDAsIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGgpO1xuICAgICAgaWYgKHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgQXJyYXkgd2FzIG5vdCBjbGVhcmVkLmApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlclN1YnModXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U3Vic2NyaXB0aW9uW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgIGlmIChzdWIuVXNlcklkID09PSB1c2VySWQpIHtcbiAgICAgICAgICBzdWJzLnB1c2goc3ViKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXNvbHZlKHN1YnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXRTdWJzY3JpYmVycyhtYWxJZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXJbXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVyczogVXNlcltdID0gW107XG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5maW5kKHggPT4geC5NZWRpYUlkID09PSBtYWxJZCk7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyQnlJZChzdWIuVXNlcklkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSBzdWJzY3JpYmVycy5wdXNoKHVzZXIpO1xuICAgICAgICBpZiAoaSA9PT0gdGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbnNlcnQobWVkaWFJZDogbnVtYmVyLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKG1lZGlhSWQsIHVzZXJJZCk7XG4gICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICBjb25zdCB1c2VyID0gVXNlckRhdGEuQWxsLmZpbmQoeCA9PiB4LklkID09PSB1c2VySWQpO1xuICAgICAgICBpZiAodXNlciA9PT0gbnVsbCB8fCB1c2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBgXCJ0aGlzLlVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBxdWV1ZSA9IFF1ZXVlRGF0YS5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCk7XG4gICAgICAgICAgaWYgKHF1ZXVlID09PSBudWxsIHx8IHF1ZXVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgYFwidGhpcy5RdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgIG1lZGlhX2lkOiBtZWRpYUlkLFxuICAgICAgICAgICAgICB1c2VyX2lkOiBuZXcgT2JqZWN0SWQodXNlcklkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMuc3Vic2NyaXB0aW9uLCBkYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC5pbnNlcnRlZElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgc3ViLklkID0gcmVzdWx0Lmluc2VydGVkSWQ7XG4gICAgICAgICAgICAgIHN1Yi5NZWRpYUlkID0gbWVkaWFJZDtcbiAgICAgICAgICAgICAgc3ViLlVzZXJJZCA9IHVzZXJJZDtcbiAgICAgICAgICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LnB1c2goc3ViKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KFwiRVhJU1RTXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBEZWxldGUobWVkaWFJZDogbnVtYmVyLCBkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzLCByZWopID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICByZWoocmVhc29uKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHF1ZXJ5OiBhbnkgPSBudWxsO1xuICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBVc2VyKVxuICAgICAgICBxdWVyeSA9IHsgbWVkaWFfaWQ6IG1lZGlhSWQsIHVzZXJfaWQ6IG5ldyBPYmplY3RJZCh1c2VyLklkKSB9O1xuICAgICAgYXdhaXQgTW9uZ28uRGVsZXRlKFRhYmxlcy5zdWJzY3JpcHRpb24sIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5maW5kKFxuICAgICAgICB4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCAmJiB4LlVzZXJJZCA9PT0gKHVzZXIgYXMgVXNlcikuSWRcbiAgICAgICk7XG4gICAgICBpZiAoc3ViICE9PSBudWxsICYmIHN1YiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIEFycmF5SGVscGVyLnJlbW92ZSh0aGlzLlN1YnNjcmlwdGlvbkxpc3QsIHN1YiwgKCkgPT4ge1xuICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcygpO1xuICAgICAgICBjb25zb2xlLmxvZyhgTm90aGluZyB0byByZW1vdmUuYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3ViID0gdGhpcy5BbGwuZmluZChcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09IHVzZXJJZFxuICAgICAgKTtcbiAgICAgIGlmIChzdWIgPT09IG51bGwgfHwgc3ViID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLkFsbCA9PT0gbnVsbCB8fFxuICAgICAgICB0aGlzLkFsbCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHRoaXMuQWxsLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFwidGhpcy5BbGxcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGwpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIE9uUmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuSW5pdGlhbGl6aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==