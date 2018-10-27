import { Query } from "./../core/query";
import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";

export class SubscriptionData {
  public static get All() {
    return this.SubscriptionList;
  }
  private static DataHelper = DataHelper.Instance;
  private static SubscriptionList: Subscription[] = [];

  public static async Init() {
    return new Promise((resolve, reject) => {
      Query.Execute(this.DataHelper.SubsSelectAll(), async result => {
        const subs = await JsonHelper.ArrayConvert<Subscription>(result, Subscription);
        console.log(subs);
        if (subs === null || subs === undefined) {
          reject(new Error(`JsonHelper.ArrayConvert<Subscription>(result,Subscription);`));
        } else {
          subs.forEach(sub => { this.SubscriptionList.push(sub); });
          resolve();
        }
      });
    });
  }

  public static async GetUserSubs(userId: number) {
    return new Promise<Subscription[]>((resolve, reject) => {
      const subs: Subscription[] = [];
      this.SubscriptionList.forEach(sub => {
        if (sub.UserId === userId) {
          subs.push(sub);
        }
      });
      resolve(subs);
    });
  }

  public static async Insert(mediaId: number, userId: number) {
    return new Promise((resolve, reject) => {
      this.Exists(mediaId, userId).then(async exists => {
        if (exists === false) {
          const user = UserData.All.find(x => x.Id === userId);
          if (user === null || user === undefined) {
            reject(`"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`);
          } else {
            const queue = QueueData.All.find(x => x.MediaId === mediaId);
            if (queue === null || queue === undefined) {
              reject(`"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`);
            } else {
              Query.Execute(
                this.DataHelper.SubsInsert(mediaId, userId),
                async result => {
                  const res = await JsonHelper.Convert<MySqlResult>(result, MySqlResult);
                  if (res.InsertId !== undefined && res.InsertId !== null) {
                    const sub = new Subscription();
                    sub.Id = res.InsertId;
                    sub.MediaId = mediaId;
                    sub.UserId = userId;
                    this.SubscriptionList.push(sub);
                  }
                  resolve();
                }
              );
            }
          }
        } else {
          reject("EXISTS");
        }
      });
    });
  }

  public static async Delete(mediaId: number, discordId: string) {
    return new Promise((res, rej) => {
      UserData.GetUser(discordId)
        .then(user => {
          Query.Execute(
            this.DataHelper.SubsDelete(mediaId, user.Id),
            result => {
              const sub = this.SubscriptionList.find(x => x.MediaId === mediaId && x.UserId === user.Id);
              if (sub !== null && sub !== undefined) {
                const queueJob = QueueData.GetJobs.find(x => x.user.DiscordId === discordId && x.media.idMal === mediaId);
                ArrayHelper.remove(this.SubscriptionList, sub, () => { QueueData.RemoveJob(queueJob); });
                res();
              } else {
                rej(new Error(`"this.SubscriptionList.find(   x => x.MediaId === mediaId && x.UserId === user.Id )" is 'null' or 'undefined'.`));
              }
            }
          );
        })
        .catch((reason: Error) => { rej(reason); });
    });
  }

  public static async Exists(mediaId: number, userId: number) {
    return new Promise<boolean>((resolve, reject) => {
      const sub = this.All.find(x => x.MediaId === mediaId && x.UserId === userId);
      if (sub === null || sub === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise((resolve, reject) => {
      if (this.All === null || this.All === undefined || this.All.length === 0) {
        reject(new Error(`"this.All" is 'null' or 'undefined'.`));
      } else {
        this.All.forEach(sub => { console.log(sub); });
        resolve();
      }
    });
  }
}
