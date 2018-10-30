"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get BOT_TOKEN() {
        return process.env.BOT_TOKEN || require("../extras/env").env.BOT_TOKEN;
    }
    static get COMMAND_PREFIX() {
        return (process.env.COMMAND_PREFIX || require("../extras/env").env.COMMAND_PREFIX);
    }
    static get MYSQL_HOST() {
        return process.env.MYSQL_HOST || require("../extras/env").env.MYSQL_HOST;
    }
    static get MYSQL_PORT() {
        return (Number(process.env.MYSQL_PORT) || require("../extras/env").env.MYSQL_PORT);
    }
    static get MYSQL_USERNAME() {
        return (process.env.MYSQL_USERNAME || require("../extras/env").env.MYSQL_USERNAME);
    }
    static get MYSQL_PASSWORD() {
        return (process.env.MYSQL_PASSWORD || require("../extras/env").env.MYSQL_PASSWORD);
    }
    static get MYSQL_DATABASE() {
        return (process.env.MYSQL_DATABASE || require("../extras/env").env.MYSQL_DATABASE);
    }
    static get MYSQL_TIMEOUT() {
        return (Number(process.env.MYSQL_TIMEOUT) ||
            require("../extras/env").env.MYSQL_TIMEOUT);
    }
    static get MYSQL_CONNECTION_TIMEOUT() {
        return (Number(process.env.MYSQL_CONNECTION_TIMEOUT) ||
            require("../extras/env").env.MYSQL_CONNECTION_TIMEOUT);
    }
    static get MYSQL_CONNECTION_LIMIT() {
        return (Number(process.env.MYSQL_CONNECTION_LIMIT) ||
            require("../extras/env").env.MYSQL_CONNECTION_LIMIT);
    }
    static get MONGO_URL() {
        return process.env.MONGO_URL || require("../extras/env").env.MONGO_URL;
    }
    static get MONGO_BASE() {
        return process.env.MONGO_BASE || require("../extras/env").env.MONGO_BASE;
    }
    static get MONGO_USERNAME() {
        return (process.env.MONGO_USERNAME || require("../extras/env").env.MONGO_USERNAME);
    }
    static get MONGO_PASSWORD() {
        return (process.env.MONGO_PASSWORD || require("../extras/env").env.MONGO_PASSWORD);
    }
    static get MONGO_DATABASE() {
        return (process.env.MONGO_DATABASE || require("../extras/env").env.MONGO_DATABASE);
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map