import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { Table } from "../core/table";
import { Mongo } from "../core/mongo";

export class UserData {
  static Initializing = false;
  public static get All() {
    return this.UserList;
  }
  private static UserList: User[] = [];

  public static async Init() {
    return new Promise<void>(async (resolve, reject) => {
      await this.OnReady();
      this.Initializing = true;
      const result = await Mongo.FindAll(Table.user);
      const users = await JsonHelper.ArrayConvert<User>(result, User);
      let iteration = 1;
      if (users !== undefined && users !== null) {
        if (users.length === 0) {
          this.Initializing = false;
          resolve();
        }
        users.forEach(user => {
          this.UserList.push(user);
          if (iteration === users.length) {
            this.Initializing = false;
            resolve();
          } else {
            iteration++;
          }
        });
      } else {
        this.Initializing = false;
        reject(
          new Error(
            `"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public static async GetUser(discordId: string) {
    return new Promise<User>(async (res, rej) => {
      await this.OnReady();
      const user = this.All.find(x => x.DiscordId === discordId);
      if (user !== null && user !== undefined) {
        res(user);
      } else {
        rej(
          new Error(
            `"this.All.find(x => x.DiscordId === discordId)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public static async GetUserById(id: string) {
    return new Promise<User>(async (resolve, reject) => {
      await this.OnReady();
      const user = this.All.find(x => x.Id === id);
      if (user !== null && user !== undefined) {
        resolve(user);
      } else {
        reject(
          new Error(
            `"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public static async Insert(discordId: string) {
    return new Promise<number>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(discordId).catch((err: Error) => {
        reject(err);
      });
      if (exists === false) {
        const data = { discord_id: discordId };
        const result = await Mongo.Insert(Table.user, data);
        if (result.insertedId !== null && result.insertedId !== undefined) {
          const user = new User();
          user.Id = result.insertedId;
          user.DiscordId = discordId;
          this.UserList.push(user);
        }
        resolve(result.insertedId);
      } else {
        reject(new Error(`DiscordId: "${discordId}" already exists.`));
      }
    });
  }

  public static async Exists(discordId: string) {
    return new Promise<boolean>(async (res, rej) => {
      await this.OnReady();
      const u = this.All.find(x => x.DiscordId === discordId);
      if (u === undefined || u === null) {
        res(false);
      } else {
        res(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise(async (res, rej) => {
      await this.OnReady();
      if (this.All === undefined || this.All === null) {
        rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
      } else {
        console.log(this.All);
        res();
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
