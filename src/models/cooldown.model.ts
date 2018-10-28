import { User, Message } from "discord.js";
import { BotCommand } from "../command/bot.command";
import { TimeHelper } from "../helpers/time.helper";

export class Cooldown {
  private constructor(public command: BotCommand, public user: User) {
    Cooldown.List.push(this);
  }
  private static List: Cooldown[] = [];

  private lastMessage: Message = null;

  public static Get(command: BotCommand, user: User) {
    return new Promise<Cooldown>((resolve, reject) => {
      const cooldown = this.List.find(
        cd => cd.command === command && cd.user === user
      );
      if (cooldown === undefined || cooldown === null) {
        const newCooldown = new Cooldown(command, user);
        resolve(newCooldown);
      } else {
        resolve(cooldown);
      }
    });
  }

  public Register(newMessage: Message) {
    console.log(Cooldown.List.length);
    return new Promise<CooldownResponse>((resolve, reject) => {
      if (this.lastMessage === null) {
        this.lastMessage = newMessage;
        resolve(null);
      } else {
        const diff = TimeHelper.DiffSeconds(
          newMessage.createdAt,
          this.lastMessage.createdAt
        );
        if (diff < this.command.Cooldown) {
          const countdown = this.command.Cooldown - diff;
          resolve(
            new CooldownResponse(
              `:alarm_clock: **${
                this.user.username
              }** You are on cooldown for **-${
                this.command.Name
              }** - \`${countdown}s\``,
              countdown * 1000,
              countdown
            )
          );
        } else {
          this.lastMessage = newMessage;
          resolve(null);
        }
      }
    });
  }
}

export class CooldownResponse {
  constructor(
    public content: string,
    public timeout: number,
    public countdown?: number
  ) {}
}
