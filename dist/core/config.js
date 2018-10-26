"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../extras/env");
class Config {
    static get BOT_TOKEN() {
        return process.env.BOT_TOKEN || env_1.env.BOT_TOKEN;
    }
    static get COMMAND_PREFIX() {
        return process.env.COMMAND_PREFIX || env_1.env.COMMAND_PREFIX;
    }
    static get MYSQL_HOST() {
        return process.env.MYSQL_HOST || env_1.env.MYSQL_HOST;
    }
    static get MYSQL_PORT() {
        return Number(process.env.MYSQL_PORT) || env_1.env.MYSQL_PORT;
    }
    static get MYSQL_USERNAME() {
        return process.env.MYSQL_USERNAME || env_1.env.MYSQL_USERNAME;
    }
    static get MYSQL_PASSWORD() {
        return process.env.MYSQL_PASSWORD || env_1.env.MYSQL_PASSWORD;
    }
    static get MYSQL_DATABASE() {
        return process.env.MYSQL_DATABASE || env_1.env.MYSQL_DATABASE;
    }
    static get MYSQL_TIMEOUT() {
        return Number(process.env.MYSQL_TIMEOUT) || env_1.env.MYSQL_TIMEOUT;
    }
    static get MYSQL_CONNECTION_TIMEOUT() {
        return (Number(process.env.MYSQL_CONNECTION_TIMEOUT) ||
            env_1.env.MYSQL_CONNECTION_TIMEOUT);
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map