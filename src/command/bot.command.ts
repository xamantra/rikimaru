import { Anilist } from "../core/anilist";

import { CallbackCommand } from "./callback.command";

import { Container } from "../core/container";

import { MediaHelper } from "../helpers/media.helper";

import { Ping } from "../core/ping";
import { HelpCommand } from "./help.command";

export class BotCommand {
  private Anilist: Anilist;
  private CallbackCommands: CallbackCommand[] = [];

  constructor() {
    this.Anilist = Container.Anilist;
    console.log(`Response is ready...`);
  }

  public Init(): void {
    const aniList: Anilist = this.Anilist;
    this.CallbackCommands.push(
      new CallbackCommand(
        "help",
        "Show all my command list.",
        false,
        false,
        (message, command, dm) => {
          HelpCommand.ShowHelp(message);
        }
      )
    );
    this.CallbackCommands.push(
      new CallbackCommand(
        "when",
        "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.",
        true,
        false,
        async (message, command, dm) => {
          MediaHelper.Handle(aniList, message, command, dm);
        }
      )
    );
    this.CallbackCommands.push(
      new CallbackCommand(
        "dmwhen",
        "Just similar with the* ***-when*** *command.",
        true,
        true,
        async (message, command, dm) => {
          MediaHelper.Handle(aniList, message, command, dm);
        }
      )
    );
    this.CallbackCommands.push(
      new CallbackCommand(
        "ping",
        "Just check your ping and the API's ping.",
        false,
        false,
        async (message, command, dm) => {
          Ping.Get(message, dm);
        }
      )
    );
    this.CallbackCommands.push(
      new CallbackCommand(
        "dmping",
        "Just similar with* ***-ping*** *command.",
        false,
        true,
        async (message, command, dm) => {
          Ping.Get(message, dm);
        }
      )
    );
  }

  public get GetCommands(): CallbackCommand[] {
    return this.CallbackCommands;
  }
}
