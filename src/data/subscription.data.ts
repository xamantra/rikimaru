import { Query } from "./../core/query";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";

export class SubscriptionData {
  private static SubscriptionList: Subscription[] = [];

  public static Init() {
    Query.Execute(DataHelper.SubsSelectAll(), async result => {
      const subs = await JsonHelper.ArrayConvert<Subscription>(
        result,
        Subscription
      );
      await subs.forEach(async sub => {
        await this.SubscriptionList.push(sub);
      });
    });
  }

  public static GetSub(
    mediaId: number,
    userId: number,
    callback?: (sub: Subscription, err: boolean) => void
  ) {
    const sub = this.All.find(
      x => x.MediaId === mediaId && x.UserId === userId
    );
    if (sub !== null && sub !== undefined) {
      callback(sub, false);
    } else {
      callback(null, true);
    }
  }

  public static async Insert(
    mediaId: number,
    userId: number,
    callback?: () => void
  ) {
    await this.Exists(mediaId, userId, async exists => {
      if (exists === false) {
        await Query.Execute(
          await DataHelper.SubsInsert(mediaId, userId),
          async result => {
            const res = await JsonHelper.Convert<MySqlResult>(
              result,
              MySqlResult
            );
            if (res.InsertId !== undefined && res.InsertId !== null) {
              const sub = new Subscription();
              sub.Id = res.InsertId;
              sub.MediaId = mediaId;
              sub.UserId = userId;
              await this.SubscriptionList.push(sub);
              if (callback !== null) {
                await callback();
              }
            }
          }
        );
      }
    });
  }

  public static async Delete(
    mediaId: number,
    discordId: string,
    callback?: () => void
  ) {
    await UserData.GetUser(discordId, async (user, err) => {
      if (err === false) {
        await Query.Execute(
          DataHelper.SubsDelete(mediaId, user.Id),
          async result => {
            await console.log(result);
            const sub = await this.SubscriptionList.find(
              x => x.MediaId === mediaId && x.UserId === user.Id
            );
            if (sub !== null || sub !== undefined) {
              await ArrayHelper.remove(this.SubscriptionList, sub, async () => {
                if (callback !== null) {
                  await callback();
                }
              });
            }
          }
        );
      } else {
        console.log("Delete Error.");
      }
    });
  }

  public static Exists(
    mediaId: number,
    userId: number,
    callback?: (exists: boolean) => void
  ) {
    const sub = this.All.find(
      x => x.MediaId === mediaId && x.UserId === userId
    );
    if (sub === null || sub === undefined) {
      callback(false);
    } else {
      callback(true);
    }
  }

  public static get All() {
    return this.SubscriptionList;
  }

  public static LogAll() {
    this.All.forEach(async sub => {
      await console.log(sub);
    });
  }
}
