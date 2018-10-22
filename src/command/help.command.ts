import { Message } from "discord.js";
import { CallbackCommand } from "./callback.command";
import { Container } from "../core/container";
import { Color } from "../core/colors";

export class HelpCommand {
  public static ShowHelp(message: Message): void {
    const isDM = Container.MessageHelper.IsDMChannel(message);
    if (isDM) {
      message.member.send(this.Embed(message));
    } else {
      message.reply(this.Embed(message));
    }
  }

  private static Embed(message: Message): any {
    const commands: CallbackCommand[] = Container.BotCommand.GetCommands;
    const list: any[] = [];
    commands.forEach(command => {
      list.push({
        name: `\n***-${command.Name}***`,
        value: `*${command.Description}*`
      });
    });
    const embed = {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: Container.ClientManager.GetClient().user.avatarURL
        },
        title: `***Rikimaru Help Center***`,
        description: `Hey **${
          message.member.user.username
        }**! This are my command list:`,
        fields: list,
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
