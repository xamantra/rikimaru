import { HelpFunction } from "./functions/help.command.function";
import { Response } from "./../core/enums";
import { ICommandFunction } from "./../interfaces/command.function.interface";
import { MediaFunction } from "./functions/media.command.function";
import { BotCommand } from "./bot.command";
import { PingFunction } from "./functions/ping.command.function";
import { MediaExample } from "./examples/media.command.example";

export class CommandManager {
  private BotCommands: BotCommand[] = [];

  constructor() {
    console.log(`Constructed: "${CommandManager.name}"`);
  }

  public Init(): void {
    const commands = this.BotCommands;

    const helpFunction = new HelpFunction();
    const whenAnimeFunction = new MediaFunction("anime");
    const whenMangaFunction = new MediaFunction("manga");
    const pingFunction = new PingFunction();

    const mediaExample = new MediaExample(5);

    const help = new BotCommand(
      "help",
      "Show all my command list.",
      false,
      Response.ChannelReply,
      helpFunction
    );
    const dmhelp = new BotCommand(
      "dmhelp",
      "Just similar with the* ***-help*** *command.",
      false,
      Response.DirectMessage,
      helpFunction
    );
    const when = new BotCommand(
      "when",
      `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`,
      true,
      Response.ChannelReply,
      whenAnimeFunction,
      mediaExample
    );
    const dmwhen = new BotCommand(
      "dmwhen",
      "Just similar with the* ***-when*** *command.",
      true,
      Response.DirectMessage,
      whenAnimeFunction,
      mediaExample
    );
    const whenmanga = new BotCommand(
      "whenmanga",
      `Search for a schedule of a manga that matches the keyword/parameter.\nYou can either put the exact manga title or just a keyword.`,
      true,
      Response.ChannelReply,
      whenMangaFunction,
      mediaExample
    );
    const dmwhenmanga = new BotCommand(
      "dmwhenmanga",
      `Just similar with the* ***-whenmanga*** *command.`,
      true,
      Response.DirectMessage,
      whenMangaFunction,
      mediaExample
    );
    const subscribe = new BotCommand(
      "subcribe",
      "",
      true,
      Response.DirectMessage,
      null
    );
    const mysubs = new BotCommand(
      "viewsubs",
      "",
      true,
      Response.DirectMessage,
      null
    );
    const ping = new BotCommand(
      "ping",
      "Just check your ping and the API's ping.",
      false,
      Response.ChannelReply,
      pingFunction
    );
    const dmping = new BotCommand(
      "dmping",
      "Just similar with* ***-ping*** *command.",
      false,
      Response.DirectMessage,
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

  public get Commands() {
    return this.BotCommands;
  }
}
