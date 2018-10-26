"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
class ClientManager {
    static async Init(botClient) {
        botClient.login(config_1.Config.GetToken);
        const client = botClient;
        this.Client = botClient;
        client.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
        client.on("ready", () => {
            console.log(`Bot has started, with ${client.users.size} users, in ${this.Client.channels.size} channels of ${client.guilds.size} servers.`);
            this.Client.user.setActivity(`as a Bot`);
        });
    }
    static get GetClient() {
        return this.Client;
    }
    static async GetUser(id) {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                const user = this.Client.users.get(id);
                if (user !== null && user !== undefined) {
                    resolve(user);
                }
            }, 500);
        });
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=client.js.map