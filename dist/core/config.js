"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get GetToken() {
        return this.Token;
    }
    static get GetPrefix() {
        return this.Prefix;
    }
}
Config.Token = process.env.botToken || require("../extras/env").ConfigVariables.token;
Config.Prefix = process.env.commandPrefix ||
    require("../extras/env").ConfigVariables.prefix;
exports.Config = Config;
//# sourceMappingURL=config.js.map