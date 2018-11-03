"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
class SearchList {
    static async Embed(message, command, fields) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.GetClient();
            const embed = {
                embed: {
                    color: message.member.highestRole.color,
                    title: `**Rikimaru Subscription Center**`,
                    thumbnail: { url: client.user.avatarURL },
                    description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
                    fields: fields,
                    timestamp: new Date(),
                    footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
                }
            };
            resolve(embed);
        });
    }
}
exports.SearchList = SearchList;
//# sourceMappingURL=search.list.js.map