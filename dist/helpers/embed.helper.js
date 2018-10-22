"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../core/container");
const colors_1 = require("./../core/colors");
class EmbedHelper {
    WelcomeEmbed(server, member) {
        const embed = {
            embed: {
                color: colors_1.Color.Random,
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
                    icon_url: container_1.Container.ClientManager.GetClient().user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.EmbedHelper = EmbedHelper;
//# sourceMappingURL=embed.helper.js.map