import { HelpFunction } from "./functions/help.command.function";
import { ICommandFunction } from "./../interfaces/command.function.interface";
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

    const helpFunction: ICommandFunction = new HelpFunction();
    const whenAnimeFunction: ICommandFunction = new MediaFunction("anime");
    const whenMangaFunction: ICommandFunction = new MediaFunction("manga");
    const pingFunction: ICommandFunction = new PingFunction();

    const help = new BotCommand(
      "help",
      "Show all my command list.",
      false,
      helpFunction
    );
    const dmhelp = new BotCommand(
      "dmhelp",
      "Just similar with the* ***-help*** *command.",
      false,
      helpFunction
    );
    const when = new BotCommand(
      "when",
      `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`,
      true,
      whenAnimeFunction
    );
    const dmwhen = new BotCommand(
      "dmwhen",
      "Just similar with the* ***-when*** *command.",
      true,
      whenAnimeFunction
    );
    const whenmanga = new BotCommand(
      "whenmanga",
      `Search for a schedule of a manga that matches the keyword/parameter.\nYou can either put the exact manga title or just a keyword.`,
      true,
      whenMangaFunction
    );
    const dmwhenmanga = new BotCommand(
      "dmwhenmanga",
      `Just similar with the* ***-whenmanga*** *command.`,
      true,
      whenMangaFunction
    );
    const subscribe = new BotCommand("subcribe", "", true, null);
    const mysubs = new BotCommand("viewsubs", "", true, null);
    const ping = new BotCommand(
      "ping",
      "Just check your ping and the API's ping.",
      false,
      pingFunction
    );
    const dmping = new BotCommand(
      "dmping",
      "Just similar with* ***-ping*** *command.",
      false,
      pingFunction
    );

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

  public get Commands(): BotCommand[] {
    return this.BotCommands;
  }
}
