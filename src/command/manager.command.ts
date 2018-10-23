import { BotCommand } from "./bot.command";
import {
  help,
  dmhelp,
  when,
  dmwhen,
  whenmanga,
  dmwhenmanga,
  subscribe,
  mysubs,
  ping,
  dmping
} from "./commands";

export class CommandManager {
  private BotCommands: BotCommand[] = [];

  constructor() {
    console.log(`Constructed: "${CommandManager.name}"`);
  }

  public Init(): void {
    const commands = this.BotCommands;

    commands.push(help);
    commands.push(dmhelp);
    commands.push(when);
    commands.push(dmwhen);
    commands.push(whenmanga);
    commands.push(dmwhenmanga);
    commands.push(subscribe);
    commands.push(mysubs);
    commands.push(ping);
    commands.push(dmping);
  }

  public get Commands() {
    return this.BotCommands;
  }
}
