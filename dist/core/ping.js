"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
class Ping {
    static async Get(message, isDM) {
        const m = isDM
            ? (await message.author.send("Ping?"))
            : (await message.reply("Ping?"));
        m.edit(`Pingga!, Pongga! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(container_1.Container.ClientManager.GetClient().ping)}ms`);
    }
}
exports.Ping = Ping;
//# sourceMappingURL=ping.js.map