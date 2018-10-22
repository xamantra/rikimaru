export class MediaVariables {
  constructor() {
    console.log(`Constructed: "${MediaVariables.name}"`);
  }

  public Get(
    search: string,
    page: number = 1,
    perPage: number = 100,
    type: string
  ): Object {
    return {
      search: search,
      page: page,
      perPage: perPage,
      type: type
    };
  }
}
