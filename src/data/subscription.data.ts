import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { User } from "../models/subscription.model";
import { Mongo } from "../core/mongo";
import { ObjectId } from "mongodb";
import { ArrayHelper } from "../helpers/array.helper";

export class SubscriptionData {
  static Initializing = false;
  public static get All() {
    return this.SubscriptionList;
  }
  private static SubscriptionList: Subscription[] = [];

  public static async Init() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        this.Initializing = true;
        this.Clear()
          .then(() => {
            Mongo.FindAll(DataHelper.subscription).then(async result => {
              const subs = await JsonHelper.ArrayConvert<Subscription>(
                result,
                Subscription
              );
              // console.log(subs);
              if (subs === null || subs === undefined) {
                this.Initializing = false;
                reject(
                  new Error(
                    `JsonHelper.ArrayConvert<Subscription>(result,Subscription);`
                  )
                );
              } else {
                if (subs.length === 0) {
                  this.Initializing = false;
                  resolve();
                }
                subs.forEach(sub => {
                  this.SubscriptionList.push(sub);
                });
                this.Initializing = false;
                resolve();
              }
            });
          })
          .catch(err => console.log(err));
      });
    });
  }

  public static Clear() {
    return new Promise((resolve, reject) => {
      this.SubscriptionList.length = 0;
      this.SubscriptionList.splice(0, this.SubscriptionList.length);
      if (this.SubscriptionList.length === 0) {
        resolve();
      } else {
        reject(new Error(`Array was not cleared.`));
      }
    });
  }

  public static async GetUserSubs(userId: string) {
    return new Promise<Subscription[]>((resolve, reject) => {
      this.OnReady().then(() => {
        const subs: Subscription[] = [];
        this.SubscriptionList.forEach(sub => {
          if (sub.UserId === userId) {
            subs.push(sub);
            // console.log(`Pushed: ${sub.Id}`);
          }
        });
        resolve(subs);
      });
    });
  }

  public static async GetSubscribers(malId: number) {
    return new Promise<User[]>((resolve, reject) => {
      this.OnReady().then(() => {
        const subscribers: User[] = [];
        let iteration = 0;
        if (this.SubscriptionList.length === 0) {
          reject(new Error(`SubscriptionList is empty`));
        }
        this.SubscriptionList.forEach(sub => {
          iteration++;
          if (sub.MediaId === malId) {
            UserData.GetUserById(sub.UserId)
              .then(user => {
                console.log(`Subscriber found: "${user.DiscordId}"`);
                subscribers.push(user);
                if (iteration === this.SubscriptionList.length) {
                  console.log(`Resolving subscribers...`);
                  resolve(subscribers);
                }
              })
              .catch(err => {
                console.log(err);
                if (iteration === this.SubscriptionList.length) {
                  console.log(`Resolving subscribers...`);
                  resolve(subscribers);
                }
              });
          }
        });
      });
    });
  }

  public static async Insert(mediaId: number, userId: string) {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        console.log(`checking if it exists.`);
        this.Exists(mediaId, userId).then(async exists => {
          if (exists === false) {
            console.log(`doesn't exists`);
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
                const data = {
                  media_id: mediaId,
                  user_id: new ObjectId(userId)
                };
                Mongo.Insert(DataHelper.subscription, data).then(
                  async result => {
                    console.log(`new sub added: ${result.insertedId}`);
                    if (
                      result.insertedId !== undefined &&
                      result.insertedId !== null
                    ) {
                      const sub = new Subscription();
                      sub.Id = result.insertedId;
                      sub.MediaId = mediaId;
                      sub.UserId = userId;
                      this.SubscriptionList.push(sub);
                      resolve();
                    }
                  }
                );
              }
            }
          } else {
            reject("EXISTS");
          }
        });
      });
    });
  }

  public static async Delete(mediaId: number, discordId: string) {
    return new Promise((res, rej) => {
      this.OnReady().then(() => {
        UserData.GetUser(discordId)
          .then(user => {
            const query = { media_id: mediaId, user_id: new ObjectId(user.Id) };
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
                  res();
                });
              } else {
                rej(new Error(`Nothing to remove.`));
              }
            });
          })
          .catch((reason: Error) => {
            rej(reason);
          });
      });
    });
  }

  public static async Exists(mediaId: number, userId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.OnReady().then(() => {
        const sub = this.All.find(
          x => x.MediaId === mediaId && x.UserId === userId
        );
        if (sub === null || sub === undefined) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static async LogAll() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
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
    });
  }

  public static OnReady() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.Initializing === false) {
          resolve();
        }
      }, 1);
    });
  }
}
