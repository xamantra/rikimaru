import { ICommand } from "../interfaces/command.interface";
import { ClientManager } from "./client";
import { Message } from "discord.js";
import { Config } from "./config";

export class SearchList {
  public static async Embed(message: Message, command: ICommand, fields: any) {
    return new Promise<any>(async (resolve, reject) => {
      const client = await ClientManager.Client;
      const embed = {
        embed: {
          color: message.member.highestRole.color,
          title: `**${Config.BOT_NAME} Subscription Center**`,
          thumbnail: { url: client.user.avatarURL },
          description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
          fields: fields,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: `© ${Config.BOT_NAME}`
          }
        }
      };
      resolve(embed);
    });
  }
}
