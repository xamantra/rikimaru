import { RunResult } from "sqlite3";
import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";

export class UserData {
  private static UserList: User[] = [];
  public static Init() {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM user`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const user = converter.deserialize(row, User) as User;
            this.UserList.push(user);
            console.log(user);
          } catch (error) {
            console.log(err);
          }
        }
      });
    });
  }

  public static GetUser(discordId: string) {
    let u: User;
    if (this.UserList.length === 0) {
      u = new User();
      u.Id = 1;
      u.DiscordId = discordId;
    } else {
      this.UserList.forEach(user => {
        if (user.DiscordId === discordId) {
          u = user;
        }
      });
    }
    return u;
  }

  public static Add(discordId: string) {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO user (discord_id) VALUES('${discordId}')`,
        (result: RunResult, err: Error) => {
          if (err !== undefined) {
            console.log(err);
          } else {
            db.each(
              `SELECT * FROM user WHERE discord_id='${discordId}'`,
              (e: Error, row: any) => {
                this.UserList.push(converter.deserialize(row, User));
              }
            );
          }
        }
      );
    });
  }

  public static get All() {
    return this.UserList;
  }

  public static Exists(id: string) {
    let e = false;
    this.UserList.forEach(async user => {
      if (user.DiscordId === id) {
        e = true;
      }
    });
    return e;
  }

  public static LogAll() {
    this.All.forEach(user => {
      console.log(user);
    });
  }
}
