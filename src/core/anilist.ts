import endeavor = require("endeavor");
import { SearchVariables } from "../graphql/variables/search.variables";
import { MediaVariables } from "../graphql/variables/media.variables";
import { Container } from "./container";

export class Anilist {
  private MediaVariables: MediaVariables;
  private SearchVariables: SearchVariables;
  constructor() {
    this.MediaVariables = Container.AnimeVariables;
    this.SearchVariables = Container.MediaVariables;
    console.log(`Constructed: "${Anilist.name}"`);
  }

  public async MediaSearch(search: string, type: string) {
    const query = Container.GraphQL.SearchQL;
    const vars = this.SearchVariables;
    const variables = vars.Get(search, 1, 100, type);
    return await endeavor.queryAnilist({ query, variables });
  }

  public async GetMedia(id: number, type: string) {
    const query = Container.GraphQL.AnimeQL;
    const vars = this.MediaVariables;
    const variables = vars.Get(id, type);
    return await endeavor.queryAnilist({ query, variables });
  }
}
