import { ICommandExample } from "../../interfaces/command.example.interface";
import { ICommand } from "../../interfaces/command.interface";
import { Random } from "../../helpers/random.helper";
import { Config } from "../../core/config";

export class AniBindExample implements ICommandExample {
  Count: number;
  Usernames: string[];

  constructor(count: number) {
    this.Count = count;
    this.Usernames = ["thisisausername", "anotherusername", "anilistusername"];
  }

  Get(command: ICommand, count: number): string {
    let result = ``;
    const picked: string[] = [];
    for (let i = 0; i < this.Usernames.length; i++) {
      const item: string = this.Usernames[
        Random.Range(0, this.Usernames.length - 1)
      ];
      if (!picked.includes(item) && picked.length < count) {
        result += `\n${Config.COMMAND_PREFIX}*${command.Name}* ${item}`;
        picked.push(item);
      }
      if (picked.length === count) {
        return result;
      }
    }
    return result;
  }
}
