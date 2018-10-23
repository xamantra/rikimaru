import { Container } from "./container";
import { BotCommand } from "./../command/bot.command";
import { ICommand } from "../interfaces/command.interface";

export class RescueCenter {
  // private static Color: Color = Container.Color;
  public static RequireParameter(cmd: BotCommand, command: ICommand) {
    const color = Container.Color;
    const msg: any = cmd.ParameterRequired
      ? {
          embed: {
            color: color.Random,
            title: `**Rikimaru Rescue Center**`,
            description: `The command ***-${
              command.Name
            }*** requires a parameter.`,
            fields: [
              {
                name: `Example|s for ***-${command.Name}*** : `,
                // tslint:disable-next-line:max-line-length
                value: cmd.Example.Get(command, cmd.Example.Count)
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: Container.ClientManager.GetClient().user.avatarURL,
              text: "© Rikimaru"
            }
          }
        }
      : `The command ***-${command.Name}*** doesn't need a parameter.`;
    return msg;
  }
}
