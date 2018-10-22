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

  public Init() {
    const config = this.Config;
    const helper = this.Helper;
    const client = this.ClientManager;
    client.GetClient().on("message", message => {
      console.log({
        Message: {
          Server:
            message.guild !== null ? message.guild.name : "Direct Message",
          Channel: message.channel.id,
          Message: message.content
        }
      });

      const isDMChannel = helper.IsDMChannel(message);
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
      const isCommand = helper.IsCommand(config, message);
      const cmdName = isCommand
        ? helper.GetCommand(config, message).trim()
        : "";
      const parameter = helper.GetParameter(config, message).trim();
      if (isCommand) {
        const command = new Command(cmdName, parameter);
        console.log(command);
        const response = Container.ResponseHandler;
        response.Get(message, command);
      }
    });
  }
}
