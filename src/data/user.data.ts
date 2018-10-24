import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Query } from "../core/query";
import { MySqlResult } from "../models/result.mysql.model";

export class UserData {
  private static UserList: User[] = [];
  public static Init() {
    Query.Execute(DataHelper.UserSelectAll(), async result => {
      const users = await JsonHelper.ArrayConvert<User>(result, User);
      await users.forEach(async user => {
        await this.UserList.push(user);
      });
      await console.log(`User List: ${this.UserList}`);
    });
  }

  public static GetUser(
    discordId: string,
    callback?: (user?: User, err?: boolean) => void
  ) {
    const user = this.All.find(x => x.DiscordId === discordId);
    if (user !== null && user !== undefined) {
      callback(user, false);
    } else {
      callback(null, true);
    }
  }

  public static Insert(
    discordId: string,
    callback: (insertId: number) => void = null
  ) {
    this.Exists(discordId, async exists => {
      if (exists === false) {
        await Query.Execute(DataHelper.UserInsert(discordId), async result => {
          try {
            const res = await JsonHelper.Convert<MySqlResult>(
              result,
              MySqlResult
            );
            if (
              res !== null &&
              res !== undefined &&
              res.InsertId !== null &&
              res.InsertId !== undefined
            ) {
              const user = new User();
              user.Id = res.InsertId;
              user.DiscordId = discordId;
              await this.UserList.push(user);
              if (callback !== null) await callback(res.InsertId);
            }
          } catch (error) {
            await console.log(error);
          }
        });
      }
    });
  }

  public static get All() {
    return this.UserList;
  }

  public static Exists(
    discordId: string,
    callback?: (exists: boolean) => void
  ) {
    Query.Execute(DataHelper.UserSelect(discordId), async result => {
      const user = await JsonHelper.ArrayConvert<User>(result, User)[0];
      if (user === undefined || user === null) {
        await callback(false);
      } else {
        await callback(true);
      }
    });
  }

  public static LogAll() {
    this.All.forEach(async user => {
      await console.log(user);
    });
  }
}
