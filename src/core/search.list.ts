import { Color } from "./colors";
import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";

export class SearchList {
  public static Embed(command: ICommand, fields: any) {
    return {
      embed: {
        color: Color.Random,
        title: `**Rikimaru Subscription Center**`,
        description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: ClientManager.GetClient.user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
  }
}
