import { Message } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { ClientManager } from "../../core/client";
import { ICommand } from "../../interfaces/command.interface";
import { CommandManager } from "../manager.command";
import { Color } from "../../core/colors";

export class HelpFunction implements ICommandFunction {
  constructor() {
    console.log(`Constructed: "${HelpFunction.name}"`);
  }

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.ShowHelp(message, dm);
  }

  private async ShowHelp(message: Message, dm: boolean) {
    this.Embed(message).then(async embed => {
      if (dm) {
        await message.member.send(embed);
        return;
      }
      await message.reply(embed);
    });
  }

  private async Embed(message: Message) {
    const commands = CommandManager.Commands;
    const client = await ClientManager.GetClient;
    const list: any[] = [];
    await commands.forEach(async command => {
      if (command.DevOnly === false) {
        await list.push({
          name: `\n***-${command.Name}***`,
          value: `*${command.Description}*`
        });
      }
    });
    const embed = {
      embed: {
        color: Color.Random,
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
    return embed;
  }
}
