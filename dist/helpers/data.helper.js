"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const query_1 = require("./../core/query");
const config_1 = require("../core/config");
class DataHelper {
    constructor() {
        this.user = "user";
        this.media = "media";
        this.subscription = "subscription";
        this.queue = "queue";
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    static get Conn() {
        const conn = mysql.createConnection({
            host: config_1.Config.MYSQL_HOST,
            port: config_1.Config.MYSQL_PORT,
            user: config_1.Config.MYSQL_USERNAME,
            password: config_1.Config.MYSQL_PASSWORD,
            database: config_1.Config.MYSQL_DATABASE,
            timeout: config_1.Config.MYSQL_TIMEOUT,
            connectTimeout: config_1.Config.MYSQL_CONNECTION_TIMEOUT
        });
        return conn;
    }
    Init() {
        return new Promise((resolve, reject) => {
            const userTable = "CREATE TABLE IF NOT EXISTS `user` (`id` int(255) NOT NULL AUTO_INCREMENT,`discord_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
            const mediaTable = "CREATE TABLE IF NOT EXISTS `media` (`mal_id` int(255) NOT NULL,`title` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,PRIMARY KEY (`mal_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
            const subsTable = "CREATE TABLE IF NOT EXISTS `subscription` (`id` int(255) NOT NULL AUTO_INCREMENT,`media_id` int(255) NOT NULL,`user_id` int(255) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
            const queueTable = "CREATE TABLE IF NOT EXISTS `queue` (`id` int(255) NOT NULL AUTO_INCREMENT,`media_id` int(255) NOT NULL,`next_episode` int(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
            query_1.Query.Execute(userTable, result => {
                console.log(result);
            });
            query_1.Query.Execute(mediaTable, result => {
                console.log(result);
            });
            query_1.Query.Execute(subsTable, result => {
                console.log(result);
            });
            query_1.Query.Execute(queueTable, result => {
                console.log(result);
            });
            resolve();
        });
    }
    UserInsert(discordId) {
        return `INSERT IGNORE INTO ${this.user} (discord_id) VALUES('${discordId}')`;
    }
    UserSelect(discordId) {
        return `SELECT * FROM ${this.user} WHERE discord_id='${discordId}' LIMIT 1`;
    }
    UserSelectAll() {
        return `SELECT * FROM ${this.user}`;
    }
    MediaInsert(mal_id, title) {
        return `INSERT IGNORE INTO ${this.media} (mal_id, title) VALUES(${mal_id}, "${title}")`;
    }
    MediaDelete(mediaId) {
        return `DELETE FROM ${this.media} WHERE mal_id=${mediaId}`;
    }
    MediaSelect(mal_id) {
        return `SELECT * FROM ${this.media} WHERE mal_id=${mal_id} LIMIT 1`;
    }
    MediaSelectAll() {
        return `SELECT * FROM ${this.media}`;
    }
    SubsInsert(mediaId, userId) {
        return `INSERT IGNORE INTO ${this.subscription} (media_id, user_id) VALUES(${mediaId},${userId})`;
    }
    SubsDelete(mediaId, userId) {
        return `DELETE FROM ${this.subscription} WHERE media_id=${mediaId} AND user_id=${userId}`;
    }
    SubsSelect(mediaId, userId) {
        return `SELECT * FROM ${this.subscription} WHERE media_id=${mediaId} AND user_id=${userId} LIMIT 1`;
    }
    SubsSelectAll() {
        return `SELECT * FROM ${this.subscription}`;
    }
    QueueInsert(mediaId, nextEpisode) {
        return `INSERT IGNORE INTO ${this.queue} (media_id, next_episode) VALUES (${mediaId}, ${nextEpisode})`;
    }
    QueueSelect(mediaId) {
        return `SELECT * FROM ${this.queue} WHERE media_id=${mediaId}`;
    }
    QueueSelectAll() {
        return `SELECT * FROM ${this.queue}`;
    }
    QueueUpdate(mediaId, next_episode) {
        return `UPDATE ${this.queue} SET next_episode=${next_episode} WHERE media_id=${mediaId}`;
    }
}
exports.DataHelper = DataHelper;
//# sourceMappingURL=data.helper.js.map