import { User, Message } from "discord.js";
import { BotCommand } from "../command/bot.command";
import { TimeHelper } from "../helpers/time.helper";
import { Config } from "../core/config";

export class Cooldown {
  private constructor(public command: BotCommand, public user: User) {
    Cooldown.List.push(this);
  }
  private static List: Cooldown[] = [];

  private lastMessage: Message = null;
  private lastResponse: Message = null;

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
    return new Promise((resolve, reject) => {
      if (this.lastMessage === null) {
        this.lastMessage = newMessage;
        resolve();
      } else {
        const diff = TimeHelper.DiffSeconds(
          newMessage.createdAt,
          this.lastMessage.createdAt
        );
        if (diff < this.command.Cooldown) {
          const countdown = this.command.Cooldown - diff;
          reject(
            new CooldownResponse(
              `:alarm_clock: **${
                this.user.username
              }** You are on cooldown for **${Config.COMMAND_PREFIX}${
                this.command.Name
              }** - \`${countdown}s\``,
              countdown * 1000
            )
          );
        } else {
          this.lastMessage = newMessage;
          resolve();
        }
      }
    });
  }

  public Respond(newResponse: Message) {
    return new Promise((resolve, reject) => {
      if (this.lastResponse !== null && this.lastResponse !== undefined) {
        if (this.lastResponse.deletable) {
          this.lastResponse
            .delete()
            .then(() => {
              this.lastResponse = newResponse;
              resolve();
            })
            .catch(err => {
              this.lastResponse = newResponse;
              resolve();
            });
        } else {
          this.lastResponse = newResponse;
          resolve();
        }
      } else {
        this.lastResponse = newResponse;
        resolve();
      }
    });
  }
}

export class CooldownResponse {
  constructor(public content: string, public timeout: number) {}
}
