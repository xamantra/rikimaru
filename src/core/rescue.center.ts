import { BotCommand } from "./../command/bot.command";
import { ICommand } from "../interfaces/command.interface";
import { Color } from "./colors";
import { ClientManager } from "./client";
import { Message } from "discord.js";

export class RescueCenter {
  public static async RequireParameter(
    message: Message,
    cmd: BotCommand,
    command: ICommand
  ) {
    return new Promise((resolve, reject) => {
      ClientManager.GetClient().then(client => {
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
                  title: `**Rikimaru Rescue Center**`,
                  description: `The command ***-${
                    command.Name
                  }*** requires a parameter.`,
                  fields: [
                    {
                      name: `Example|s for ***-${command.Name}*** : `,
                      // tslint:disable-next-line:max-line-length
                      value: example
                    }
                  ],
                  timestamp: new Date(),
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                  }
                }
              }
            : `The command ***-${command.Name}*** doesn't need a parameter.`;
        resolve(msg);
      });
    });
  }
}
