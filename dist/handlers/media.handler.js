"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("./../helpers/title.helper");
const media_status_1 = require("./../core/media.status");
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
            if (media_status_1.MediaStatus.Ongoing(m)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static UnreleasedMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (media_status_1.MediaStatus.NotYetAired(m)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static UnreleasedNoDateMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (media_status_1.MediaStatus.NotYetAiredNoDate(m)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
    static CompletedMedia(mediaList) {
        const filteredMedia = [];
        mediaList.forEach(m => {
            if (media_status_1.MediaStatus.Completed(m)) {
                filteredMedia.push(m);
            }
        });
        return filteredMedia;
    }
}
exports.MediaHandler = MediaHandler;
