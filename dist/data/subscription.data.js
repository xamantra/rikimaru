"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./queue.data");
const user_data_1 = require("./user.data");
const json_helper_1 = require("../helpers/json.helper");
const table_1 = require("../core/table");
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
            const result = await mongo_1.Mongo.FindAll(table_1.Table.subscription);
            const subs = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.Subscription);
            if (subs === null || subs === undefined) {
                this.Initializing = false;
                console.log(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`);
                resolve();
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
                        await anime_cache_1.AnimeCache.Get(sub.MediaId);
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
            const subs = this.SubscriptionList.filter(x => x.MediaId === malId);
            if (subs.length === 0) {
                resolve(subscribers);
            }
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                const user = await user_data_1.UserData.GetUserById(sub.UserId);
                if (null_checker_helper_1.NullCheck.Fine(user))
                    subscribers.push(user);
                if (i === subs.length - 1) {
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
                    resolve(true);
                }
                else {
                    const queue = queue_data_1.QueueData.GetQueue(mediaId);
                    if (queue === null || queue === undefined) {
                        resolve(true);
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
                            resolve(true);
                        }
                    }
                }
            }
            else {
                resolve(false);
            }
        });
    }
    static async Delete(mediaId, discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const user = await user_data_1.UserData.GetUser(discordId);
            let query = null;
            if (user !== null)
                query = { media_id: mediaId, user_id: new mongodb_1.ObjectId(user.Id) };
            await mongo_1.Mongo.Delete(table_1.Table.subscription, query);
            const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
            if (sub !== null && sub !== undefined) {
                array_helper_1.ArrayHelper.remove(this.SubscriptionList, sub, () => {
                    resolve();
                });
            }
            else {
                resolve();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YS9zdWJzY3JpcHRpb24uZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUF5QztBQUN6QywyQ0FBdUM7QUFDdkMsd0RBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxxRUFBa0U7QUFDbEUseUNBQXNDO0FBQ3RDLHFDQUFtQztBQUNuQywwREFBc0Q7QUFDdEQscURBQWlEO0FBQ2pELHdFQUEyRDtBQUUzRCxNQUFhLGdCQUFnQjtJQUVwQixNQUFNLEtBQUssR0FBRztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBSyxDQUFDLE9BQU8sQ0FBQyxhQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFlBQVksQ0FDeEMsTUFBTSxFQUNOLGlDQUFZLENBQ2IsQ0FBQztZQUNGLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcs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RTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBekxNLDZCQUFZLEdBQUcsS0FBSyxDQUFDO0FBSWIsaUNBQWdCLEdBQW1CLEVBQUUsQ0FBQztBQUx2RCw0Q0EyTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCIuLi9jb3JlL3RhYmxlXCI7XG5pbXBvcnQgeyBVc2VyLCBTdWJzY3JpcHRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uRGF0YSB7XG4gIHN0YXRpYyBJbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xuICAgIHJldHVybiB0aGlzLlN1YnNjcmlwdGlvbkxpc3Q7XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgU3Vic2NyaXB0aW9uTGlzdDogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSB0cnVlO1xuICAgICAgYXdhaXQgdGhpcy5DbGVhcigpO1xuICAgICAgdGhpcy5DbGVhcigpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkZpbmRBbGwoVGFibGUuc3Vic2NyaXB0aW9uKTtcbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxTdWJzY3JpcHRpb24+KFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIFN1YnNjcmlwdGlvblxuICAgICAgKTtcbiAgICAgIGlmIChzdWJzID09PSBudWxsIHx8IHN1YnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8U3Vic2NyaXB0aW9uPihyZXN1bHQsU3Vic2NyaXB0aW9uKTtgXG4gICAgICAgICk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coYFN1YnMgTGlzdCBMZW5ndGg6ICR7dGhpcy5TdWJzY3JpcHRpb25MaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0ID0gc3VicztcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHN1YnNbaV07XG4gICAgICAgICAgICBhd2FpdCBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTdWJzIExpc3QgTGVuZ3RoOiAke3RoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGh9YCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgQ2xlYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5TdWJzY3JpcHRpb25MaXN0LnNwbGljZSgwLCB0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoKTtcbiAgICAgIGlmICh0aGlzLlN1YnNjcmlwdGlvbkxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEFycmF5IHdhcyBub3QgY2xlYXJlZC5gKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldFVzZXJTdWJzKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFN1YnNjcmlwdGlvbltdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcbiAgICAgIGNvbnN0IHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgICB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gdXNlcklkKSB7XG4gICAgICAgICAgc3Vicy5wdXNoKHN1Yik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZShzdWJzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0U3Vic2NyaWJlcnMobWFsSWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxVc2VyW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3Vic2NyaWJlcnM6IFVzZXJbXSA9IFtdO1xuICAgICAgaWYgKHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJzID0gdGhpcy5TdWJzY3JpcHRpb25MaXN0LmZpbHRlcih4ID0+IHguTWVkaWFJZCA9PT0gbWFsSWQpO1xuICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc29sdmUoc3Vic2NyaWJlcnMpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IHN1YnNbaV07XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyQnlJZChzdWIuVXNlcklkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSBzdWJzY3JpYmVycy5wdXNoKHVzZXIpO1xuICAgICAgICBpZiAoaSA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcmVzb2x2ZShzdWJzY3JpYmVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5zZXJ0KG1lZGlhSWQ6IG51bWJlciwgdXNlcklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhtZWRpYUlkLCB1c2VySWQpO1xuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IFVzZXJEYXRhLkFsbC5maW5kKHggPT4geC5JZCA9PT0gdXNlcklkKTtcbiAgICAgICAgaWYgKHVzZXIgPT09IG51bGwgfHwgdXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBxdWV1ZSA9IFF1ZXVlRGF0YS5HZXRRdWV1ZShtZWRpYUlkKTtcbiAgICAgICAgICBpZiAocXVldWUgPT09IG51bGwgfHwgcXVldWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgbWVkaWFfaWQ6IG1lZGlhSWQsXG4gICAgICAgICAgICAgIHVzZXJfaWQ6IG5ldyBPYmplY3RJZCh1c2VySWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uSW5zZXJ0KFRhYmxlLnN1YnNjcmlwdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmluc2VydGVkSWQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQuaW5zZXJ0ZWRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICAgIHN1Yi5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xuICAgICAgICAgICAgICBzdWIuTWVkaWFJZCA9IG1lZGlhSWQ7XG4gICAgICAgICAgICAgIHN1Yi5Vc2VySWQgPSB1c2VySWQ7XG4gICAgICAgICAgICAgIHRoaXMuU3Vic2NyaXB0aW9uTGlzdC5wdXNoKHN1Yik7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRGVsZXRlKG1lZGlhSWQ6IG51bWJlciwgZGlzY29yZElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpO1xuICAgICAgbGV0IHF1ZXJ5OiBhbnkgPSBudWxsO1xuICAgICAgaWYgKHVzZXIgIT09IG51bGwpXG4gICAgICAgIHF1ZXJ5ID0geyBtZWRpYV9pZDogbWVkaWFJZCwgdXNlcl9pZDogbmV3IE9iamVjdElkKHVzZXIuSWQpIH07XG4gICAgICBhd2FpdCBNb25nby5EZWxldGUoVGFibGUuc3Vic2NyaXB0aW9uLCBxdWVyeSk7XG4gICAgICBjb25zdCBzdWIgPSB0aGlzLlN1YnNjcmlwdGlvbkxpc3QuZmluZChcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09ICh1c2VyIGFzIFVzZXIpLklkXG4gICAgICApO1xuICAgICAgaWYgKHN1YiAhPT0gbnVsbCAmJiBzdWIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5TdWJzY3JpcHRpb25MaXN0LCBzdWIsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgTm90aGluZyB0byByZW1vdmUuYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEV4aXN0cyhtZWRpYUlkOiBudW1iZXIsIHVzZXJJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgY29uc3Qgc3ViID0gdGhpcy5BbGwuZmluZChcbiAgICAgICAgeCA9PiB4Lk1lZGlhSWQgPT09IG1lZGlhSWQgJiYgeC5Vc2VySWQgPT09IHVzZXJJZFxuICAgICAgKTtcbiAgICAgIGlmIChzdWIgPT09IG51bGwgfHwgc3ViID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBMb2dBbGwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLkFsbCA9PT0gbnVsbCB8fFxuICAgICAgICB0aGlzLkFsbCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIHRoaXMuQWxsLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFwidGhpcy5BbGxcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGwpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIE9uUmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuSW5pdGlhbGl6aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==