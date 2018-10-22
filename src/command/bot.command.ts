import { Anilist } from "../core/anilist";
import { Helper } from "./helper.command";
import { Container } from "./../core/container";
import { Ping } from "./../core/ping";
import { CallbackCommand } from "./callback.command";
import { MediaHelper } from "../helpers/media.helper";
import { HelpCommand } from "./help.command";

export class BotCommand {
  private Anilist: Anilist;
  private CallbackCommands: CallbackCommand[] = [];
  private HelpCommand: HelpCommand;
  private Ping: Ping;
  private MediaHelper: MediaHelper;

  constructor() {
    this.Anilist = Container.Anilist;
    this.HelpCommand = Container.HelpCommand;
    this.Ping = Container.Ping;
    this.MediaHelper = Container.MediaHelper;
    console.log(`Constructed: "${BotCommand.name}"`);
  }

  public Init(): void {
    const aniList: Anilist = this.Anilist;
    const commands: CallbackCommand[] = this.CallbackCommands;
    const help: HelpCommand = this.HelpCommand;
    const ping: Ping = this.Ping;
    const helper: MediaHelper = this.MediaHelper;
    commands.push(
      new CallbackCommand(
        "help",
        "Show all my command list.",
        false,
        false,
        (message, command, dm) => {
          help.ShowHelp(message);
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "when",
        "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.",
        true,
        false,
        async (message, command, dm) => {
          helper.Handle(aniList, message, command, dm);
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "dmwhen",
        "Just similar with the* ***-when*** *command.",
        true,
        true,
        async (message, command, dm) => {
          helper.Handle(aniList, message, command, dm);
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "subcribe",
        "",
        true,
        true,
        async (message, command, dm) => {
          return;
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "viewsubs",
        "",
        true,
        true,
        async (message, command, dm) => {
          return;
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "ping",
        "Just check your ping and the API's ping.",
        false,
        false,
        async (message, command, dm) => {
          if (Helper.IsCommandValid(false, command)) {
            ping.Get(message, dm);
          }
        }
      )
    );
    commands.push(
      new CallbackCommand(
        "dmping",
        "Just similar with* ***-ping*** *command.",
        false,
        true,
        async (message, command, dm) => {
          if (Helper.IsCommandValid(false, command)) {
            ping.Get(message, dm);
          }
        }
      )
    );
  }

  public get GetCommands(): CallbackCommand[] {
    return this.CallbackCommands;
  }
}
