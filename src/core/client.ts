import { Client, Guild } from "discord.js";
import { Container } from "./container";

export class ClientManager {
  private Client: Client;
  constructor(client: Client) {
    client.login(Container.Config.GetToken);
    this.Client = client;
    console.log(
      `Constructed: "${ClientManager.name}", Client: "${this.Client}"`
    );
  }

  public Init(): void {
    const client: Client = this.Client;
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

  public GetClient(): Client {
    return this.Client;
  }
}
