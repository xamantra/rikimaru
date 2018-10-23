import sqlite3, { Database, Statement } from "sqlite3";

export class DataHelper {
  public static Init() {
    const db = this.DB;
    db.run(
      "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_id TEXT)"
    );
    db.run(
      // tslint:disable-next-line:max-line-length
      "CREATE TABLE IF NOT EXISTS media (mal_id INTEGER PRIMARY KEY, title Text)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY AUTOINCREMENT, media_id INTEGER, user_id INTEGER)"
    );
    console.log(`Constructed: "${DataHelper.name}"`);
  }

  public static get DB() {
    return new sqlite3.Database("data/rikimaru.db", function(err: Error): void {
      if (err !== null) {
        console.log(err);
      }
    });
  }
}
