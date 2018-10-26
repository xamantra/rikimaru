import { MediaType } from "./../../core/enums";

export class SearchVariables {
  public static Get(
    search: string,
    page: number = 1,
    perPage: number = 100,
    type: string
  ) {
    return {
      search: search,
      page: page,
      perPage: perPage,
      type: type
    };
  }

  public static Media(id: number) {
    return { id: id };
  }
}
