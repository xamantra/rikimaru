import { User } from "../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Mongo } from "../core/mongo";

export class UserData {
  static Initializing = false;
  public static get All() {
    return this.UserList;
  }
  private static UserList: User[] = [];

  public static async Init() {
    return new Promise<void>(async (resolve, reject) => {
      this.OnReady().then(() => {
        console.log(`user data init...`);
        this.Initializing = true;
        Mongo.FindAll(DataHelper.user).then(async result => {
          console.log(`awaiting for array convert...`);
          const users = await JsonHelper.ArrayConvert<User>(result, User);
          console.log(`awaiting for iteration...`);
          let iteration = 1;
          if (users !== undefined && users !== null) {
            if (users.length === 0) {
              console.log(`user data finishing init`);
              this.Initializing = false;
              resolve();
            }
            console.log(`awaiting for user.forEach...`);
            users.forEach(user => {
              this.UserList.push(user);
              console.log(`user....`);
              console.log(user);
              if (iteration === users.length) {
                this.Initializing = false;
                resolve();
              } else {
                iteration++;
              }
            });
          } else {
            console.log(`user data finishing init`);
            this.Initializing = false;
            reject(
              new Error(
                `"JsonHelper.ArrayConvert<User>(result, User)" is 'null' or 'undefined'.`
              )
            );
          }
        });
      });
    });
  }

  public static async GetUser(discordId: string) {
    return new Promise<User>((res, rej) => {
      this.OnReady().then(() => {
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
    });
  }

  public static async GetUserById(id: string) {
    return new Promise<User>((res, rej) => {
      this.OnReady().then(() => {
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
    });
  }

  public static async Insert(discordId: string) {
    return new Promise<number>(async (resolve, reject) => {
      this.OnReady().then(() => {
        this.Exists(discordId)
          .then(exists => {
            if (exists === false) {
              const data = { discord_id: discordId };
              Mongo.Insert(DataHelper.user, data).then(result => {
                console.log(result.insertedId);
                if (
                  result.insertedId !== null &&
                  result.insertedId !== undefined
                ) {
                  const user = new User();
                  user.Id = result.insertedId;
                  user.DiscordId = discordId;
                  this.UserList.push(user);
                }
                resolve(result.insertedId);
              });
            } else {
              reject(new Error(`DiscordId: "${discordId}" already exists.`));
            }
          })
          .catch((err: Error) => {
            reject(err);
          });
      });
    });
  }

  public static async Exists(discordId: string) {
    return new Promise<boolean>((res, rej) => {
      this.OnReady().then(() => {
        const u = this.All.find(x => x.DiscordId === discordId);
        if (u === undefined || u === null) {
          res(false);
        } else {
          res(true);
        }
      });
    });
  }

  public static async LogAll() {
    return new Promise((res, rej) => {
      this.OnReady().then(() => {
        if (this.All === undefined || this.All === null) {
          rej(new Error(`"UserData.All" is 'null' or 'undefined'.`));
        } else {
          this.All.forEach(user => {
            console.log(user);
          });
          res();
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
