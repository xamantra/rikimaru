import { MalBind } from "./mal.bind.model";
import { MalAnime } from "./mal.anime.model";
export class MalUser {
  constructor(public malSync: MalBind, public cwList: MalAnime[]) {}
}
