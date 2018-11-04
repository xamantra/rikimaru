"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
class MediaFormatHandler {
    static Get(media) {
        const format = {
            name: `**${title_helper_1.TitleHelper.Get(media.title)}**`,
            value: `[MyAnimeList](https://myanimelist.net/anime/${media.idMal}/)\nStatus:  *${media.status}*\n▬▬▬▬▬▬▬▬▬▬  :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:   ▬▬▬▬▬▬▬▬▬▬`
        };
        return format;
    }
}
exports.MediaFormatHandler = MediaFormatHandler;
