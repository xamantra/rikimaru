import sqlite3, { Database, Statement } from "sqlite3";

export class DataHelper {
  public static Init(): void {
    const db: Database = this.DB;
    db.run(
      "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_id TEXT)"
    );
    db.run(
      // tslint:disable-next-line:max-line-length
      "CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY AUTOINCREMENT, mal_id INTEGER, title Text, next_airing_episode INTEGER, time_until_airing INTEGER)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY AUTOINCREMENT, media_id INTEGER, user_id INTEGER)"
    );
    console.log(`Constructed: "${DataHelper.name}"`);
  }

  public static get DB(): Database {
    return new sqlite3.Database("data/rikimaru.db", function(err: Error): void {
      if (err !== null) {
        console.log(err);
      }
    });
  }
}