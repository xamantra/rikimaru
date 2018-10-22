"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchVariables {
    constructor() {
        console.log(`Constructed: "${SearchVariables.name}"`);
    }
    Get(search, page = 1, perPage = 100, type) {
        return {
            search: search,
            page: page,
            perPage: perPage,
            type: type
        };
    }
}
exports.SearchVariables = SearchVariables;
//# sourceMappingURL=search.variables.js.map