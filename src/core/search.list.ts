import { Color } from "./colors";
import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";
import { Message } from "discord.js";

export class SearchList {
  public static async Embed(message: Message, command: ICommand, fields: any) {
    return new Promise<any>((resolve, reject) => {
      ClientManager.GetClient().then(client => {
        const embed = {
          embed: {
            color: message.member.highestRole.color,
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
