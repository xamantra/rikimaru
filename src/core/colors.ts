import { Randomizer } from "../helpers/random.helper";

export class Color {
  private List: number[];

  constructor() {
    this.List = [
      3556083,
      6430440,
      11478939,
      11942502,
      11817022,
      15897889,
      15968259,
      13875968,
      8885504,
      5221963,
      4833930,
      3791820,
      3926782,
      508158,
      38910,
      2250494
    ];
    console.log(`Constructed: "${Color.name}"`);
  }

  public get Random(): number {
    const list: number[] = this.List;
    return list[Randomizer.randomInt(0, list.length - 1)];
  }
}
