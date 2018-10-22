"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.Token =
            process.env.botToken || require("../extras/env").ConfigVariables.token;
        this.Prefix =
            process.env.commandPrefix ||
                require("../extras/env").ConfigVariables.prefix;
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