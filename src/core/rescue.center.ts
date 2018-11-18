import { BotCommand } from "./../command/bot.command";
import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";
import { Message } from "discord.js";
import { Config } from "./config";

export class RescueCenter {
  public static async RequireParameter(
    message: Message,
    cmd: BotCommand,
    command: ICommand
  ) {
    return new Promise((resolve, reject) => {
      const client = ClientManager.Client;
      const prefix = Config.COMMAND_PREFIX;
      let example: any = cmd.Example;
      if (example === undefined) {
        example = "";
      } else {
        example = cmd.Example.Get(command, cmd.Example.Count);
      }
      const msg: any =
        cmd.ParameterRequired && command.Parameter.length === 0
          ? {
              embed: {
                color: message.member.highestRole.color,
                title: `**${Config.BOT_NAME} Rescue Center**`,
                description: `The command ***${prefix}${
                  command.Name
                }*** requires a parameter.`,
                fields: [
                  {
                    name: `Example|s for ***${prefix}${command.Name}*** : `,
                    // tslint:disable-next-line:max-line-length
                    value: example
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `© ${Config.BOT_NAME}`
                }
              }
            }
          : `The command ***${prefix}${
              command.Name
            }*** doesn't need a parameter.`;
      resolve(msg);
    });
  }
}
