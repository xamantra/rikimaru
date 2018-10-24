"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get GetToken() {
        return this.Token;
    }
    static get GetPrefix() {
        return this.Prefix;
    }
    static get GetMySqlHost() {
        return this.MysqlHost;
    }
    static get GetMySqlUsername() {
        return this.MysqlUsername;
    }
    static get GetMySqlPassword() {
        return this.MysqlPassword;
    }
    static get GetMySqlDatabase() {
        return this.MysqlDatabase;
    }
}
Config.Token = process.env.botToken || require("../extras/env").ConfigVariables.token;
Config.Prefix = process.env.commandPrefix ||
    require("../extras/env").ConfigVariables.prefix;
Config.MysqlHost = process.env.mysqlURL || require("../extras/env").ConfigVariables.mysqlURL;
Config.MysqlUsername = process.env.mysqlUsername ||
    require("../extras/env").ConfigVariables.mysqlUsername;
Config.MysqlPassword = process.env.mysqlPassword ||
    require("../extras/env").ConfigVariables.mysqlPassword;
Config.MysqlDatabase = process.env.mysqlDatabase ||
    require("../extras/env").ConfigVariables.mysqlDatabase;
exports.Config = Config;
//# sourceMappingURL=config.js.map