"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const anime_variables_1 = require("../graphql/variables/anime.variables");
const media_variables_1 = require("../graphql/variables/media.variables");
const container_1 = require("./container");
class Anilist {
    constructor() {
        console.log("Anilist is ready!");
    }
    async MediaSearch(search, type) {
        const query = container_1.Container.GraphQL.MediaQL;
        const variables = media_variables_1.MediaVariables.Get(search, 1, 100, type);
        return await endeavor.queryAnilist({ query, variables });
    }
    async GetAnime(id) {
        const query = container_1.Container.GraphQL.AnimeQL;
        const variables = anime_variables_1.AnimeVariables.Get(id);
        return await endeavor.queryAnilist({ query, variables });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=anilist.js.map