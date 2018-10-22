import { HelpFunction } from "./functions/help.command.function";
import { MediaFunction } from "./functions/media.command.function";
import { BotCommand } from "./bot.command";
import { PingFunction } from "./functions/ping.command.function";

export class CommandManager {
  private BotCommands: BotCommand[] = [];

  constructor() {
    console.log(`Constructed: "${CommandManager.name}"`);
  }

  public Init(): void {
    const commands: BotCommand[] = this.BotCommands;

    const help: BotCommand = new BotCommand(
      "help",
      "Show all my command list.",
      false,
      false,
      new HelpFunction()
    );
    const when: BotCommand = new BotCommand(
      "when",
      "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.",
      true,
      false,
      new MediaFunction()
    );
    const dmwhen: BotCommand = new BotCommand(
      "dmwhen",
      "Just similar with the* ***-when*** *command.",
      true,
      true,
      new MediaFunction()
    );
    const subscribe: BotCommand = new BotCommand(
      "subcribe",
      "",
      true,
      true,
      null
    );
    const mysubs: BotCommand = new BotCommand("viewsubs", "", true, true, null);
    const ping: BotCommand = new BotCommand(
      "ping",
      "Just check your ping and the API's ping.",
      false,
      false,
      new PingFunction()
    );
    const dmping: BotCommand = new BotCommand(
      "dmping",
      "Just similar with* ***-ping*** *command.",
      false,
      true,
      new PingFunction()
    );

    commands.push(help);
    commands.push(when);
    commands.push(dmwhen);
    commands.push(subscribe);
    commands.push(mysubs);
    commands.push(ping);
    commands.push(dmping);
  }

  public get Commands(): BotCommand[] {
    return this.BotCommands;
  }
}
