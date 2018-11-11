import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { JsonHelper } from "../helpers/json.helper";
import { Tables } from "../core/tables";
import { User, Subscription } from "../models/subscription.model";
import { Mongo } from "../core/mongo";
import { ObjectId } from "mongodb";
import { ArrayHelper } from "../helpers/array.helper";
import { AnimeCache } from "../core/anime.cache";
import { NullCheck } from "../helpers/null.checker.helper";

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
        console.log(
          `JsonHelper.ArrayConvert<Subscription>(result,Subscription);`
        );
        resolve();
      } else {
        if (subs.length === 0) {
          this.Initializing = false;
          console.log(`Subs List Length: ${this.SubscriptionList.length}`);
          resolve();
        } else {
          this.SubscriptionList = subs;
          for (let i = 0; i < subs.length; i++) {
            const sub = subs[i];
            await AnimeCache.Get(sub.MediaId);
            if (i === subs.length - 1) {
              this.Initializing = false;
              console.log(`Subs List Length: ${this.SubscriptionList.length}`);
              resolve();
            }
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
      if (this.SubscriptionList.length === 0) {
        resolve(subscribers);
      }
      const subs = this.SubscriptionList.filter(x => x.MediaId === malId);
      if (subs.length === 0) {
        resolve(subscribers);
      }
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        const user = await UserData.GetUserById(sub.UserId);
        if (NullCheck.Fine(user)) subscribers.push(user);
        if (i === subs.length - 1) {
          resolve(subscribers);
        }
      }
    });
  }

  public static async Insert(mediaId: number, userId: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(mediaId, userId);
      if (exists === false) {
        const user = UserData.All.find(x => x.Id === userId);
        if (user === null || user === undefined) {
          resolve(true);
        } else {
          const queue = QueueData.GetQueue(mediaId);
          if (queue === null || queue === undefined) {
            resolve(true);
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
              resolve(true);
            }
          }
        }
      } else {
        resolve(false);
      }
    });
  }

  public static async Delete(mediaId: number, discordId: string) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      const user = await UserData.GetUser(discordId);
      let query: any = null;
      if (user !== null)
        query = { media_id: mediaId, user_id: new ObjectId(user.Id) };
      await Mongo.Delete(Tables.subscription, query);
      const sub = this.SubscriptionList.find(
        x => x.MediaId === mediaId && x.UserId === (user as User).Id
      );
      if (sub !== null && sub !== undefined) {
        ArrayHelper.remove(this.SubscriptionList, sub, () => {
          resolve();
        });
      } else {
        resolve();
        console.log(`Nothing to remove.`);
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
