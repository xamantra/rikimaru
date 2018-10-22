"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../extras/env");
class Config {
    constructor() {
        this.Token = process.env.botToken || env_1.ConfigVariables.token;
        this.Prefix = process.env.commandPrefix || env_1.ConfigVariables.prefix;
        console.log(`Config :: BotToken = ${this.Token.substr(0, 14)}..., CommandPrefix = ${this.Prefix}`);
        console.log(`Constructed: "${Config.name}"`);
    }
    get GetToken() {
        return this.Token;
    }
    get GetPrefix() {
        return this.Prefix;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map