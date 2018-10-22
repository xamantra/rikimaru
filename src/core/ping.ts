import { Message } from "discord.js";
import { Container } from "./container";

export class Ping {
  public static async Get(message: Message, isDM: boolean): Promise<void> {
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
