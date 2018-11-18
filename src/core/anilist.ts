import endeavor = require("endeavor");
import { SearchVariables } from "../graphql/variables/search.variables";
import { GraphQL } from "../graphql/graphql";

export class Anilist {
  public static async MediaSearch(search: string) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.SearchQL;
      const variables = SearchVariables.Get(search, 1, 100, "ANIME");
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

  public static async MediaQuery(id: number) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.AnimeQL;
      const variables = SearchVariables.Media(id);
      endeavor
        .queryAnilist({ query, variables })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}
