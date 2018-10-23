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
    const cmds: BotCommand[] = [];

    cmds.push(help);
    cmds.push(dmhelp);
    cmds.push(when);
    cmds.push(dmwhen);
    cmds.push(whenmanga);
    cmds.push(dmwhenmanga);
    cmds.push(subscribe);
    cmds.push(mysubs);
    cmds.push(ping);
    cmds.push(dmping);

    this.BotCommands = cmds;
  }

  public get Commands() {
    return this.BotCommands;
  }
}
