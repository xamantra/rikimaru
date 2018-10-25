import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Query } from "../core/query";
import { MySqlResult } from "../models/result.mysql.model";

export class UserData {
  constructor() {}
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get All() {
    return this.UserList;
  }
  private static _instance: UserData;
  private UserList: User[] = [];
  private DataHelper = DataHelper.Instance;

  public async Init() {
    return new Promise<void>((res, rej) => {
      Query.Execute(this.DataHelper.UserSelectAll(), async result => {
        const users = await JsonHelper.ArrayConvert<User>(result, User);
        if (users !== undefined && users !== null) {
          await users.forEach(user => {
            this.UserList.push(user);
          });
          res();
        } else {
          rej(
            new Error(
              `"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`
            )
          );
        }
      });
    });
  }

  public async GetUser(discordId: string) {
    return new Promise<User>(async (res, rej) => {
      const user = await this.All.find(x => x.DiscordId === discordId);
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

  public async Insert(discordId: string) {
    return new Promise<number>((res, rej) => {
      this.Exists(discordId).then(exists => {
        if (exists === false) {
          Query.Execute(this.DataHelper.UserInsert(discordId), async result => {
            try {
              const myRes = await JsonHelper.Convert<MySqlResult>(
                result,
                MySqlResult
              );
              if (
                myRes !== null &&
                myRes !== undefined &&
                myRes.InsertId !== null &&
                myRes.InsertId !== undefined
              ) {
                const user = new User();
                user.Id = myRes.InsertId;
                user.DiscordId = discordId;
                await this.UserList.push(user);
              }
              res(myRes.InsertId);
            } catch (error) {
              rej(new Error(`Unknown error occured.`));
            }
          });
        } else {
          rej(new Error(`DiscordId: "${discordId}" already exists.`));
        }
      });
    });
  }

  public async Exists(discordId: string) {
    return new Promise<boolean>(async (res, rej) => {
      const u = await this.All.find(x => x.DiscordId === discordId);
      if (u === undefined || u === null) {
        res(false);
      } else {
        res(true);
      }
    });
  }

  public async LogAll() {
    return new Promise(async (res, rej) => {
      if (this.All === undefined || this.All === null) {
        rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
      } else {
        await this.All.forEach(user => {
          console.log(`User:`, user);
        });
        res();
      }
    });
  }
}
