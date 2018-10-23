"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../core/client");
class PingFunction {
    constructor() {
        console.log(`Constructed: "${PingFunction.name}"`);
    }
    Execute(message, command, dm) {
        this.Get(message, dm);
    }
    async Get(message, isDM) {
        const m = isDM
            ? (await message.author.send("Ping?"))
            : (await message.reply("Ping?"));
        m.edit(`Pingga!, Pongga! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(client_1.ClientManager.GetClient.ping)}ms`);
    }
}
exports.PingFunction = PingFunction;
//# sourceMappingURL=ping.command.function.js.map