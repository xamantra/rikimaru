import { Color } from "./../core/colors";
import { GuildMember, Guild } from "discord.js";
import { ClientManager } from "../core/client";

export class EmbedHelper {
  public async WelcomeEmbed(server: Guild, member: GuildMember) {
    const client = await ClientManager.GetClient();
    const embed = {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: member.user.avatarURL
        },
        title: `Hello ${member.user.username}!, Welcome to **${
          server.name
          }**! Server`,
        fields: [
          {
            name: `**Who am I?**`,
            value: `*I am an anime schedule/countdown bot, please make the most out of me!*\n`
          },
          {
            name: `**What are my commands?**`,
            value: `Type ***-help*** to show all commands\nNote: *You can do it here or in the server.*`
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
    return embed;
  }
}
