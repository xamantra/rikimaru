import { Randomizer } from "../helpers/random.helper";

export class Color {
  private static List: number[] = [
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

  public static get Random(): number {
    return Color.List[Randomizer.randomInt(0, Color.List.length - 1)];
  }
}
