import { Message } from "discord.js";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Container } from "../../core/container";
import { ICommand } from "../../interfaces/command.interface";

export class PingFunction implements ICommandFunction {
  constructor() {
    console.log(`Constructed: "${PingFunction.name}"`);
  }

  public Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.Get(message, dm);
  }

  public async Get(message: Message, isDM: boolean): Promise<void> {
    const m: Message = isDM
      ? ((await message.author.send("Ping?")) as Message)
      : ((await message.reply("Ping?")) as Message);
    m.edit(
      `Pingga!, Pongga! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        Container.ClientManager.GetClient().ping
      )}ms`
    );
  }
}
