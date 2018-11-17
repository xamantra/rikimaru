import { MessageHelper } from "../helpers/message.helper";
import { Command } from "../models/command.model";
import { ClientManager } from "../core/client";
import { Config } from "../core/config";
import { ResponseHandler } from "./response.handler";
import { Sender } from "../core/sender";

export class MessageHandler {
  public static async Init() {
    const client = await ClientManager.Client;
    client.on("message", message => {
      if (message.author.id !== client.user.id) {
        const isCommand = MessageHelper.IsCommand(Config, message);
        const cmdName = isCommand
          ? MessageHelper.GetCommand(Config, message).trim()
          : "";
        const parameter = MessageHelper.GetParameter(Config, message).trim();
        if (isCommand && MessageHelper.IsDMChannel(message)) {
          Sender.Send(
            message,
            `Go me nasai!, I can't process commands in DM.`,
            true
          );
          return;
        }
        if (isCommand) {
          const command = new Command(cmdName, parameter);
          console.log(command);
          ResponseHandler.Get(message, command);
        }
      }
    });
  }
}
