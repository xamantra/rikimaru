"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const client_1 = require("./client");
class SearchList {
    static Embed(command, fields) {
        return {
            embed: {
                color: colors_1.Color.Random,
                title: `**Rikimaru Subscription Center**`,
                thumbnail: {
                    url: client_1.ClientManager.GetClient.user.avatarURL
                },
                description: `*Please select an anime you want to subscribe/unsubscribe by its exact title.`,
                fields: fields,
                timestamp: new Date(),
                footer: {
                    icon_url: client_1.ClientManager.GetClient.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
    }
}
exports.SearchList = SearchList;
//# sourceMappingURL=search.list.js.map