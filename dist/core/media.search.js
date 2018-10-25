"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anilist_1 = require("./anilist");
const json_helper_1 = require("../helpers/json.helper");
const root_model_1 = require("../models/root.model");
class MediaSearch {
    static async All(title) {
        return new Promise((resolve, reject) => {
            const result = anilist_1.Anilist.MediaQuery(title);
            let media = [];
            result.then(async (root) => {
                media = json_helper_1.JsonHelper.Converter.deserialize(root, root_model_1.Root).Data.Page
                    .media;
                if (media !== undefined && media !== null && media.length > 0) {
                    resolve(media);
                }
                else {
                    reject(new Error(`"(JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page.media" is 'null' or 'undefined'.`));
                }
            });
        });
    }
}
exports.MediaSearch = MediaSearch;
//# sourceMappingURL=media.search.js.map