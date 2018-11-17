import { Message, DiscordAPIError } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { ClientManager } from "../../core/client";
import { ICommand } from "../../interfaces/command.interface";
import { CommandManager } from "../manager.command";
import { Config } from "../../core/config";

export class HelpFunction implements ICommandFunction {
  constructor() {}

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.ShowHelp(message, dm);
  }

  private async ShowHelp(message: Message, dm: boolean) {
    const embed = await this.Embed(message);
    process.on("unhandledRejection", console.log);
    if (dm) {
      message.member
        .send(embed)
        .then(($m: Message) => {
          console.log(
            `Message <${$m.id}> was sent to "${message.author.username}".`
          );
        })
        .catch((err: DiscordAPIError) => {
          console.log(err.name);
        });
    } else {
      message
        .reply(embed)
        .then(($m: Message) => {
          console.log(
            `Message <${$m.id}> was sent in "<${message.channel.id}>".`
          );
        })
        .catch((err: DiscordAPIError) => {
          console.log(err.name);
        });
    }
  }

  private Embed(message: Message) {
    return new Promise((resolve, reject) => {
      const botname = Config.BOT_NAME;
      const prefix = Config.COMMAND_PREFIX;
      const commands = CommandManager.Commands;
      const client = ClientManager.Client;
      const list: any[] = [];
      commands.forEach(command => {
        if (command.DevOnly === false) {
          list.push({
            name: `\n***${prefix}${command.Name}***`,
            value: `*${command.Description}*`
          });
        }
      });
      const embed = {
        embed: {
          color: message.member.highestRole.color,
          thumbnail: {
            url: client.user.avatarURL
          },
          title: `***${botname} Help Center***`,
          description: `Hey **${
            message.member.user.username
          }**! This are my command list:`,
          fields: list,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: `© ${botname}`
          }
        }
      };
      resolve(embed);
    });
  }
}
