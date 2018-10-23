"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
class ClientManager {
    static Init(botClient) {
        this.Client = botClient;
        botClient.login(config_1.Config.GetToken);
        const client = botClient;
        client.on("ready", () => {
            console.log(`Bot has started, with ${client.users.size} users, in ${this.Client.channels.size} channels of ${client.guilds.size} servers.`);
            this.Client.user.setActivity(`as a Bot`);
        });
        client.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
    }
    static get GetClient() {
        return this.Client;
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=client.js.map