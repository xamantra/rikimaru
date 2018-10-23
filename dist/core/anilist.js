"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const search_variables_1 = require("../graphql/variables/search.variables");
const graphql_1 = require("../graphql/graphql");
class Anilist {
    static async MediaQuery(search) {
        const query = graphql_1.GraphQL.SearchQL;
        const variables = search_variables_1.SearchVariables.Get(search, 1, 100, "ANIME");
        return await endeavor.queryAnilist({ query, variables });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=anilist.js.map