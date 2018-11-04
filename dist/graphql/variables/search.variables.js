"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchVariables {
    static Get(search, page = 1, perPage = 100, type) {
        return {
            search: search,
            page: page,
            perPage: perPage,
            type: type
        };
    }
    static Media(id) {
        return { id: id };
    }
}
exports.SearchVariables = SearchVariables;
