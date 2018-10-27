"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
class ClientManager {
    static async Init(client) {
        const botClient = await this.Login(client);
        this.Client = botClient;
        botClient.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
        botClient.on("ready", () => {
            console.log(`Bot has started, with ${botClient.users.size} users, in ${botClient.channels.size} channels of ${botClient.guilds.size} servers.`);
            botClient.user.setActivity(`as a Bot`);
        });
    }
    static async Login(client) {
        return new Promise((resolve, reject) => {
            client.login(config_1.Config.BOT_TOKEN)
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
    static get GetClient() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (this.Client !== null && this.Client !== undefined) {
                    resolve(this.Client);
                }
            }, 500);
        });
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