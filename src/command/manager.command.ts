import { BotCommand } from "./bot.command";
import {
  help,
  dmhelp,
  when,
  dmwhen,
  subscribe,
  viewsubs,
  ping,
  dmping,
  logall,
  dmmysubs,
  unsub
} from "./commands";

export class CommandManager {
  private static BotCommands: BotCommand[] = [];

  public static Init(): void {
    const cmds: BotCommand[] = [];

    cmds.push(help);
    cmds.push(dmhelp);
    cmds.push(when);
    cmds.push(dmwhen);
    cmds.push(subscribe);
    cmds.push(viewsubs);
    cmds.push(dmmysubs);
    cmds.push(unsub);
    cmds.push(ping);
    cmds.push(dmping);
    cmds.push(logall);

    this.BotCommands = cmds;
  }

  public static get Commands() {
    return this.BotCommands;
  }
}
