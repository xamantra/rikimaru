import { Config } from "../core/config";
import { Message, Permissions, DMChannel } from "discord.js";

export class MessageHelper {
  constructor() {
    console.log(`Constructed: "${MessageHelper.name}"`);
  }

  public IsCommand(config: Config, message: Message): boolean {
    return message.content.indexOf(config.GetPrefix) === 0;
  }

  public IsDMChannel(message: Message): boolean {
    return message.channel instanceof DMChannel || message.guild === null;
  }

  public HasPermission(message: Message): boolean {
    const roles: string[] = ["Ōnā", "Botto"];
    return message.member.roles.some(r => roles.includes(r.name));
  }

  public GetPermissions(message: Message, log: boolean = false): Permissions {
    const permissions: Permissions = message.member.permissions;
    if (log === true) {
      console.log(permissions.toArray());
    }
    return permissions;
  }

  public GetArgs(config: Config, message: Message): string[] {
    return message.content
      .slice(config.GetPrefix.length)
      .trim()
      .split(/ +/g);
  }

  public GetCommand(config: Config, message: Message): string {
    return this.GetArgs(config, message)
      .shift()
      .toLowerCase();
  }

  public GetParameter(config: Config, message: Message): string {
    const args: string[] = this.GetArgs(config, message);
    return args.slice(1, args.length).join(" ");
  }
}
