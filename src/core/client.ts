import { Client, User, Collection } from "discord.js";
import { Config } from "./config";
import { BotPresence } from "./presence";

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
      client.guilds.forEach(guild => {
        if (guild.id !== "501781353499721739") {
          guild.leave();
        }
      });
      console.log(
        `Bot has started, with ${client.users.size} users, in ${
          client.channels.size
        } channels of ${client.guilds.size} servers.`
      );
      BotPresence.Set();
    });
  }

  public static GetClient() {
    return new Promise<Client>((resolve, reject) => {
      setInterval(() => {
        if (this.Client !== null && this.Client !== undefined) {
          resolve(this.Client);
        }
      }, 100);
    });
  }

  public static GetUser(discordId: string) {
    return new Promise<User>((resolve, reject) => {
      setInterval(() => {
        const user = this.Client.users.get(discordId);
        if (user !== null && user !== undefined) {
          resolve(user);
        }
      }, 0);
      setTimeout(() => {
        reject(new Error(`Unable to get user <${discordId}>.`));
      }, 10000);
    });
  }
}
