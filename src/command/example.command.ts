import { Command } from "../models/command.model";
import { Randomizer } from "./../helpers/random.helper";

export class ExampleCommand {
  private media: string[] = [];

  constructor() {
    this.media = [
      "one piece",
      "code geass",
      "sao",
      "danmachi",
      "re zero",
      "dororo",
      "boarding juliet",
      "reincarnated as slime",
      "bunny girl senpai",
      "irozuku sekai",
      "kekkai sensen",
      "boruto",
      "merc storia",
      "gridman",
      "tokyo ghoul",
      "franxx",
      "akame ga kill",
      "asobi asobase",
      "goblin slayer"
    ];
  }

  public MediaExample(command: Command, count: number): string {
    let result: string = ``;
    const picked: string[] = [];
    for (let i: number = 0; i < this.media.length; i++) {
      const item: string = this.media[
        Randomizer.randomInt(0, this.media.length - 1)
      ];
      if (!picked.includes(item) && picked.length < count) {
        result += `\n-*${command.Name}* ${item}`;
        picked.push(item);
      } else if (picked.length === count) {
        return result;
      }
    }
    return result;
  }
}
