import { Client, User } from "discord.js";
import { Config } from "./config";

export class ClientManager {
  private static Client: Client;

  public static async Init(client: Client) {
    client.login(Config.BOT_TOKEN);
    this.Client = client;
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
        client.channels.size
        } channels of ${client.guilds.size} servers.`
      );
      client.user.setActivity(`as a Bot`);
    });
  }

  public static get GetClient() {
    return new Promise<Client>((resolve, reject) => {
      setInterval(() => {
        if (this.Client !== null && this.Client !== undefined) {
          resolve(this.Client);
        }
      }, 500);
    });
  }

  public static GetUser(id: string) {
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
