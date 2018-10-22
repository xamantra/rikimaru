"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
class ClientManager {
    constructor(client) {
        client.login(container_1.Container.Config.GetToken);
        this.Client = client;
        console.log(`Constructed: "${ClientManager.name}", Client: "${this.Client}"`);
    }
    Init() {
        const client = this.Client;
        client.on("ready", () => {
            console.log(`Bot has started, with ${client.users.size} users, in ${this.Client.channels.size} channels of ${client.guilds.size} servers.`);
            this.Client.user.setActivity(`as a Bot`);
        });
        client.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
    }
    GetClient() {
        return this.Client;
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=client.js.map