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
            await this.OnReady();
            this.Initializing = true;
            const result = await mongo_1.Mongo.FindAll(data_helper_1.DataHelper.user);
            const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
            let iteration = 1;
            if (users !== undefined && users !== null) {
                if (users.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                users.forEach(user => {
                    this.UserList.push(user);
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
                const result = await mongo_1.Mongo.Insert(data_helper_1.DataHelper.user, data);
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
