"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const query_1 = require("../core/query");
const result_mysql_model_1 = require("../models/result.mysql.model");
class UserData {
    static get All() {
        return this.UserList;
    }
    static async Init() {
        return new Promise((res, rej) => {
            query_1.Query.Execute(this.DataHelper.UserSelectAll(), result => {
                const users = json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
                if (users !== undefined && users !== null) {
                    users.forEach(user => {
                        this.UserList.push(user);
                    });
                    console.log(`User List: ${this.UserList.length}`);
                    res();
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
    static async Insert(discordId) {
        return new Promise((res, rej) => {
            this.Exists(discordId).then(exists => {
                if (exists === false) {
                    query_1.Query.Execute(this.DataHelper.UserInsert(discordId), result => {
                        try {
                            const myRes = json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                            if (myRes !== null &&
                                myRes !== undefined &&
                                myRes.InsertId !== null &&
                                myRes.InsertId !== undefined) {
                                const user = new subscription_model_1.User();
                                user.Id = myRes.InsertId;
                                user.DiscordId = discordId;
                                this.UserList.push(user);
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
                    console.log(`User:`, user);
                });
                res();
            }
        });
    }
}
UserData.UserList = [];
UserData.DataHelper = data_helper_1.DataHelper.Instance;
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map