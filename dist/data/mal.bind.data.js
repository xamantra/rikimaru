"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../core/mongo");
const data_helper_1 = require("../helpers/data.helper");
const mal_bind_model_1 = require("../models/mal.bind.model");
const json_helper_1 = require("../helpers/json.helper");
const array_helper_1 = require("../helpers/array.helper");
class MalBindData {
    static Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const results = await mongo_1.Mongo.FindAll(data_helper_1.DataHelper.malsync);
            const list = await json_helper_1.JsonHelper.ArrayConvert(results, mal_bind_model_1.MalBind);
            if (list === undefined || list === null) {
                this.Initializing = false;
                reject(new Error(`JsonHelper.ArrayConvert<MalSync>(results, MalSync) is 'null' or 'undefined'.`));
            }
            else {
                if (list.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                else {
                    for (let i = 0; i < list.length; i++) {
                        const malBind = list[i];
                        this.List.push(malBind);
                        if (i === list.length - 1) {
                            this.Initializing = false;
                            resolve();
                        }
                    }
                }
            }
        });
    }
    static Insert(discordId, malUsername, code) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId);
            if (exists === false) {
                const data = {
                    discord_id: discordId,
                    mal_username: malUsername,
                    code: code,
                    verified: false
                };
                const result = await mongo_1.Mongo.Insert(data_helper_1.DataHelper.malsync, data);
                console.log(result.insertedId);
                const malsync = new mal_bind_model_1.MalBind();
                malsync.Id = result.insertedId;
                malsync.DiscordId = discordId;
                malsync.MalUsername = malUsername;
                malsync.Code = code;
                malsync.Verified = false;
                this.List.push(malsync);
                resolve(malsync);
            }
            else {
                resolve(this.All.find(x => x.DiscordId === discordId));
            }
        });
    }
    static get All() {
        return this.List;
    }
    static Verify(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const query = { discord_id: discordId };
            const newValue = { $set: { verified: true } };
            await mongo_1.Mongo.Update(data_helper_1.DataHelper.malsync, query, newValue);
            const oldValue = await this.Get(discordId);
            array_helper_1.ArrayHelper.remove(this.List, oldValue, async () => {
                const res = await mongo_1.Mongo.FindOne(data_helper_1.DataHelper.malsync, query);
                const ms = await json_helper_1.JsonHelper.ArrayConvert(res, mal_bind_model_1.MalBind);
                const m = ms[0];
                console.log(`Update MAL bind: ${m.Code}`);
                if (m !== null && m !== undefined) {
                    this.List.push(m);
                    resolve(m);
                }
                else {
                    reject(new Error(`JsonHelper.Convert<MalSync>(res, MalSync) is 'null' or 'undefined'.`));
                }
            });
        });
    }
    static Exists(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const malsync = this.List.find(m => m.DiscordId === discordId);
            if (malsync === null || malsync === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static Get(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            let iteration = 0;
            if (this.List.length === 0) {
                reject(new Error(`List is empty.`));
            }
            this.List.forEach(m => {
                iteration++;
                if (m.DiscordId === discordId) {
                    resolve(m);
                }
                else {
                    if (iteration === this.List.length) {
                        reject(new Error(`this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`));
                    }
                }
            });
        });
    }
    static LogAll() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            if (this.List === null ||
                this.List === undefined ||
                this.List.length === 0) {
                reject(new Error(`this.List is 'null' or 'empty'.`));
            }
            else {
                console.log(this.List);
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
MalBindData.List = [];
MalBindData.Initializing = false;
exports.MalBindData = MalBindData;
