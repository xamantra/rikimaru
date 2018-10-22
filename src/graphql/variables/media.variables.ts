export class MediaVariables {
  constructor() {
    console.log(`Constructed: "${MediaVariables.name}"`);
  }

  public Get(id: number, type: string) {
    return {
      id: id,
      type: type
    };
  }
}
