"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                        this.MediaList.push(media);
                        console.log(media);
                    }
                    catch (error) {
                        console.log(err);
                    }
                }
            });
        });
    }
    static Add(mal_id, title, nextAiringEp, timeUntilAiring) {
        const db = data_helper_1.DataHelper.DB;
        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO media (mal_id, title, next_episode, next_schedule) VALUES(${mal_id}, "${title}", ${nextAiringEp}, ${timeUntilAiring})`, (result, err) => {
                if (err.message !== null) {
                    console.log(err.message);
                }
            });
        });
    }
    static get All() {
        return this.MediaList;
    }
}
MediaData.MediaList = [];
exports.MediaData = MediaData;
//# sourceMappingURL=media.data.js.map