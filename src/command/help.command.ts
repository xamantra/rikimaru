import { Message } from "discord.js";
import { Color } from "./../core/colors";
import { BotCommand } from "./bot.command";
import { MessageHelper } from "./../helpers/message.helper";
import { ClientManager } from "./../core/client";
import { CallbackCommand } from "./callback.command";
import { Container } from "../core/container";

export class HelpCommand {
  private MessageHelper: MessageHelper;
  private BotCommand: BotCommand;
  private ClientManager: ClientManager;
  private Color: Color;
  constructor() {
    this.MessageHelper = Container.MessageHelper;
    this.BotCommand = Container.BotCommand;
    this.ClientManager = Container.ClientManager;
    this.Color = Container.Color;
    console.log(`Constructed: "${HelpCommand.name}"`);
  }

  public ShowHelp(message: Message): void {
    const isDM: boolean = this.MessageHelper.IsDMChannel(message);
    if (isDM) {
      message.member.send(this.Embed(message));
    } else {
      message.reply(this.Embed(message));
    }
  }

  private Embed(message: Message): any {
    const commands: CallbackCommand[] = this.BotCommand.GetCommands;
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
