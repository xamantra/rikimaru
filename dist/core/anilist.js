"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const container_1 = require("./container");
class Anilist {
    constructor() {
        this.MediaVariables = container_1.Container.AnimeVariables;
        this.SearchVariables = container_1.Container.MediaVariables;
        console.log(`Constructed: "${Anilist.name}"`);
    }
    async MediaSearch(search, type) {
        const query = container_1.Container.GraphQL.SearchQL;
        const vars = this.SearchVariables;
        const variables = vars.Get(search, 1, 100, type);
        return await endeavor.queryAnilist({ query, variables });
    }
    async GetMedia(id, type) {
        const query = container_1.Container.GraphQL.AnimeQL;
        const vars = this.MediaVariables;
        const variables = vars.Get(id, type);
        return await endeavor.queryAnilist({ query, variables });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=anilist.js.map