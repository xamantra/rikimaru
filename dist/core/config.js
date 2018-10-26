"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get BOT_TOKEN() {
        return this.BotToken;
    }
    static get COMMAND_PREFIX() {
        return this.CommandPrefix;
    }
    static get MYSQL_HOST() {
        return this.MysqlHost;
    }
    static get MYSQL_PORT() {
        return this.MysqlPort;
    }
    static get MYSQL_USERNAME() {
        return this.MysqlUsername;
    }
    static get MYSQL_PASSWORD() {
        return this.MysqlPassword;
    }
    static get MYSQL_DATABASE() {
        return this.MysqlDatabase;
    }
    static get MYSQL_TIMEOUT() {
        return this.MysqlTimeout;
    }
    static get MYSQL_CONNECTION_TIMEOUT() {
        return this.MysqlConnectionTimeout;
    }
}
Config.BotToken = process.env.BOT_TOKEN || require("../extras/env").ConfigVariables.BOT_TOKEN;
Config.CommandPrefix = process.env.COMMAND_PREFIX ||
    require("../extras/env").ConfigVariables.COMMAND_PREFIX;
Config.MysqlHost = process.env.MYSQL_HOST ||
    require("../extras/env").ConfigVariables.MYSQL_HOST;
Config.MysqlPort = process.env.MYSQL_PORT ||
    require("../extras/env").ConfigVariables.MYSQL_PORT;
Config.MysqlUsername = process.env.MYSQL_USERNAME ||
    require("../extras/env").ConfigVariables.MYSQL_USERNAME;
Config.MysqlPassword = process.env.MYSQL_PASSWORD ||
    require("../extras/env").ConfigVariables.MYSQL_PASSWORD;
Config.MysqlDatabase = process.env.MYSQL_DATABASE ||
    require("../extras/env").ConfigVariables.MYSQL_DATABASE;
Config.MysqlTimeout = process.env.MYSQL_TIMEOUT ||
    require("../extras/env").ConfigVariables.MYSQL_TIMEOUT;
Config.MysqlConnectionTimeout = process.env.MYSQL_CONNECTION_TIMEOUT ||
    require("../extras/env").ConfigVariables.MYSQL_CONNECTION_TIMEOUT;
exports.Config = Config;
//# sourceMappingURL=config.js.map