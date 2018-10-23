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

  public Execute(message?: Message, command?: ICommand, dm?: boolean) {
    this.ShowHelp(message, dm);
  }

  private ShowHelp(message: Message, dm: boolean) {
    if (dm) {
      message.member.send(this.Embed(message));
    } else {
      message.reply(this.Embed(message));
    }
  }

  private Embed(message: Message) {
    const commands = CommandManager.Commands;
    const client = ClientManager.GetClient;
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
