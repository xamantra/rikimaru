"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TitleHelper {
    static Get(title) {
        if (title.english !== null) {
            return title.english;
        }
        else if (title.romaji !== null) {
            return title.romaji;
        }
        else {
            return title.native;
        }
    }
    static Match(title, search) {
        if (title.english !== null &&
            title.english.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else if (title.romaji !== null &&
            title.romaji.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else if (title.native !== null &&
            title.native.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.TitleHelper = TitleHelper;
//# sourceMappingURL=title.helper.js.map