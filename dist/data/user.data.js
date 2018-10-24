"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const query_1 = require("../core/query");
const result_mysql_model_1 = require("../models/result.mysql.model");
class UserData {
    static Init() {
        query_1.Query.Execute(data_helper_1.DataHelper.UserSelectAll(), async (result) => {
            const users = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User);
            await users.forEach(async (user) => {
                await this.UserList.push(user);
            });
            await console.log(`User List: ${this.UserList}`);
        });
    }
    static GetUser(discordId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.UserSelect(discordId), async (result) => {
            try {
                const user = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User)[0];
                if (user !== null && user !== undefined) {
                    await callback(user, false);
                }
            }
            catch (error) {
                await callback(null, true);
            }
        });
    }
    static Insert(discordId, callback = null) {
        this.Exists(discordId, async (exists) => {
            if (exists === false) {
                await query_1.Query.Execute(data_helper_1.DataHelper.UserInsert(discordId), async (result) => {
                    try {
                        const res = await json_helper_1.JsonHelper.Convert(result, result_mysql_model_1.MySqlResult);
                        if (res !== null &&
                            res !== undefined &&
                            res.InsertId !== null &&
                            res.InsertId !== undefined) {
                            const user = new subscription_model_1.User();
                            user.Id = res.InsertId;
                            user.DiscordId = discordId;
                            await this.UserList.push(user);
                            if (callback !== null)
                                await callback(res.InsertId);
                        }
                    }
                    catch (error) {
                        await console.log(error);
                    }
                });
            }
        });
    }
    static get All() {
        return this.UserList;
    }
    static Exists(discordId, callback) {
        query_1.Query.Execute(data_helper_1.DataHelper.UserSelect(discordId), async (result) => {
            const user = await json_helper_1.JsonHelper.ArrayConvert(result, subscription_model_1.User)[0];
            if (user === undefined || user === null) {
                await callback(false);
            }
            else {
                await callback(true);
            }
        });
    }
    static LogAll() {
        this.All.forEach(async (user) => {
            await console.log(user);
        });
    }
}
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map