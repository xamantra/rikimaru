"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    static get BOT_TOKEN() {
        return process.env.BOT_TOKEN || require("../extras/env").env.BOT_TOKEN;
    }
    static get COMMAND_PREFIX() {
        return (process.env.COMMAND_PREFIX || require("../extras/env").env.COMMAND_PREFIX);
    }
    static get MONGO_BASE() {
        return process.env.MONGO_BASE || require("../extras/env").env.MONGO_BASE;
    }
    static get MONGO_DATABASE() {
        return (process.env.MONGO_DATABASE || require("../extras/env").env.MONGO_DATABASE);
    }
    static get MAL_PROFILE_BASE() {
        return (process.env.MAL_PROFILE_BASE ||
            require("../extras/env").env.MAL_PROFILE_BASE);
    }
    static MAL_CW_LINK(username) {
        const base = process.env.MAL_CW_BASE || require("../extras/env").env.MAL_CW_BASE;
        return `${base}/${username}/load.json?status=1`;
    }
}
exports.Config = Config;
