import { Message } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Color } from "../../core/colors";
import { ClientManager } from "../../core/client";
import { BotCommand } from "../bot.command";
import { Container } from "../../core/container";
import { ICommand } from "../../interfaces/command.interface";

export class HelpFunction implements ICommandFunction {
  private ClientManager: ClientManager;
  private Color: Color;
  constructor() {
    this.ClientManager = Container.ClientManager;
    this.Color = Container.Color;
    console.log(`Constructed: "${HelpFunction.name}"`);
  }

  public Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.ShowHelp(message, dm);
  }

  private ShowHelp(message: Message, dm: boolean): void {
    if (dm) {
      message.member.send(this.Embed(message));
    } else {
      message.reply(this.Embed(message));
    }
  }

  private Embed(message: Message): any {
    const commands: BotCommand[] = Container.CommandManager.Commands;
    const client: ClientManager = this.ClientManager;
    const list: any[] = [];
    const color: Color = this.Color;
    commands.forEach(command => {
      list.push({
        name: `\n***-${command.Name}***`,
        value: `*${command.Description}*`
      });
    });
    const embed: any = {
      embed: {
        color: color.Random,
        thumbnail: {
          url: client.GetClient().user.avatarURL
        },
        title: `***Rikimaru Help Center***`,
        description: `Hey **${
          message.member.user.username
        }**! This are my command list:`,
        fields: list,
        timestamp: new Date(),
        footer: {
          icon_url: client.GetClient().user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
    return embed;
  }
}
