import { Color } from "./colors";
import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";

export class SearchList {
  public static async Embed(command: ICommand, fields: any) {
    const client = await ClientManager.GetClient;
    return {
      embed: {
        color: Color.Random,
        title: `**Rikimaru Subscription Center**`,
        thumbnail: {
          url: client.user.avatarURL
        },
        description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
  }
}
