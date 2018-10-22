"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("./../helpers/title.helper");
class MediaHandler {
    static ExactMedia(mediaList, search) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (title_helper_1.TitleHelper.Match(m.title, search)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static OngoingMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "RELEASING" && m.nextAiringEpisode !== null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static UnreleasedMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode !== null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static UnreleasedNoDateMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode === null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static CompletedMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "FINISHED") {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
}
exports.MediaHandler = MediaHandler;
//# sourceMappingURL=media.handler.js.map