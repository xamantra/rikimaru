"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./../core/container");
class MediaHandler {
    constructor() {
        this.TitleHelper = container_1.Container.TitleHelper;
        console.log(`Constructed: ${MediaHandler.name}`);
    }
    ExactMedia(mediaList, search) {
        const title = this.TitleHelper;
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (title.Match(m.title, search)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    OngoingMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "RELEASING" && m.nextAiringEpisode !== null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    UnreleasedMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode !== null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    UnreleasedNoDateMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode === null) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    CompletedMedia(mediaList) {
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