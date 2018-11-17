import { Mongo } from "../core/mongo";
import { Table } from "../core/table";
import { MalBind } from "../models/mal.bind.model";
import { JsonHelper } from "../helpers/json.helper";
import { ArrayHelper } from "../helpers/array.helper";

export class MalBindData {
  public static List: MalBind[] = [];
  public static Initializing = false;

  public static Init() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      this.Initializing = true;
      const results = await Mongo.FindAll(Table.malbind);
      const list = await JsonHelper.ArrayConvert<MalBind>(results, MalBind);
      if (list === undefined || list === null) {
        this.Initializing = false;
        console.log(
          `JsonHelper.ArrayConvert<MalSync>(results, MalSync) is 'null' or 'undefined'.`
        );
        resolve();
      } else {
        if (list.length === 0) {
          this.Initializing = false;
          console.log(`MalBind List Length: ${this.List.length}`);
          resolve();
        } else {
          this.List = list;
          this.Initializing = false;
          console.log(`MalBind List Length: ${this.List.length}`);
          resolve();
        }
      }
    });
  }

  public static Insert(discordId: string, malUsername: string, code: string) {
    return new Promise<MalBind>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(discordId);
      if (exists === false) {
        const data = {
          discord_id: discordId,
          mal_username: malUsername,
          code: code,
          verified: false
        };
        const result = await Mongo.Insert(Table.malbind, data);
        console.log(result.insertedId);
        const malsync = new MalBind();
        malsync.Id = result.insertedId;
        malsync.DiscordId = discordId;
        malsync.MalUsername = malUsername;
        malsync.Code = code;
        malsync.Verified = false;
        this.List.push(malsync);
        resolve(malsync);
      } else {
        resolve(this.All.find(x => x.DiscordId === discordId));
      }
    });
  }

  public static get All() {
    return this.List;
  }

  public static Verify(discordId: string) {
    return new Promise<MalBind>(async (resolve, reject) => {
      await this.OnReady();
      const query = { discord_id: discordId };
      const newValue = { $set: { verified: true } };
      await Mongo.Update(Table.malbind, query, newValue);
      const oldValue = await this.Get(discordId);
      ArrayHelper.remove(this.List, oldValue, async () => {
        const res = await Mongo.FindOne(Table.malbind, query);
        const ms = await JsonHelper.ArrayConvert<MalBind>(res, MalBind);
        const m = ms[0];
        console.log(`Update MAL bind: ${m.Code}`);
        if (m !== null && m !== undefined) {
          this.List.push(m);
          resolve(m);
        } else {
          console.log(
            `JsonHelper.Convert<MalSync>(res, MalSync) is 'null' or 'undefined'.`
          );
          resolve(null);
        }
      });
    });
  }

  public static Exists(discordId: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
      const malsync = this.List.find(m => m.DiscordId === discordId);
      if (malsync === null || malsync === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static Get(discordId: string) {
    return new Promise<MalBind>(async (resolve, reject) => {
      await this.OnReady();
      let iteration = 0;
      if (this.List.length === 0) {
        console.log(`List is empty.`);
        resolve(null);
      }
      this.List.forEach(m => {
        iteration++;
        if (m.DiscordId === discordId) {
          resolve(m);
        } else {
          if (iteration === this.List.length) {
            console.log(
              `this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`
            );
            resolve(null);
          }
        }
      });
    });
  }

  public static LogAll() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
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
