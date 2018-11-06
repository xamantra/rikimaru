import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { Tables } from "../core/tables";
import { User } from "../models/subscription.model";
import { Mongo } from "../core/mongo";
import { ObjectId } from "mongodb";
import { ArrayHelper } from "../helpers/array.helper";
import { MediaData } from "./media.data";
import { MediaSearch } from "../core/media.search";
import { TitleHelper } from "../helpers/title.helper";
import { AnimeCache } from "../core/anime.cache";

export class SubscriptionData {
  static Initializing = false;
  public static get All() {
    return this.SubscriptionList;
  }
  private static SubscriptionList: Subscription[] = [];

  public static async Init() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      this.Initializing = true;
      await this.Clear();
      this.Clear().catch(err => console.log(err));
      const result = await Mongo.FindAll(Tables.subscription);
      const subs = await JsonHelper.ArrayConvert<Subscription>(
        result,
        Subscription
      );
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
        for (let i = 0; i < subs.length; i++) {
          const sub = subs[i];
          this.SubscriptionList.push(sub);
          const media = await AnimeCache.Get(sub.MediaId);
          if (media !== null) {
            const user = await UserData.GetUserById(sub.UserId);
          }
          if (i === subs.length - 1) {
            this.Initializing = false;
            resolve();
          }
        }
      }
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
    return new Promise<Subscription[]>(async (resolve, reject) => {
      await this.OnReady();
      const subs: Subscription[] = [];
      this.SubscriptionList.forEach(sub => {
        if (sub.UserId === userId) {
          subs.push(sub);
        }
      });
      resolve(subs);
    });
  }

  public static async GetSubscribers(malId: number) {
    return new Promise<User[]>(async (resolve, reject) => {
      await this.OnReady();
      const subscribers: User[] = [];
      let iteration = 0;
      if (this.SubscriptionList.length === 0) {
        reject(new Error(`SubscriptionList is empty`));
      }
      this.SubscriptionList.forEach(async sub => {
        iteration++;
        if (sub.MediaId === malId) {
          const user = await UserData.GetUserById(sub.UserId).catch(err => {
            console.log(err);
            if (iteration === this.SubscriptionList.length) {
              resolve(subscribers);
            }
          });
          if (user instanceof User) subscribers.push(user);
          if (iteration === this.SubscriptionList.length) {
            resolve(subscribers);
          }
        }
      });
    });
  }

  public static async Insert(mediaId: number, userId: string) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(mediaId, userId);
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
            const data = {
              media_id: mediaId,
              user_id: new ObjectId(userId)
            };
            const result = await Mongo.Insert(Tables.subscription, data);
            if (result.insertedId !== undefined && result.insertedId !== null) {
              const sub = new Subscription();
              sub.Id = result.insertedId;
              sub.MediaId = mediaId;
              sub.UserId = userId;
              this.SubscriptionList.push(sub);
              resolve();
            }
          }
        }
      } else {
        reject("EXISTS");
      }
    });
  }

  public static async Delete(mediaId: number, discordId: string) {
    return new Promise(async (res, rej) => {
      await this.OnReady();
      const user = await UserData.GetUser(discordId).catch((reason: Error) => {
        rej(reason);
      });
      let query: any = null;
      if (user instanceof User)
        query = { media_id: mediaId, user_id: new ObjectId(user.Id) };
      await Mongo.Delete(Tables.subscription, query);
      const sub = this.SubscriptionList.find(
        x => x.MediaId === mediaId && x.UserId === (user as User).Id
      );
      if (sub !== null && sub !== undefined) {
        ArrayHelper.remove(this.SubscriptionList, sub, () => {
          res();
        });
      } else {
        rej(new Error(`Nothing to remove.`));
      }
    });
  }

  public static async Exists(mediaId: number, userId: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
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
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      if (
        this.All === null ||
        this.All === undefined ||
        this.All.length === 0
      ) {
        reject(new Error(`"this.All" is 'null' or 'undefined'.`));
      } else {
        console.log(this.All);
        resolve();
      }
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
