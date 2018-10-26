import { Client, Collection, User } from "discord.js";
import { Config } from "./config";

export class ClientManager {
  private static Client: Client;

  public static async Init(botClient: Client) {
    botClient.login(Config.BOT_TOKEN);
    const client = botClient;
    this.Client = botClient;

    client.on("guildCreate", guild => {
      console.log(
        `New server joined: ${guild.name} (Id: ${guild.id}). This server has ${
          guild.memberCount
        } members!`
      );
    });

    client.on("ready", () => {
      console.log(
        `Bot has started, with ${client.users.size} users, in ${
          this.Client.channels.size
        } channels of ${client.guilds.size} servers.`
      );
      this.Client.user.setActivity(`as a Bot`);
    });
  }

  public static get GetClient() {
    return this.Client;
  }

  public static async GetUser(id: string) {
    return new Promise<User>((resolve, reject) => {
      setInterval(() => {
        const user = this.Client.users.get(id);
        if (user !== null && user !== undefined) {
          resolve(user);
        }
      }, 500);
    });
  }
}
