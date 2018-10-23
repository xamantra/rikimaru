import { RunResult } from "sqlite3";
import { ArrayHelper } from "./../helpers/array.helper";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
const Enumerable = require("node-enumerable");

export class SubscriptionData {
  private static SubscriptionList: Subscription[] = [];

  public static Init() {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM subscription`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const sub = converter.deserialize(
              row,
              Subscription
            ) as Subscription;
            this.SubscriptionList.push(sub);
            console.log(sub);
          } catch (error) {
            console.log(err);
          }
        }
      });
    });
  }

  public static Add(mediaId: number, userId: number) {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO subscription (media_id, user_id) VALUES(${mediaId},${userId})`,
        (result: RunResult, err: Error) => {
          if (err !== undefined) {
            console.log(err.message);
          } else {
            db.each(
              `SELECT * FROM subscription WHERE media_id=${mediaId} AND user_id=${userId}`,
              (e: Error, row: any) => {
                this.SubscriptionList.push(
                  converter.deserialize(row, Subscription)
                );
              }
            );
          }
        }
      );
    });
  }

  public static Delete(
    mediaId: number,
    discordId: string,
    callback?: () => void
  ) {
    const db = DataHelper.DB;
    const userId = UserData.All.find(x => x.DiscordId === discordId).Id;
    let called = false;
    db.serialize(() => {
      db.run(
        `DELETE FROM subscription WHERE media_id=${mediaId} AND user_id=${userId}`,
        (result: RunResult, err: Error) => {
          if (err !== undefined) {
            console.log(err.message);
          } else {
            const sub = this.SubscriptionList.find(
              x => x.MediaId === mediaId && x.UserId === userId
            );
            ArrayHelper.remove(this.SubscriptionList, sub);
            !called ? callback() : (called = true);
          }
        }
      );
    });
  }

  public static Exists(mediaId: number, userId: number) {
    let e = false;
    this.SubscriptionList.forEach(sub => {
      if (sub.MediaId === mediaId && sub.UserId === userId) {
        e = true;
      }
    });
    return e;
  }

  public static get All() {
    return this.SubscriptionList;
  }

  public static LogAll() {
    this.All.forEach(sub => {
      console.log(sub);
    });
  }
}
