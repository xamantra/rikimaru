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
    static GetUser(discordId) {
        let u;
        if (this.UserList.length === 0) {
            u = new subscription_model_1.User();
            u.Id = 1;
            u.DiscordId = discordId;
        }
        else {
            this.UserList.forEach(user => {
                if (user.DiscordId === discordId) {
                    u = user;
                }
            });
        }
        return u;
    }
    static Add(discordId) {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO user (discord_id) VALUES('${discordId}')`, (result, err) => {
                if (err !== undefined) {
                    console.log(err);
                }
                else {
                    db.each(`SELECT * FROM user WHERE discord_id='${discordId}'`, (e, row) => {
                        this.UserList.push(converter.deserialize(row, subscription_model_1.User));
                    });
                }
            });
        });
    }
    static get All() {
        return this.UserList;
    }
    static Exists(id) {
        let e = false;
        this.UserList.forEach(async (user) => {
            if (user.DiscordId === id) {
                e = true;
            }
        });
        return e;
    }
    static LogAll() {
        this.All.forEach(user => {
            console.log(user);
        });
    }
}
UserData.UserList = [];
exports.UserData = UserData;
//# sourceMappingURL=user.data.js.map