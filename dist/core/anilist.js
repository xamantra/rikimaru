"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const container_1 = require("./container");
class Anilist {
    constructor() {
        this.AnimeVariables = container_1.Container.AnimeVariables;
        this.MediaVariables = container_1.Container.MediaVariables;
        console.log(`Constructed: "${Anilist.name}"`);
    }
    async MediaSearch(search, type) {
        const query = container_1.Container.GraphQL.MediaQL;
        const vars = this.MediaVariables;
        const variables = vars.Get(search, 1, 100, type);
        return await endeavor.queryAnilist({ query, variables });
    }
    async GetAnime(id) {
        const query = container_1.Container.GraphQL.AnimeQL;
        const vars = this.AnimeVariables;
        const variables = vars.Get(id);
        return await endeavor.queryAnilist({ query, variables });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=anilist.js.map