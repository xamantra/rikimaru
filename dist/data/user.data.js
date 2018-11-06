"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const table_1 = require("../core/table");
const mongo_1 = require("../core/mongo");
class UserData {
    static get All() {
        return this.UserList;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const result = await mongo_1.Mongo.FindAll(table_1.Table.user);
            const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
            if (users !== undefined && users !== null) {
                if (users.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                else {
                    this.UserList = users;
                    this.Initializing = false;
                    resolve();
                }
            }
            else {
                this.Initializing = false;
                reject(new Error(`"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async GetUser(discordId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const user = this.All.find(x => x.DiscordId === discordId);
            if (user !== null && user !== undefined) {
                res(user);
            }
            else {
                rej(new Error(`"this.All.find(x => x.DiscordId === discordId)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async GetUserById(id) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const user = this.All.find(x => x.Id === id);
            if (user !== null && user !== undefined) {
                resolve(user);
            }
            else {
                reject(new Error(`"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async Insert(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId).catch((err) => {
                reject(err);
            });
            if (exists === false) {
                const data = { discord_id: discordId };
                const result = await mongo_1.Mongo.Insert(table_1.Table.user, data);
                if (result.insertedId !== null && result.insertedId !== undefined) {
                    const user = new subscription_model_1.User();
                    user.Id = result.insertedId;
                    user.DiscordId = discordId;
                    this.UserList.push(user);
                }
                resolve(result.insertedId);
            }
            else {
                reject(new Error(`DiscordId: "${discordId}" already exists.`));
            }
        });
    }
    static async Exists(discordId) {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            const u = this.All.find(x => x.DiscordId === discordId);
            if (u === undefined || u === null) {
                res(false);
            }
            else {
                res(true);
            }
        });
    }
    static async LogAll() {
        return new Promise(async (res, rej) => {
            await this.OnReady();
            if (this.All === undefined || this.All === null) {
                rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
            }
            else {
                console.log(this.All);
                res();
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
UserData.Initializing = false;
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvdXNlci5kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQW9EO0FBQ3BELHdEQUFvRDtBQUNwRCx5Q0FBc0M7QUFDdEMseUNBQXNDO0FBRXRDLE1BQWEsUUFBUTtJQUVaLE1BQU0sS0FBSyxHQUFHO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR00sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQU8sTUFBTSxFQUFFLHlCQUFJLENBQUMsQ0FBQztZQUNoRSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLHlF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Q0FBQztpQkFDWDtZQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUF0SE0scUJBQVksR0FBRyxLQUFLLENBQUM7QUFJYixpQkFBUSxHQUFXLEVBQUUsQ0FBQztBQUx2Qyw0QkF3SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XHJcbmltcG9ydCB7IFRhYmxlIH0gZnJvbSBcIi4uL2NvcmUvdGFibGVcIjtcclxuaW1wb3J0IHsgTW9uZ28gfSBmcm9tIFwiLi4vY29yZS9tb25nb1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJEYXRhIHtcclxuICBzdGF0aWMgSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgcHVibGljIHN0YXRpYyBnZXQgQWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuVXNlckxpc3Q7XHJcbiAgfVxyXG4gIHByaXZhdGUgc3RhdGljIFVzZXJMaXN0OiBVc2VyW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gdHJ1ZTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZS51c2VyKTtcclxuICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxVc2VyPihyZXN1bHQsIFVzZXIpO1xyXG4gICAgICBpZiAodXNlcnMgIT09IHVuZGVmaW5lZCAmJiB1c2VycyAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlmICh1c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXNlckxpc3QgPSB1c2VycztcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICBgXCJKc29uSGVscGVyLkFycmF5Q29udmVydDxVc2VyPihyZXN1bHQsIFVzZXIpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlcihkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXI+KGFzeW5jIChyZXMsIHJlaikgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgdXNlciA9IHRoaXMuQWxsLmZpbmQoeCA9PiB4LkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKTtcclxuICAgICAgaWYgKHVzZXIgIT09IG51bGwgJiYgdXNlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzKHVzZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlaihcclxuICAgICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFwidGhpcy5BbGwuZmluZCh4ID0+IHguRGlzY29yZElkID09PSBkaXNjb3JkSWQpXCIgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0VXNlckJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFVzZXI+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLkFsbC5maW5kKHggPT4geC5JZCA9PT0gaWQpO1xyXG4gICAgICBpZiAodXNlciAhPT0gbnVsbCAmJiB1c2VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChcclxuICAgICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYFwidGhpcy5BbGwuZmluZCh4ID0+IHguSWQgPT09IGlkKVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluc2VydChkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZGlzY29yZElkKS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0geyBkaXNjb3JkX2lkOiBkaXNjb3JkSWQgfTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5JbnNlcnQoVGFibGUudXNlciwgZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pbnNlcnRlZElkICE9PSBudWxsICYmIHJlc3VsdC5pbnNlcnRlZElkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgICAgdXNlci5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xyXG4gICAgICAgICAgdXNlci5EaXNjb3JkSWQgPSBkaXNjb3JkSWQ7XHJcbiAgICAgICAgICB0aGlzLlVzZXJMaXN0LnB1c2godXNlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc29sdmUocmVzdWx0Lmluc2VydGVkSWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYERpc2NvcmRJZDogXCIke2Rpc2NvcmRJZH1cIiBhbHJlYWR5IGV4aXN0cy5gKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBFeGlzdHMoZGlzY29yZElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzLCByZWopID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHUgPSB0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCk7XHJcbiAgICAgIGlmICh1ID09PSB1bmRlZmluZWQgfHwgdSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJlcyhmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTG9nQWxsKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMsIHJlaikgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgaWYgKHRoaXMuQWxsID09PSB1bmRlZmluZWQgfHwgdGhpcy5BbGwgPT09IG51bGwpIHtcclxuICAgICAgICByZWoobmV3IEVycm9yKGBcIlVzZXJEYXRhLkFsbFwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BbGwpO1xyXG4gICAgICAgIHJlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=