export class AnimeVariables {
  constructor() {
    console.log(`Constructed: "${AnimeVariables.name}"`);
  }

  public Get(id: number): Object {
    return {
      id: id
    };
  }
}
