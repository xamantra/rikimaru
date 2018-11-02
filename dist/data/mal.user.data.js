"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_1 = require("../core/mal");
const mal_bind_data_1 = require("./mal.bind.data");
class MalUserData {
    static GetUser(message) {
        return new Promise((resolve, reject) => {
            mal_bind_data_1.MalBindData.Get(message.author.id)
                .then(malBind => {
                mal_1.MAL.AnimeList(malBind.MalUsername)
                    .then(list => {
                    resolve(list);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    static Exists(message, sub) {
        return new Promise((resolve, reject) => {
            this.GetUser(message)
                .then(list => {
                const malAnime = list.find(ma => ma.anime_id === sub.MediaId);
                if (malAnime === null || malAnime === undefined) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.MalUserData = MalUserData;
//# sourceMappingURL=mal.user.data.js.map