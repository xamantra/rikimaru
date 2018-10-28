import { Color } from "./colors";
import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";

export class SearchList {
  public static async Embed(command: ICommand, fields: any) {
    return new Promise<{
      embed: {
        color: number;
        title: string;
        thumbnail: {
          url: string;
        };
        description: string;
        fields: any;
        timestamp: Date;
        footer: {
          icon_url: string;
          text: string;
        };
      };
    }>((resolve, reject) => {
      ClientManager.GetClient().then(client => {
        const embed = {
          embed: {
            color: Color.Random,
            title: `**Rikimaru Subscription Center**`,
            thumbnail: { url: client.user.avatarURL },
            description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
            fields: fields,
            timestamp: new Date(),
            footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
          }
        };
        resolve(embed);
      });
    });
  }
}
