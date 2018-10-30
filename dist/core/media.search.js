"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anilist_1 = require("./anilist");
const json_helper_1 = require("../helpers/json.helper");
const root_model_1 = require("../models/root.model");
class MediaSearch {
    static async All(title) {
        return new Promise((resolve, reject) => {
            const result = anilist_1.Anilist.MediaSearch(title);
            let media = [];
            result
                .then($p => {
                media = json_helper_1.JsonHelper.Converter.deserialize($p, root_model_1.RootPage)
                    .DataPage.Page.media;
                if (media !== undefined && media !== null) {
                    resolve(media);
                }
                else {
                    reject(new Error(`"(JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page.media" is 'null' or 'undefined'.`));
                }
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async Find(id) {
        return new Promise((resolve, reject) => {
            const result = anilist_1.Anilist.MediaQuery(id);
            let media;
            result
                .then($m => {
                media = json_helper_1.JsonHelper.Converter.deserialize($m, root_model_1.RootMedia)
                    .DataMedia.Media;
                resolve(media);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.MediaSearch = MediaSearch;
//# sourceMappingURL=media.search.js.map