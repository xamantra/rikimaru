"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaStatus {
    static Ongoing($m) {
        if ($m.status === "RELEASING" &&
            $m.nextAiringEpisode !== null &&
            $m.nextAiringEpisode.airingAt !== null) {
            return true;
        }
        return false;
    }
    static NotYetAired($m) {
        if ($m.status === "NOT_YET_RELEASED" &&
            $m.nextAiringEpisode !== null &&
            $m.nextAiringEpisode.airingAt !== null) {
            return true;
        }
        return false;
    }
    static NotYetAiredNoDate($m) {
        if ($m.status === "NOT_YET_RELEASED" && $m.nextAiringEpisode === null) {
            return true;
        }
        return false;
    }
    static Completed($m) {
        if ($m.status === "FINISHED") {
            return true;
        }
        return false;
    }
}
exports.MediaStatus = MediaStatus;
