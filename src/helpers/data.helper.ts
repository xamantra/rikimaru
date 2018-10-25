import * as mysql from "mysql";
import { Query } from "./../core/query";
import { Config } from "../core/config";

export class DataHelper {
  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public static get Conn() {
    const conn = mysql.createConnection({
      host: Config.GetMySqlHost,
      user: Config.GetMySqlUsername,
      password: Config.GetMySqlPassword,
      database: Config.GetMySqlDatabase,
      timeout: 10000,
      connectTimeout: 60000
    });
    return conn;
  }

  private static _instance: DataHelper;
  private user = "user";
  private media = "media";
  private subscription = "subscription";
  private queue = "queue";

  public Init() {
    return new Promise((resolve, reject) => {
      const userTable =
        "CREATE TABLE IF NOT EXISTS `user` (`id` int(255) NOT NULL AUTO_INCREMENT,`discord_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
      const mediaTable =
        "CREATE TABLE IF NOT EXISTS `media` (`mal_id` int(255) NOT NULL,`title` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,PRIMARY KEY (`mal_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
      const subsTable =
        "CREATE TABLE IF NOT EXISTS `subscription` (`id` int(255) NOT NULL AUTO_INCREMENT,`media_id` int(255) NOT NULL,`user_id` int(255) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
      const queueTable =
        "CREATE TABLE IF NOT EXISTS `queue` (`id` int(255) NOT NULL AUTO_INCREMENT,`media_id` int(255) NOT NULL,`next_episode` int(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
      Query.Execute(userTable, result => {
        console.log(result);
      });
      Query.Execute(mediaTable, result => {
        console.log(result);
      });
      Query.Execute(subsTable, result => {
        console.log(result);
      });
      Query.Execute(queueTable, result => {
        console.log(result);
      });
    });
  }

  public UserInsert(discordId: string) {
    return `INSERT IGNORE INTO ${
      this.user
    } (discord_id) VALUES('${discordId}')`;
  }

  public UserSelect(discordId: string) {
    return `SELECT * FROM ${this.user} WHERE discord_id='${discordId}' LIMIT 1`;
  }

  public UserSelectAll() {
    return `SELECT * FROM ${this.user}`;
  }

  public MediaInsert(mal_id: number, title: string) {
    return `INSERT IGNORE INTO ${
      this.media
    } (mal_id, title) VALUES(${mal_id}, '${title}')`;
  }

  public MediaDelete(mediaId: number) {
    return `DELETE FROM ${this.media} WHERE mal_id=${mediaId}`;
  }

  public MediaSelect(mal_id: number) {
    return `SELECT * FROM ${this.media} WHERE mal_id=${mal_id} LIMIT 1`;
  }

  public MediaSelectAll() {
    return `SELECT * FROM ${this.media}`;
  }

  public SubsInsert(mediaId: number, userId: number) {
    return `INSERT IGNORE INTO ${
      this.subscription
    } (media_id, user_id) VALUES(${mediaId},${userId})`;
  }

  public SubsDelete(mediaId: number, userId: number) {
    return `DELETE FROM ${
      this.subscription
    } WHERE media_id=${mediaId} AND user_id=${userId}`;
  }

  public SubsSelect(mediaId: number, userId: number) {
    return `SELECT * FROM ${
      this.subscription
    } WHERE media_id=${mediaId} AND user_id=${userId} LIMIT 1`;
  }

  public SubsSelectAll() {
    return `SELECT * FROM ${this.subscription}`;
  }

  public QueueInsert(mediaId: number, nextEpisode: number) {
    return `INSERT IGNORE INTO ${
      this.queue
    } (media_id, next_episode) VALUES (${mediaId}, ${nextEpisode})`;
  }

  public QueueSelect(mediaId: number) {
    return `SELECT * FROM ${this.queue} WHERE media_id=${mediaId}`;
  }

  public QueueSelectAll() {
    return `SELECT * FROM ${this.queue}`;
  }

  public QueueUpdate(mediaId: number, next_episode: number) {
    return `UPDATE FROM ${
      this.queue
    } WHERE id=${mediaId} SET next_episode=${next_episode}`;
  }
}
