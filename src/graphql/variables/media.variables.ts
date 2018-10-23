export class MediaVariables {
  public static Get(
    id: number,
    page: number = 1,
    perPage: number = 100,
    type: string
  ) {
    return {
      id: id,
      page: page,
      perPage: perPage,
      type: type
    };
  }
}
