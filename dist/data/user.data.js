"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../models/subscription.model");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
class UserData {
    static Init() {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.each(`SELECT * FROM user`, (err, row) => {
                if (row !== null) {
                    try {
                        const user = converter.deserialize(row, subscription_model_1.User);
                        this.UserList.push(user);
                        console.log(user);
                    }
                    catch (error) {
                        console.log(err);
                    }
                }
            });
        });
    }
    static Add(discordId) {
        const db = data_helper_1.DataHelper.DB;
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO user (discord_id) VALUES("${discordId}")`, (result, err) => {
                if (err.message !== null) {
                    console.log(err);
                }
            });
        });
    }
    static get All() {
        return this.UserList;
    }
}
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map