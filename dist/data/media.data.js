"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_status_1 = require("./../core/media.status");
const media_search_1 = require("./../core/media.search");
const json_helper_1 = require("../helpers/json.helper");
const data_helper_1 = require("../helpers/data.helper");
const subscription_model_1 = require("../models/subscription.model");
class MediaData {
    static Init() {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.each(`SELECT * FROM media`, (err, row) => {
                if (row !== null) {
                    try {
                        const media = converter.deserialize(row, subscription_model_1.Media);
                        this.LocalList.push(media);
                    }
                    catch (error) {
                        console.log(err);
                    }
                }
            });
        });
    }
    static LoadFromApi() {
        console.log("Loading from api...");
        this.LocalList.forEach(async (m) => {
            media_search_1.MediaSearch.All(m.Title, (res) => {
                res.forEach($m => {
                    if (media_status_1.MediaStatus.Ongoing($m) || media_status_1.MediaStatus.NotYetAired($m)) {
                        this.MediaList.push($m);
                        console.log($m.idMal);
                    }
                });
            });
        });
    }
    static Add(mal_id, title) {
        const db = data_helper_1.DataHelper.DB;
        const converter = json_helper_1.JsonHelper.Converter;
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO media (mal_id, title) VALUES(${mal_id}, '${title}')`, (result, err) => {
                if (err !== undefined) {
                    console.log(err.message);
                }
                else {
                    db.each(`SELECT * FROM media WHERE mal_id=${mal_id}`, (e, row) => {
                        this.LocalList.push(converter.deserialize(row, subscription_model_1.Media));
                        const oldMedia = this.MediaList.find(x => x.idMal === mal_id);
                        if (oldMedia === null || oldMedia === undefined) {
                            media_search_1.MediaSearch.All(title, (res) => {
                                res.forEach($m => {
                                    if (media_status_1.MediaStatus.Ongoing($m) ||
                                        media_status_1.MediaStatus.NotYetAired($m)) {
                                        this.MediaList.push($m);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });
    }
    static LogAll() {
        this.LocalList.forEach(m => {
            console.log(m.Title);
        });
        this.MediaList.forEach(m => {
            console.log(m.idMal);
        });
    }
    static get GetLocalList() {
        return this.LocalList;
    }
    static get GetMediaList() {
        return this.MediaList;
    }
    static Exist(malId) {
        let e = false;
        this.LocalList.forEach(media => {
            if (media.MalId === malId) {
                e = true;
            }
        });
        return e;
    }
}
MediaData.LocalList = [];
MediaData.MediaList = [];
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map