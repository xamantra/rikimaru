"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const mongo_1 = require("../core/mongo");
class UserData {
    static get All() {
        return this.UserList;
    }
    static async Init() {
        return new Promise(async (resolve, reject) => {
            this.OnReady().then(() => {
                console.log(`user data init...`);
                this.Initializing = true;
                mongo_1.Mongo.FindAll(data_helper_1.DataHelper.user).then(async (result) => {
                    console.log(`awaiting for array convert...`);
                    const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
                    console.log(`awaiting for iteration...`);
                    let iteration = 1;
                    if (users !== undefined && users !== null) {
                        if (users.length === 0) {
                            console.log(`user data finishing init`);
                            this.Initializing = false;
                            resolve();
                        }
                        console.log(`awaiting for user.forEach...`);
                        users.forEach(user => {
                            this.UserList.push(user);
                            console.log(`user....`);
                            console.log(user);
                            if (iteration === users.length) {
                                this.Initializing = false;
                                resolve();
                            }
                            else {
                                iteration++;
                            }
                        });
                    }
                    else {
                        console.log(`user data finishing init`);
                        this.Initializing = false;
                        reject(new Error(`"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`));
                    }
                });
            });
        });
    }
    static async GetUser(discordId) {
        return new Promise((res, rej) => {
            this.OnReady().then(() => {
                const user = this.All.find(x => x.DiscordId === discordId);
                if (user !== null && user !== undefined) {
                    res(user);
                }
                else {
                    rej(new Error(`"this.All.find(x => x.DiscordId === discordId)" is 'null' or 'undefined'.`));
                }
            });
        });
    }
    static async GetUserById(id) {
        return new Promise((res, rej) => {
            this.OnReady().then(() => {
                const user = this.All.find(x => x.Id === id);
                if (user !== null && user !== undefined) {
                    res(user);
                }
                else {
                    rej(new Error(`"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`));
                }
            });
        });
    }
    static async Insert(discordId) {
        return new Promise(async (resolve, reject) => {
            this.OnReady().then(() => {
                this.Exists(discordId)
                    .then(exists => {
                    if (exists === false) {
                        const data = { discord_id: discordId };
                        mongo_1.Mongo.Insert(data_helper_1.DataHelper.user, data).then(result => {
                            console.log(result.insertedId);
                            if (result.insertedId !== null &&
                                result.insertedId !== undefined) {
                                const user = new subscription_model_1.User();
                                user.Id = result.insertedId;
                                user.DiscordId = discordId;
                                this.UserList.push(user);
                            }
                            resolve(result.insertedId);
                        });
                    }
                    else {
                        reject(new Error(`DiscordId: "${discordId}" already exists.`));
                    }
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    static async Exists(discordId) {
        return new Promise((res, rej) => {
            this.OnReady().then(() => {
                const u = this.All.find(x => x.DiscordId === discordId);
                if (u === undefined || u === null) {
                    res(false);
                }
                else {
                    res(true);
                }
            });
        });
    }
    static async LogAll() {
        return new Promise((res, rej) => {
            this.OnReady().then(() => {
                if (this.All === undefined || this.All === null) {
                    rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
                }
                else {
                    this.All.forEach(user => {
                        console.log(user);
                    });
                    res();
                }
            });
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
//# sourceMappingURL=user.data.js.map