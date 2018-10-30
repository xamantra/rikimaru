import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { User } from "../models/subscription.model";
import { Mongo } from "../core/mongo";

export class SubscriptionData {
  public static get All() {
    return this.SubscriptionList;
  }
  private static SubscriptionList: Subscription[] = [];

  public static async Init() {
    return new Promise((resolve, reject) => {
      Mongo.FindAll(DataHelper.subscription).then(async result => {
        const subs = await JsonHelper.ArrayConvert<Subscription>(
          result,
          Subscription
        );
        console.log(subs);
        if (subs === null || subs === undefined) {
          reject(
            new Error(
              `JsonHelper.ArrayConvert<Subscription>(result,Subscription);`
            )
          );
        } else {
          subs.forEach(sub => {
            this.SubscriptionList.push(sub);
          });
          resolve();
        }
      });
    });
  }

  public static async GetUserSubs(userId: string) {
    return new Promise<Subscription[]>((resolve, reject) => {
      const subs: Subscription[] = [];
      this.SubscriptionList.forEach(sub => {
        if (sub.UserId === userId) {
          subs.push(sub);
          // console.log(`Pushed: ${sub.Id}`);
        }
      });
      resolve(subs);
    });
  }

  public static async GetSubscribers(malId: number) {
    return new Promise<User[]>((resolve, reject) => {
      const subscribers: User[] = [];
      this.SubscriptionList.forEach(sub => {
        if (sub.MediaId === malId) {
          UserData.GetUserById(sub.UserId).then(user => {
            subscribers.push(user);
          });
        }
      });
      resolve(subscribers);
    });
  }

  public static async Insert(mediaId: number, userId: string) {
    return new Promise((resolve, reject) => {
      this.Exists(mediaId, userId).then(async exists => {
        if (exists === false) {
          const user = UserData.All.find(x => x.Id === userId);
          if (user === null || user === undefined) {
            reject(
              `"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`
            );
          } else {
            const queue = QueueData.All.find(x => x.MediaId === mediaId);
            if (queue === null || queue === undefined) {
              reject(
                `"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`
              );
            } else {
              const data = { media_id: mediaId, user_id: userId };
              Mongo.Insert(DataHelper.subscription, data).then(async result => {
                if (result.InsertId !== undefined && result.InsertId !== null) {
                  const sub = new Subscription();
                  sub.Id = result.InsertId;
                  sub.MediaId = mediaId;
                  sub.UserId = userId;
                  this.SubscriptionList.push(sub);
                  resolve();
                }
              });
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
          const query = { media_id: mediaId, user_id: user.Id };
          Mongo.Delete(DataHelper.subscription, query).then(() => {
            const sub = this.SubscriptionList.find(
              x => x.MediaId === mediaId && x.UserId === user.Id
            );
            if (sub !== null && sub !== undefined) {
              ArrayHelper.remove(this.SubscriptionList, sub, () => {
                console.log(
                  `User <${
                    user.DiscordId
                  }> unsubscribed to Media: "${mediaId}".`
                );
              });
              res();
            } else {
              rej(
                new Error(
                  `"this.SubscriptionList.find(   x => x.MediaId === mediaId && x.UserId === user.Id )" is 'null' or 'undefined'.`
                )
              );
            }
          });
        })
        .catch((reason: Error) => {
          rej(reason);
        });
    });
  }

  public static async Exists(mediaId: number, userId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const sub = this.All.find(
        x => x.MediaId === mediaId && x.UserId === userId
      );
      if (sub === null || sub === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise((resolve, reject) => {
      if (
        this.All === null ||
        this.All === undefined ||
        this.All.length === 0
      ) {
        reject(new Error(`"this.All" is 'null' or 'undefined'.`));
      } else {
        this.All.forEach(sub => {
          console.log(sub);
        });
        resolve();
      }
    });
  }
}
