import endeavor = require("endeavor");
import { AnimeVariables } from "../graphql/variables/anime.variables";
import { MediaVariables } from "../graphql/variables/media.variables";
import { Container } from "./container";

export class Anilist {
  constructor() {
    console.log("Anilist is ready!");
  }

  public async MediaSearch(search: string, type: string): Promise<object> {
    const query: string = Container.GraphQL.MediaQL;
    const variables: any = MediaVariables.Get(search, 1, 100, type);
    return await endeavor.queryAnilist({ query, variables });
  }

  public async GetAnime(id: number): Promise<object> {
    const query: string = Container.GraphQL.AnimeQL;
    const variables: any = AnimeVariables.Get(id);
    return await endeavor.queryAnilist({ query, variables });
  }
}
