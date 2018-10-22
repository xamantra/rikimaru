import endeavor = require("endeavor");
import { MediaVariables } from "./../graphql/variables/media.variables";
import { AnimeVariables } from "./../graphql/variables/anime.variables";
import { Container } from "./container";

export class Anilist {
  private AnimeVariables: AnimeVariables;
  private MediaVariables: MediaVariables;
  constructor() {
    this.AnimeVariables = Container.AnimeVariables;
    this.MediaVariables = Container.MediaVariables;
    console.log(`Constructed: "${Anilist.name}"`);
  }

  public async MediaSearch(search: string, type: string): Promise<object> {
    const query: string = Container.GraphQL.MediaQL;
    const vars: MediaVariables = this.MediaVariables;
    const variables: any = vars.Get(search, 1, 100, type);
    return await endeavor.queryAnilist({ query, variables });
  }

  public async GetAnime(id: number): Promise<object> {
    const query: string = Container.GraphQL.AnimeQL;
    const vars: AnimeVariables = this.AnimeVariables;
    const variables: any = vars.Get(id);
    return await endeavor.queryAnilist({ query, variables });
  }
}
