import { MessageHelper } from "../helpers/message.helper";
import { Command } from "../models/command.model";
import { ClientManager } from "../core/client";
import { Config } from "../core/config";
import { MediaResult } from "../core/media.result";
import { ResponseHandler } from "./response.handler";

export class MessageHandler {
  public static async Init() {
    const client = await ClientManager.GetClient;
    client.on("message", message => {
      console.log({
        Message: {
          Server:
            message.guild !== null ? message.guild.name : "Direct Message",
          Channel: message.channel.id,
          Message: message.content
        }
      });

      const isDMChannel = MessageHelper.IsDMChannel(message);
      if (isDMChannel) {
        MediaResult.SendInfo(
          message,
          `Go me nasai! ***${
          message.author.username
          }***, I don't talk to strangers.`,
          true
        );
        return;
      }
      const isCommand = MessageHelper.IsCommand(Config, message);
      const cmdName = isCommand
        ? MessageHelper.GetCommand(Config, message).trim()
        : "";
      const parameter = MessageHelper.GetParameter(Config, message).trim();
      if (isCommand) {
        const command = new Command(cmdName, parameter);
        console.log(command);
        ResponseHandler.Get(message, command);
      }
    });
  }
}
