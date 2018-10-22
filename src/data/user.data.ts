import { Database, RunResult } from "sqlite3";
import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { JsonConvert } from "json2typescript";

export class UserData {
  private static UserList: User[] = [];
  public static Init(): void {
    const db: Database = DataHelper.DB;
    const converter: JsonConvert = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM user`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const user: User = converter.deserialize(row, User) as User;
            this.UserList.push(user);
            console.log(user);
          } catch (error) {
            console.log(err);
          }
        }
      });
    });
  }

  public static Add(discordId: string): void {
    const db: Database = DataHelper.DB;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO user (discord_id) VALUES("${discordId}")`,
        (result: RunResult, err: Error) => {
          if (err.message !== null) {
            console.log(err);
          }
        }
      );
    });
  }

  public static get All(): User[] {
    return this.UserList;
  }
}
