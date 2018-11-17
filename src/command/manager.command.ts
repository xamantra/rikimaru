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
import { ICommand } from "../interfaces/command.interface";
import { malbind, malsync } from "./commands";

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
    cmds.push(malbind);
    cmds.push(malsync);
    cmds.push(ping);
    cmds.push(dmping);
    cmds.push(logall);

    this.BotCommands = cmds;
  }

  public static get Commands() {
    return this.BotCommands;
  }

  public static Validate(command: ICommand) {
    return new Promise<BotCommand>((resolve, reject) => {
      for (let i = 0; i < this.BotCommands.length; i++) {
        const cmd = this.BotCommands[i];
        if (cmd.Name === command.Name) {
          resolve(cmd);
          return;
        } else {
          if (i === this.BotCommands.length - 1) {
            console.log(`Unknown Command.`);
            resolve(null);
          }
        }
      }
    });
  }
}
