"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../core/container");
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
            message.createdTimestamp}ms. API Latency is ${Math.round(container_1.Container.ClientManager.GetClient().ping)}ms`);
    }
}
exports.PingFunction = PingFunction;
//# sourceMappingURL=ping.command.function.js.map