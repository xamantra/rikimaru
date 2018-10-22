import { Container } from "./container";
import { ICommand } from "../interfaces/command.interface";

export class RescueCenter {
  // private static Color: Color = Container.Color;
  public static RequireParameter(command: ICommand) {
    const color = Container.Color;
    return {
      embed: {
        color: color.Random,
        title: `**Rikimaru Rescue Center**`,
        description: `The command ***-${
          command.Name
        }*** requires a *parameter*.`,
        fields: [
          {
            name: `Examples for ***-${command.Name}*** : `,
            // tslint:disable-next-line:max-line-length
            value: Container.CommandExample.MediaExample(command, 5)
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: Container.ClientManager.GetClient().user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
  }
}
