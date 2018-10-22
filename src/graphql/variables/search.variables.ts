export class SearchVariables {
  constructor() {
    console.log(`Constructed: "${SearchVariables.name}"`);
  }

  public Get(
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
}
