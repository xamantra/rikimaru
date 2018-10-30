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
        return new Promise(async (res, rej) => {
            mongo_1.Mongo.FindAll(data_helper_1.DataHelper.user).then(async (result) => {
                const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
                let iteration = 1;
                if (users !== undefined && users !== null) {
                    users.forEach(user => {
                        this.UserList.push(user);
                        console.log(`user....`);
                        console.log(user);
                        if (iteration === users.length) {
                            res();
                        }
                        else {
                            iteration++;
                        }
                    });
                }
                else {
                    rej(new Error(`"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`));
                }
            });
        });
    }
    static async GetUser(discordId) {
        return new Promise((res, rej) => {
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
        return new Promise((res, rej) => {
            const user = this.All.find(x => x.Id === id);
            if (user !== null && user !== undefined) {
                res(user);
            }
            else {
                rej(new Error(`"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`));
            }
        });
    }
    static async Insert(discordId) {
        return new Promise(async (resolve, reject) => {
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
    }
    static async Exists(discordId) {
        return new Promise((res, rej) => {
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
        return new Promise((res, rej) => {
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
    }
}
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map