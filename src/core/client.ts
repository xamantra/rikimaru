import { Client, User } from "discord.js";
import { Config } from "./config";
// import DBL from "dblapi.js";

export class ClientManager {
  public static Client = new Client();

  public static async Init() {
    // const dbl = new DBL(Config.DBL_TOKEN);
    this.Client.on("guildCreate", guild => {
      console.log(
        `New server joined: ${guild.name} (Id: ${guild.id}). This server has ${
          guild.memberCount
        } members!`
      );
    });

    this.Client.on("ready", () => {
      console.log(
        `Bot has started, with ${this.Client.users.size} users, in ${
          this.Client.channels.size
        } channels of ${this.Client.guilds.size} servers.`
      );
      // dbl.postStats(client.guilds.size);
      // setInterval(() => {
      //   dbl.postStats(client.guilds.size);
      // }, 1800000);
    });
    this.Client.login(Config.BOT_TOKEN);
  }
}
