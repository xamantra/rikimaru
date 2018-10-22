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

  public async MediaSearch(search: string, type: string): Promise<object> {
    const query: string = Container.GraphQL.SearchQL;
    const vars: SearchVariables = this.SearchVariables;
    const variables: any = vars.Get(search, 1, 100, type);
    return await endeavor.queryAnilist({ query, variables });
  }

  public async GetMedia(id: number, type: string): Promise<object> {
    const query: string = Container.GraphQL.AnimeQL;
    const vars: MediaVariables = this.MediaVariables;
    const variables: any = vars.Get(id, type);
    return await endeavor.queryAnilist({ query, variables });
  }
}
