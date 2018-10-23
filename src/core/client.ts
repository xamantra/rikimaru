import { Client } from "discord.js";
import { Config } from "./config";

export class ClientManager {
  private static Client: Client;

  public static Init(botClient: Client) {
    this.Client = botClient;
    botClient.login(Config.GetToken);
    const client = botClient;
    client.on("ready", () => {
      console.log(
        `Bot has started, with ${client.users.size} users, in ${
          this.Client.channels.size
        } channels of ${client.guilds.size} servers.`
      );
      this.Client.user.setActivity(`as a Bot`);
    });

    client.on("guildCreate", guild => {
      console.log(
        `New server joined: ${guild.name} (Id: ${guild.id}). This server has ${
          guild.memberCount
        } members!`
      );
    });
  }

  public static get GetClient() {
    return this.Client;
  }
}
