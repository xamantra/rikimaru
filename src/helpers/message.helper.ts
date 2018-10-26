import { Config } from "../core/config";
import { Message, DMChannel } from "discord.js";

export class MessageHelper {
  public static IsCommand(config: Config, message: Message) {
    return message.content.indexOf(Config.COMMAND_PREFIX) === 0;
  }

  public static IsDMChannel(message: Message) {
    return message.channel instanceof DMChannel || message.guild === null;
  }

  public static HasPermission(message: Message) {
    const roles = ["Ōnā", "Botto"];
    return message.member.roles.some(r => roles.includes(r.name));
  }

  public static GetPermissions(message: Message, log: boolean = false) {
    const permissions = message.member.permissions;
    if (log === true) {
      console.log(permissions.toArray());
    }
    return permissions;
  }

  public static GetArgs(config: Config, message: Message) {
    return message.content
      .slice(Config.COMMAND_PREFIX.length)
      .trim()
      .split(/ +/g);
  }

  public static GetCommand(config: Config, message: Message) {
    return this.GetArgs(config, message)
      .shift()
      .toLowerCase();
  }

  public static GetParameter(config: Config, message: Message) {
    const args = this.GetArgs(config, message);
    return args.slice(1, args.length).join(" ");
  }
}
