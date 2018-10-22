"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_sample_1 = require("../extras/env.sample");
class Config {
    constructor() {
        this.Token = process.env.botToken || env_sample_1.EnvironmentVariables.token;
        this.Prefix = process.env.commandPrefix || env_sample_1.EnvironmentVariables.prefix;
    }
    Init() {
        console.log(`Config :: BotToken = ${this.Token}, CommandPrefix = ${this.Prefix}`);
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