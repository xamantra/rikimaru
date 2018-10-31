import { ICommandExample } from "../../interfaces/command.example.interface";
import { ICommand } from "../../interfaces/command.interface";
import { Randomizer } from "../../helpers/random.helper";

export class MalSyncExample implements ICommandExample {
  Count: number;
  Usernames: string[];

  constructor(count: number) {
    this.Count = count;
    this.Usernames = ["thisisausername", "anotherusername", "malusername"];
  }

  Get(command: ICommand, count: number): string {
    let result = ``;
    const picked: string[] = [];
    for (let i = 0; i < this.Usernames.length; i++) {
      const item: string = this.Usernames[
        Randomizer.randomInt(0, this.Usernames.length - 1)
      ];
      if (!picked.includes(item) && picked.length < count) {
        result += `\n-*${command.Name}* ${item}`;
        picked.push(item);
      }
      if (picked.length === count) {
        return result;
      }
    }
    return result;
  }
}
