import { BotCommand } from "./../command/bot.command";
import { ICommand } from "../interfaces/command.interface";
import { Color } from "./colors";
import { ClientManager } from "./client";

export class RescueCenter {
  public static RequireParameter(cmd: BotCommand, command: ICommand) {
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
              color: Color.Random,
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
                icon_url: ClientManager.GetClient.user.avatarURL,
                text: "© Rikimaru"
              }
            }
          }
        : `The command ***-${command.Name}*** doesn't need a parameter.`;
    return msg;
  }
}
