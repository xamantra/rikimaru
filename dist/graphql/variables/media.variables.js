"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaVariables {
    static Get(search, page = 1, perPage = 100, type) {
        return {
            search: search,
            page: page,
            perPage: perPage,
            type: type
        };
    }
}
exports.MediaVariables = MediaVariables;
//# sourceMappingURL=media.variables.js.map