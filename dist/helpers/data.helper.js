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
    static Init() {
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
    }
    static get Conn() {
        const conn = mysql.createConnection({
            host: config_1.Config.GetMySqlHost,
            user: config_1.Config.GetMySqlUsername,
            password: config_1.Config.GetMySqlPassword,
            database: config_1.Config.GetMySqlDatabase
        });
        return conn;
    }
    static UserInsert(discordId) {
        return `INSERT IGNORE INTO ${this.user} (discord_id) VALUES('${discordId}')`;
    }
    static UserSelect(discordId) {
        return `SELECT * FROM ${this.user} WHERE discord_id='${discordId}' LIMIT 1`;
    }
    static UserSelectAll() {
        return `SELECT * FROM ${this.user}`;
    }
    static MediaInsert(mal_id, title) {
        return `INSERT IGNORE INTO ${this.media} (mal_id, title) VALUES(${mal_id}, '${title}')`;
    }
    static MediaDelete(mediaId) {
        return `DELETE FROM ${this.media} WHERE mal_id=${mediaId}`;
    }
    static MediaSelect(mal_id) {
        return `SELECT * FROM ${this.media} WHERE mal_id=${mal_id} LIMIT 1`;
    }
    static MediaSelectAll() {
        return `SELECT * FROM ${this.media}`;
    }
    static SubsInsert(mediaId, userId) {
        return `INSERT IGNORE INTO ${this.subscription} (media_id, user_id) VALUES(${mediaId},${userId})`;
    }
    static SubsDelete(mediaId, userId) {
        return `DELETE FROM ${this.subscription} WHERE media_id=${mediaId} AND user_id=${userId}`;
    }
    static SubsSelect(mediaId, userId) {
        return `SELECT * FROM ${this.subscription} WHERE media_id=${mediaId} AND user_id=${userId} LIMIT 1`;
    }
    static SubsSelectAll() {
        return `SELECT * FROM ${this.subscription}`;
    }
    static QueueInsert(mediaId, nextEpisode) {
        return `INSERT IGNORE INTO ${this.queue} (media_id, next_episode) VALUES (${mediaId}, ${nextEpisode})`;
    }
    static QueueSelect(mediaId) {
        return `SELECT * FROM ${this.queue} WHERE media_id=${mediaId}`;
    }
    static QueueSelectAll() {
        return `SELECT * FROM ${this.queue}`;
    }
    static QueueUpdate(mediaId, next_episode) {
        return `UPDATE FROM ${this.queue} WHERE id=${mediaId} SET next_episode=${next_episode}`;
    }
}
DataHelper.user = "user";
DataHelper.media = "media";
DataHelper.subscription = "subscription";
DataHelper.queue = "queue";
exports.DataHelper = DataHelper;
//# sourceMappingURL=data.helper.js.map