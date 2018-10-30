"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../core/client");
class EmbedHelper {
    async WelcomeEmbed(server, member) {
        const client = await client_1.ClientManager.GetClient();
        const embed = {
            embed: {
                color: member.highestRole.color,
                thumbnail: {
                    url: member.user.avatarURL
                },
                title: `Hello ${member.user.username}!, Welcome to **${server.name}**! Server`,
                fields: [
                    {
                        name: `**Who am I?**`,
                        value: `*I am an anime schedule/countdown bot, please make the most out of me!*\n`
                    },
                    {
                        name: `**What are my commands?**`,
                        value: `Type ***-help*** to show all commands\nNote: *You can do it here or in the server.*`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.EmbedHelper = EmbedHelper;
//# sourceMappingURL=embed.helper.js.map