"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const search_variables_1 = require("../graphql/variables/search.variables");
const graphql_1 = require("../graphql/graphql");
class Anilist {
    static async MediaSearch(search) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.SearchQL;
            const variables = search_variables_1.SearchVariables.Get(search, 1, 100, "ANIME");
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async MediaQuery(id) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.AnimeQL;
            const variables = search_variables_1.SearchVariables.Media(id);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=anilist.js.map