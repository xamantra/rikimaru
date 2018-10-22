import { MessageHelper } from "../helpers/message.helper";
import { Command } from "../models/command.model";
import { ClientManager } from "../core/client";
import { Config } from "../core/config";
import { ICommand } from "../interfaces/command.interface";
import { ResponseHandler } from "./response.handler";
import { Container } from "../core/container";

export class MessageHandler {
  private Config: Config;
  private ClientManager: ClientManager;
  private Helper: MessageHelper;

  constructor() {
    this.Config = Container.Config;
    this.Helper = Container.MessageHelper;
    this.ClientManager = Container.ClientManager;
    console.log(`Constructed: "${MessageHandler.name}"`);
  }

  public Init(): void {
    const config: Config = this.Config;
    const helper: MessageHelper = this.Helper;
    const client: ClientManager = this.ClientManager;
    client.GetClient().on("message", message => {
      console.log({
        Message: {
          Server:
            message.guild !== null ? message.guild.name : "Direct Message",
          Channel: message.channel.id,
          Message: message.content
        }
      });

      const isDMChannel: boolean = helper.IsDMChannel(message);
      if (isDMChannel) {
        Container.MediaResult.SendInfo(
          message,
          `Go me nasai! ***${
            message.author.username
          }***, I don't talk to strangers.`,
          true
        );
        return;
      }
      const isCommand: boolean = helper.IsCommand(config, message);
      const command: string = isCommand
        ? helper.GetCommand(config, message)
        : "";
      const parameter: string = helper.GetParameter(config, message);
      if (isCommand) {
        const _command: ICommand = new Command(command, parameter);
        console.log(_command);
        const response: ResponseHandler = Container.ResponseHandler;
        response.Get(config, message, _command);
      }
    });
  }
}
