"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_user_model_1 = require("../models/mal.user.model");
const mal_1 = require("../core/mal");
const mal_bind_data_1 = require("./mal.bind.data");
class MalUserData {
    static Init() {
        this.OnReady().then(() => {
            this.Initializing = true;
            mal_bind_data_1.MalBindData.All.forEach(mb => {
                this.GetUserList(mb.MalUsername).then(list => {
                    const malUser = new mal_user_model_1.MalUser(mb, list);
                    this.List.push(malUser);
                });
            });
        });
    }
    static GetUserList(username) {
        return new Promise((resolve, reject) => {
            mal_1.MAL.AnimeList(username)
                .then(list => {
                resolve(list);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    static get All() {
        return this.List;
    }
    static LogAll() {
        return new Promise((resolve, reject) => {
            console.log(this.List);
            resolve();
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
MalUserData.Initializing = false;
MalUserData.List = [];
exports.MalUserData = MalUserData;
//# sourceMappingURL=mal.list.data.js.map