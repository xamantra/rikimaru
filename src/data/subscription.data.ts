import { Database, RunResult } from "sqlite3";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { JsonConvert } from "json2typescript";

export class SubscriptionData {
  private static SubscriptionList: Subscription[] = [];
  public static Init(): void {
    const db: Database = DataHelper.DB;
    const converter: JsonConvert = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM subscription`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const sub: Subscription = converter.deserialize(
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

  public static Add(mediaId: string, userId: string): void {
    const db: Database = DataHelper.DB;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO subscription (media_id, user_id) VALUES("${mediaId}","${userId}")`,
        (result: RunResult, err: Error) => {
          if (err.message !== null) {
            console.log(err.message);
          }
        }
      );
    });
  }

  public static get All(): Subscription[] {
    return this.SubscriptionList;
  }
}
