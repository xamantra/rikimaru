"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const query_1 = require("../core/query");
const result_mysql_model_1 = require("../models/result.mysql.model");
class UserData {
    constructor() {
        this.UserList = [];
        this.DataHelper = data_helper_1.DataHelper.Instance;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get All() {
        return this.UserList;
    }
    async Init() {
        return new Promise((res, rej) => {
            query_1.Query.Execute(this.DataHelper.UserSelectAll(), async (result) => {
                const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
                if (users !== undefined && users !== null) {
                    await users.forEach(user => {
                        this.UserList.push(user);
                    });
                    res();
                }
                else {
                    rej(new Error(`"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`));
                }
            });
        });
    }
    async GetUser(discordId) {
        return new Promise(async (res, rej) => {
            const user = await this.All.find(x => x.DiscordId === discordId);
            if (user !== null && user !== undefined) {
                res(user);
            }
            else {
                rej(new Error(`"this.All.find(x => x.DiscordId === discordId)" is 'null' or 'undefined'.`));
            }
        });
    }
    async Insert(discordId) {
        return new Promise((res, rej) => {
            this.Exists(discordId).then(exists => {
                if (exists === false) {
                    query_1.Query.Execute(this.DataHelper.UserInsert(discordId), async (result) => {
                        try {
                            const myRes = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                            if (myRes !== null &&
                                myRes !== undefined &&
                                myRes.InsertId !== null &&
                                myRes.InsertId !== undefined) {
                                const user = new subscription_model_1.User();
                                user.Id = myRes.InsertId;
                                user.DiscordId = discordId;
                                await this.UserList.push(user);
                            }
                            res(myRes.InsertId);
                        }
                        catch (error) {
                            rej(new Error(`Unknown error occured.`));
                        }
                    });
                }
                else {
                    rej(new Error(`DiscordId: "${discordId}" already exists.`));
                }
            });
        });
    }
    async Exists(discordId) {
        return new Promise(async (res, rej) => {
            const u = await this.All.find(x => x.DiscordId === discordId);
            if (u === undefined || u === null) {
                res(false);
            }
            else {
                res(true);
            }
        });
    }
    async LogAll() {
        return new Promise(async (res, rej) => {
            if (this.All === undefined || this.All === null) {
                rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
            }
            else {
                await this.All.forEach(user => {
                    console.log(`User:`, user);
                });
                res();
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map