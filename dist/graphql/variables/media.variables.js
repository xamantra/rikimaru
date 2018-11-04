"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaVariables {
    static Get(id, page = 1, perPage = 100, type) {
        return {
            id: id,
            page: page,
            perPage: perPage,
            type: type
        };
    }
}
exports.MediaVariables = MediaVariables;
