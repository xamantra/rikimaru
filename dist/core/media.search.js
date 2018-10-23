"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anilist_1 = require("./anilist");
const json_helper_1 = require("../helpers/json.helper");
const root_model_1 = require("../models/root.model");
class MediaSearch {
    static All(title, callback) {
        const result = anilist_1.Anilist.MediaQuery(title);
        let media = [];
        result.then(async (root) => {
            media = await json_helper_1.JsonHelper.Converter.deserialize(root, root_model_1.Root).Data
                .Page.media;
            callback(media);
        });
    }
}
exports.MediaSearch = MediaSearch;
//# sourceMappingURL=media.search.js.map