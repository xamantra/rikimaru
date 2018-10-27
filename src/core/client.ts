import { Client, Collection, User } from "discord.js";
import { Config } from "./config";

export class ClientManager {
  private static Client: Client;

  public static async Init(client: Client) {
    const botClient = await this.Login(client);
    this.Client = botClient;
    botClient.on("guildCreate", guild => {
      console.log(
        `New server joined: ${guild.name} (Id: ${guild.id}). This server has ${
        guild.memberCount
        } members!`
      );
    });

    botClient.on("ready", () => {
      console.log(
        `Bot has started, with ${botClient.users.size} users, in ${
        botClient.channels.size
        } channels of ${botClient.guilds.size} servers.`
      );
      botClient.user.setActivity(`as a Bot`);
    });
  }

  private static async Login(client: Client) {
    return new Promise<Client>((resolve, reject) => {
      client.login(Config.BOT_TOKEN)
        .then(token => {
          console.log(`"${client.user.username}" has successfully logged in! Token: "${token.substring(0, 20)}..."`);
          resolve(client);
        })
        .catch(() => {
          console.log(`Unable to login...Logging in again.`);
          this.Login(client);
        });
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
