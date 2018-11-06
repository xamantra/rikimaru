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
                else {
                    for (let i = 0; i < subs.length; i++) {
                        const sub = subs[i];
                        this.SubscriptionList.push(sub);
                        anime_cache_1.AnimeCache.Get(sub.MediaId);
                        if (i === subs.length - 1) {
                            this.Initializing = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUVqRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUks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WUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBak1NLDZCQUFZLEdBQUcsS0FBSyxDQUFDO0FBSWIsaUNBQWdCLEdBQW1CLEVBQUUsQ0FBQztBQUx2RCw0Q0FtTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcIi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi4vY29yZS90YWJsZXNcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuL21lZGlhLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25EYXRhIHtcbiAgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIGdldCBBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuU3Vic2NyaXB0aW9uTGlzdDtcbiAgfVxuICBwcml2YXRlIHN0YXRpYyBTdWJzY3JpcHRpb25MaXN0OiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICB0aGlzLkluaXRpYWxpemluZyA9IHRydWU7XG4gICAgICBhd2FpdCB0aGlzLkNsZWFyKCk7XG4gICAgICB0aGlzLkNsZWFyKCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxTdWJzY3JpcHRpb24+KFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgKTtcbiAgICAgIGlmIChzdWJzID09PSBudWxsIHx8IHN1YnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFN1YnNjcmlwdGlvbj4ocmVzdWx0LFN1YnNjcmlwdGlvbik7YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XG4gICAgICAgICAgICBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgQ2xlYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LnNwbGljZSgwLCB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKTtcbiAgICAgIGlmICh0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEFycmF5IHdhcyBub3QgY2xlYXJlZC5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXJTdWJzKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFN1YnNjcmlwdGlvbltdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gdXNlcklkKSB7XG4gICAgICAgICAgc3Vicy5wdXNoKHN1Yik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZShzdWJzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0U3Vic2NyaWJlcnMobWFsSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3Vic2NyaWJlcnM6IFVzZXJbXSA9IFtdO1xuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gICAgICBpZiAodGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBTdWJzY3JpcHRpb25MaXN0IGlzIGVtcHR5YCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZvckVhY2goYXN5bmMgc3ViID0+IHtcbiAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgICAgIGlmIChzdWIuTWVkaWFJZCA9PT0gbWFsSWQpIHtcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlckJ5SWQoc3ViLlVzZXJJZCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlcikgc3Vic2NyaWJlcnMucHVzaCh1c2VyKTtcbiAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXNvbHZlKHN1YnNjcmliZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbnNlcnQobWVkaWFJZDogbnVtYmVyLCB1c2VySWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKG1lZGlhSWQsIHVzZXJJZCk7XG4gICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICBjb25zdCB1c2VyID0gVXNlckRhdGEuQWxsLmZpbmQoeCA9PiB4LklkID09PSB1c2VySWQpO1xuICAgICAgICBpZiAodXNlciA9PT0gbnVsbCB8fCB1c2VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBgXCJ0aGlzLlVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBxdWV1ZSA9IFF1ZXVlRGF0YS5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCk7XG4gICAgICAgICAgaWYgKHF1ZXVlID09PSBudWxsIHx8IHF1ZXVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgYFwidGhpcy5RdWV1ZURhdGEuQWxsLmZpbmQoeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgIG1lZGlhX2lkOiBtZWRpYUlkLFxuICAgICAgICAgICAgICB1c2VyX2lkOiBuZXcgT2JqZWN0SWQodXNlcklkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZXMuc3Vic2NyaXB0aW9uLCBkYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gdW5kZWZpbmVkICYmIHJlc3VsdC5pbnNlcnRlZElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgICAgc3ViLklkID0gcmVzdWx0Lmluc2VydGVkSWQ7XG4gICAgICAgICAgICAgIHN1Yi5NZWRpYUlkID0gbWVkaWFJZDtcbiAgICAgICAgICAgICAgc3ViLlVzZXJJZCA9IHVzZXJJZDtcbiAgICAgICAgICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LnB1c2goc3ViKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KFwiRVhJU1RTXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBEZWxldGUobWVkaWFJZDogbnVtYmVyLCBkaXNjb3JkSWQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzLCByZWopID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICByZWoocmVhc29uKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHF1ZXJ5OiBhbnkgPSBudWxsO1xuICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBVc2VyKVxuICAgICAgICBxdWVyeSA9IHsgbWVkaWFfaWQ6IG1lZGlhSWQsIHVzZXJfaWQ6IG5ldyBPYmplY3RJZCh1c2VyLklkKSB9O1xuICAgICAgYXdhaXQgTW9uZ28uRGVsZXRlKFRhYmxlcy5zdWJzY3JpcHRpb24sIHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHN1YiA9IHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5maW5kKFxuICAgICAgICB4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCAmJiB4LlVzZXJJZCA9PT0gKHVzZXIgYXMgVXNlcikuSWRcbiAgICAgICk7XG4gICAgICBpZiAoc3ViICE9PSBudWxsICYmIHN1YiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIEFycmF5SGVscGVyLnJlbW92ZSh0aGlzLlN1YnNjcmlwdGlvbkxpc3QsIHN1YiwgKCkgPT4ge1xuICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlaihuZXcgRXJyb3IoYE5vdGhpbmcgdG8gcmVtb3ZlLmApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRXhpc3RzKG1lZGlhSWQ6IG51bWJlciwgdXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLkFsbC5maW5kKFxuICAgICAgICB4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCAmJiB4LlVzZXJJZCA9PT0gdXNlcklkXG4gICAgICApO1xuICAgICAgaWYgKHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIExvZ0FsbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuQWxsID09PSBudWxsIHx8XG4gICAgICAgIHRoaXMuQWxsID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdGhpcy5BbGwubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJ0aGlzLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgfVxufVxuIl19