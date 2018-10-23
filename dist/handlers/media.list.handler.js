"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
class MediaFormatHandler {
    static Get(media) {
        const format = {
            name: `***${title_helper_1.TitleHelper.Get(media.title)}***`,
            // tslint:disable-next-line:max-line-length
            value: `**Status:**  *${media.status}*\n***[MAL Link](https://myanimelist.net/anime/${media.idMal}/)***`
        };
        return format;
    }
}
exports.MediaFormatHandler = MediaFormatHandler;
//# sourceMappingURL=media.list.handler.js.map