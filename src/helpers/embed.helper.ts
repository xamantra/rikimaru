import { Container } from "../core/container";
import { Color } from "./../core/colors";
import { GuildMember, Guild } from "discord.js";

export class EmbedHelper {
  public WelcomeEmbed(server: Guild, member: GuildMember): any {
    const embed: any = {
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
          icon_url: Container.ClientManager.GetClient().user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
    return embed;
  }
}
