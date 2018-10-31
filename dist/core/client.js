"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const presence_1 = require("./presence");
class ClientManager {
    static async Init(client) {
        client.login(config_1.Config.BOT_TOKEN);
        this.Client = client;
        client.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
        client.on("ready", () => {
            client.guilds.forEach(guild => {
                if (guild.id !== "501781353499721739") {
                    guild.leave();
                }
            });
            console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
            presence_1.BotPresence.Set();
        });
    }
    static GetClient() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (this.Client !== null && this.Client !== undefined) {
                    resolve(this.Client);
                }
            }, 100);
        });
    }
    static GetUser(discordId) {
        return new Promise((resolve, reject) => {
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
exports.ClientManager = ClientManager;
//# sourceMappingURL=client.js.map