import { Mongo } from "../core/mongo";
import { DataHelper } from "../helpers/data.helper";
import { MalSync } from "../models/mal.model";
import { JsonHelper } from "../helpers/json.helper";
import { ArrayHelper } from "../helpers/array.helper";

export class MalBindData {
  public static List: MalSync[] = [];
  public static Initializing = false;

  public static Init() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        this.Initializing = true;
        Mongo.FindAll(DataHelper.malsync).then(async results => {
          const list = await JsonHelper.ArrayConvert<MalSync>(results, MalSync);
          if (list === undefined || list === null) {
            this.Initializing = false;
            reject(
              new Error(
                `JsonHelper.ArrayConvert<MalSync>(results, MalSync) is 'null' or 'undefined'.`
              )
            );
          } else {
            if (list.length === 0) {
              this.Initializing = false;
              resolve();
            }
            list.forEach(malsync => {
              this.List.push(malsync);
            });
            // console.log(this.List);
            this.Initializing = false;
            resolve();
          }
        });
      });
    });
  }

  public static Insert(discordId: string, malUsername: string, code: string) {
    return new Promise<MalSync>((resolve, reject) => {
      this.OnReady().then(() => {
        this.Exists(discordId)
          .then(exists => {
            if (exists === false) {
              const data = {
                discord_id: discordId,
                mal_username: malUsername,
                code: code,
                verified: false
              };
              Mongo.Insert(DataHelper.malsync, data)
                .then(result => {
                  console.log(result.insertedId);
                  const malsync = new MalSync();
                  malsync.Id = result.insertedId;
                  malsync.DiscordId = discordId;
                  malsync.MalUsername = malUsername;
                  malsync.Code = code;
                  malsync.Verified = false;
                  this.List.push(malsync);
                  console.log(`pushed: ${malsync.Code}`);
                  resolve(malsync);
                })
                .catch(err => {
                  console.log(err);
                  reject(err);
                });
            }
          })
          .catch((m: MalSync) => {
            console.log(`Already Exists, Code: ${m.Code}`);
            reject(m);
          });
      });
    });
  }

  public static Verify(discordId: string) {
    return new Promise<MalSync>((resolve, reject) => {
      this.OnReady().then(() => {
        const query = { discord_id: discordId };
        const newValue = { $set: { verified: true } };
        Mongo.Update(DataHelper.malsync, query, newValue).then(result => {
          this.Get(discordId).then(oldValue => {
            ArrayHelper.remove(this.List, oldValue, () => {
              Mongo.FindOne(DataHelper.malsync, query).then(async res => {
                const ms = await JsonHelper.ArrayConvert<MalSync>(res, MalSync);
                const m = ms[0];
                console.log(`Update MAL bind: ${m.Code}`);
                if (m !== null && m !== undefined) {
                  this.List.push(m);
                  resolve(m);
                } else {
                  reject(
                    new Error(
                      `JsonHelper.Convert<MalSync>(res, MalSync) is 'null' or 'undefined'.`
                    )
                  );
                }
              });
            });
          });
        });
      });
    });
  }

  public static Exists(discordId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.OnReady().then(() => {
        const malsync = this.List.find(m => m.DiscordId === discordId);
        if (malsync === null || malsync === undefined) {
          resolve(false);
        } else {
          reject(malsync);
        }
      });
    });
  }

  public static Get(discordId: string) {
    return new Promise<MalSync>((resolve, reject) => {
      this.OnReady().then(() => {
        console.log(this.List);
        let iteration = 0;
        if (this.List.length === 0) {
          reject(new Error(`List is empty.`));
        }
        this.List.forEach(m => {
          iteration++;
          if (m.DiscordId === discordId) {
            console.log(discordId);
            resolve(m);
          } else {
            if (iteration === this.List.length) {
              reject(
                new Error(
                  `this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`
                )
              );
            }
          }
        });
      });
    });
  }

  public static LogAll() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        if (
          this.List === null ||
          this.List === undefined ||
          this.List.length === 0
        ) {
          reject(new Error(`this.List is 'null' or 'empty'.`));
        } else {
          console.log(this.List);
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
