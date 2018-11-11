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
                const sub = this.SubscriptionList[i];
                if (sub.MediaId === malId) {
                    const user = await user_data_1.UserData.GetUserById(sub.UserId);
                    if (null_checker_helper_1.NullCheck.Fine(user))
                        subscribers.push(user);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsdUVBQThEO0FBQzlELHdEQUFvRDtBQUNwRCwyQ0FBd0M7QUFDeEMscUVBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxQ0FBbUM7QUFDbkMsMERBQXNEO0FBSXRELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFFM0QsTUFBYSxnQkFBZ0I7SUFFcEIsTUFBTSxLQUFLLEdBQUc7UUFDbkIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUdNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hELE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQ3hDLE1BQU0sRUFDTixpQ0FBWSxDQUNiLENBQUM7WUFDRixJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1B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LENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBOUxNLDZCQUFZLEdBQUcsS0FBSyxDQUFDO0FBSWIsaUNBQWdCLEdBQW1CLEVBQUUsQ0FBQztBQUx2RCw0Q0FnTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcIi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi4vY29yZS90YWJsZXNcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuL21lZGlhLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25EYXRhIHtcbiAgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIGdldCBBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuU3Vic2NyaXB0aW9uTGlzdDtcbiAgfVxuICBwcml2YXRlIHN0YXRpYyBTdWJzY3JpcHRpb25MaXN0OiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICB0aGlzLkluaXRpYWxpemluZyA9IHRydWU7XG4gICAgICBhd2FpdCB0aGlzLkNsZWFyKCk7XG4gICAgICB0aGlzLkNsZWFyKCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxTdWJzY3JpcHRpb24+KFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgKTtcbiAgICAgIGlmIChzdWJzID09PSBudWxsIHx8IHN1YnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PFN1YnNjcmlwdGlvbj4ocmVzdWx0LFN1YnNjcmlwdGlvbik7YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coYFN1YnMgTGlzdCBMZW5ndGg6ICR7dGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0ID0gc3VicztcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHN1YnNbaV07XG4gICAgICAgICAgICBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTdWJzIExpc3QgTGVuZ3RoOiAke3RoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGh9YCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgQ2xlYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LnNwbGljZSgwLCB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKTtcbiAgICAgIGlmICh0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEFycmF5IHdhcyBub3QgY2xlYXJlZC5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXJTdWJzKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFN1YnNjcmlwdGlvbltdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gdXNlcklkKSB7XG4gICAgICAgICAgc3Vicy5wdXNoKHN1Yik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZShzdWJzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0U3Vic2NyaWJlcnMobWFsSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3Vic2NyaWJlcnM6IFVzZXJbXSA9IFtdO1xuICAgICAgaWYgKHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzdWIgPSB0aGlzLlN1YnNjcmlwdGlvbkxpc3RbaV07XG4gICAgICAgIGlmIChzdWIuTWVkaWFJZCA9PT0gbWFsSWQpIHtcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlckJ5SWQoc3ViLlVzZXJJZCk7XG4gICAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSBzdWJzY3JpYmVycy5wdXNoKHVzZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJlc29sdmUoc3Vic2NyaWJlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMobWVkaWFJZCwgdXNlcklkKTtcbiAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBVc2VyRGF0YS5BbGwuZmluZCh4ID0+IHguSWQgPT09IHVzZXJJZCk7XG4gICAgICAgIGlmICh1c2VyID09PSBudWxsIHx8IHVzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIGBcInRoaXMuVXNlckRhdGEuQWxsLmZpbmQoeCA9PiB4LklkID09PSB1c2VySWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHF1ZXVlID0gUXVldWVEYXRhLkFsbC5maW5kKHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkKTtcbiAgICAgICAgICBpZiAocXVldWUgPT09IG51bGwgfHwgcXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICBgXCJ0aGlzLlF1ZXVlRGF0YS5BbGwuZmluZCh4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZClcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgbWVkaWFfaWQ6IG1lZGlhSWQsXG4gICAgICAgICAgICAgIHVzZXJfaWQ6IG5ldyBPYmplY3RJZCh1c2VySWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uSW5zZXJ0KFRhYmxlcy5zdWJzY3JpcHRpb24sIGRhdGEpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5pbnNlcnRlZElkICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0Lmluc2VydGVkSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICBzdWIuSWQgPSByZXN1bHQuaW5zZXJ0ZWRJZDtcbiAgICAgICAgICAgICAgc3ViLk1lZGlhSWQgPSBtZWRpYUlkO1xuICAgICAgICAgICAgICBzdWIuVXNlcklkID0gdXNlcklkO1xuICAgICAgICAgICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QucHVzaChzdWIpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoXCJFWElTVFNcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIERlbGV0ZShtZWRpYUlkOiBudW1iZXIsIGRpc2NvcmRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMsIHJlaikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIHJlaihyZWFzb24pO1xuICAgICAgfSk7XG4gICAgICBsZXQgcXVlcnk6IGFueSA9IG51bGw7XG4gICAgICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIpXG4gICAgICAgIHF1ZXJ5ID0geyBtZWRpYV9pZDogbWVkaWFJZCwgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXIuSWQpIH07XG4gICAgICBhd2FpdCBNb25nby5EZWxldGUoVGFibGVzLnN1YnNjcmlwdGlvbiwgcXVlcnkpO1xuICAgICAgY29uc3Qgc3ViID0gdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZpbmQoXG4gICAgICAgIHggPT4geC5NZWRpYUlkID09PSBtZWRpYUlkICYmIHguVXNlcklkID09PSAodXNlciBhcyBVc2VyKS5JZFxuICAgICAgKTtcbiAgICAgIGlmIChzdWIgIT09IG51bGwgJiYgc3ViICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuU3Vic2NyaXB0aW9uTGlzdCwgc3ViLCAoKSA9PiB7XG4gICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBOb3RoaW5nIHRvIHJlbW92ZS5gKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRXhpc3RzKG1lZGlhSWQ6IG51bWJlciwgdXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLkFsbC5maW5kKFxuICAgICAgICB4ID0+IHguTWVkaWFJZCA9PT0gbWVkaWFJZCAmJiB4LlVzZXJJZCA9PT0gdXNlcklkXG4gICAgICApO1xuICAgICAgaWYgKHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIExvZ0FsbCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuQWxsID09PSBudWxsIHx8XG4gICAgICAgIHRoaXMuQWxsID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdGhpcy5BbGwubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJ0aGlzLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFsbCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgfVxufVxuIl19