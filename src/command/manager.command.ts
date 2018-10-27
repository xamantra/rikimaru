import { BotCommand } from "./bot.command";
import {
  help,
  dmhelp,
  when,
  dmwhen,
  sub,
  viewsubs,
  ping,
  dmping,
  logall,
  unsub,
  dmsub,
  dmviewsubs,
  dmunsub
} from "./commands";

export class CommandManager {
  private static BotCommands: BotCommand[] = [];

  public static Init(): void {
    const cmds: BotCommand[] = [];

    cmds.push(help);
    cmds.push(dmhelp);
    cmds.push(when);
    cmds.push(dmwhen);
    cmds.push(sub);
    cmds.push(dmsub);
    cmds.push(viewsubs);
    cmds.push(dmviewsubs);
    cmds.push(unsub);
    cmds.push(dmunsub);
    cmds.push(ping);
    cmds.push(dmping);
    cmds.push(logall);

    this.BotCommands = cmds;
  }

  public static get Commands() {
    return this.BotCommands;
  }
}
