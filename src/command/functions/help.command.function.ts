import { Message, DiscordAPIError } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { ClientManager } from "../../core/client";
import { ICommand } from "../../interfaces/command.interface";
import { CommandManager } from "../manager.command";
import { Color } from "../../core/colors";
import { Awaiter } from "../awaiter";
import { MessageHelper } from "../../helpers/message.helper";

export class HelpFunction implements ICommandFunction {
  constructor() {
    console.log(`Constructed: "${HelpFunction.name}"`);
  }

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.ShowHelp(message, dm);
  }

  private ShowHelp(message: Message, dm: boolean) {
    Awaiter.Send(message, 1000, (m: Message) => {
      this.Embed(message).then(embed => {
        MessageHelper.Delete(m);
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
      });
    });
  }

  private Embed(message: Message) {
    return new Promise((resolve, reject) => {
      const commands = CommandManager.Commands;
      ClientManager.GetClient().then(client => {
        const list: any[] = [];
        commands.forEach(command => {
          if (command.DevOnly === false) {
            list.push({
              name: `\n***-${command.Name}***`,
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
            title: `***Rikimaru Help Center***`,
            description: `Hey **${
              message.member.user.username
            }**! This are my command list:`,
            fields: list,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Rikimaru"
            }
          }
        };
        resolve(embed);
      });
    });
  }
}
