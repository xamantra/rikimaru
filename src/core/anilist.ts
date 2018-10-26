import endeavor = require("endeavor");
import { SearchVariables } from "../graphql/variables/search.variables";
import { GraphQL } from "../graphql/graphql";

export class Anilist {
  public static async MediaSearch(search: string) {
    const query = GraphQL.SearchQL;
    const variables = SearchVariables.Get(search, 1, 100, "ANIME");
    return await endeavor.queryAnilist({ query, variables });
  }

  public static async MediaQuery(id: number) {
    const query = GraphQL.AnimeQL;
    const variables = SearchVariables.Media(id);
    return await endeavor.queryAnilist({ query, variables });
  }
}
