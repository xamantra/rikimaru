import { User } from "../models/subscription.model";
import { MediaResult } from "./../core/media.result";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Query } from "../core/query";
import { MySqlResult } from "../models/result.mysql.model";
import { Message } from "discord.js";

export class UserData {
  public static get All() {
    return this.UserList;
  }
  private static UserList: User[] = [];
  private static DataHelper = DataHelper.Instance;

  public static async Init() {
    return new Promise<void>(async (res, rej) => {
      Query.Execute(this.DataHelper.UserSelectAll()).then(async result => {
        const users = await JsonHelper.ArrayConvert<User>(result, User);
        let iteration = 1;
        if (users !== undefined && users !== null) {
          users.forEach(user => {
            this.UserList.push(user);
            if (iteration === users.length) {
              res();
            } else {
              iteration++;
            }
          });
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

  public static async GetUser(discordId: string) {
    return new Promise<User>((res, rej) => {
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

  public static async GetUserById(id: number) {
    return new Promise<User>((res, rej) => {
      const user = this.All.find(x => x.Id === id);
      if (user !== null && user !== undefined) {
        res(user);
      } else {
        rej(
          new Error(
            `"this.All.find(x => x.Id === id)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public static async Insert(discordId: string) {
    return new Promise<number>(async (res, rej) => {
      this.Exists(discordId)
        .then(exists => {
          if (exists === false) {
            Query.Execute(
              this.DataHelper.UserInsert(discordId),
              async result => {
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
                    this.UserList.push(user);
                  }
                  res(myRes.InsertId);
                } catch (error) {
                  rej(new Error(`Unknown error occured.`));
                }
              }
            );
          } else {
            rej(new Error(`DiscordId: "${discordId}" already exists.`));
          }
        })
        .catch((err: Error) => {
          rej(err);
        });
    });
  }

  public static async Exists(discordId: string) {
    return new Promise<boolean>((res, rej) => {
      const u = this.All.find(x => x.DiscordId === discordId);
      if (u === undefined || u === null) {
        res(false);
      } else {
        res(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise((res, rej) => {
      if (this.All === undefined || this.All === null) {
        rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
      } else {
        this.All.forEach(user => {
          console.log(user);
        });
        res();
      }
    });
  }
}
