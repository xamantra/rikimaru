import { Mongo } from "../core/mongo";
import { Table } from "../core/table";
import { JsonHelper } from "../helpers/json.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { AniBind } from "../models/ani.bind.model";

export class AniBindData {
  public static List: AniBind[] = [];
  public static Initializing = false;

  public static Init() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      this.Initializing = true;
      const results = await Mongo.FindAll(Table.aniBind);
      const list = await JsonHelper.ArrayConvert<AniBind>(results, AniBind);
      if (list === undefined || list === null) {
        this.Initializing = false;
        console.log(
          `JsonHelper.ArrayConvert<AniBind>(results, AniBind) is 'null' or 'undefined'.`
        );
        resolve();
      } else {
        if (list.length === 0) {
          this.Initializing = false;
          console.log(`AniBind List Length: ${this.List.length}`);
          resolve();
        } else {
          this.List = list;
          this.Initializing = false;
          console.log(`AniBind List Length: ${this.List.length}`);
          resolve();
        }
      }
    });
  }

  public static Insert(
    discordId: string,
    anilistId: number,
    anilistUsername: string,
    code: string
  ) {
    return new Promise<AniBind>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(discordId);
      if (exists === false) {
        const data = {
          anilist_id: anilistId,
          discord_id: discordId,
          anilist_username: anilistUsername,
          code: code,
          verified: false
        };
        const result = await Mongo.Insert(Table.aniBind, data);
        console.log(result.insertedId);
        const aniBind = new AniBind();
        aniBind.Id = result.insertedId;
        aniBind.AniListId = anilistId;
        aniBind.DiscordId = discordId;
        aniBind.AniListUsername = anilistUsername;
        aniBind.Code = code;
        aniBind.Verified = false;
        this.List.push(aniBind);
        resolve(aniBind);
      } else {
        resolve(this.All.find(x => x.DiscordId === discordId));
      }
    });
  }

  public static get All() {
    return this.List;
  }

  public static Verify(discordId: string) {
    return new Promise<AniBind>(async (resolve, reject) => {
      await this.OnReady();
      const query = { discord_id: discordId };
      const newValue = { $set: { verified: true } };
      await Mongo.Update(Table.aniBind, query, newValue);
      const oldValue = await this.Get(discordId);
      ArrayHelper.remove(this.List, oldValue, async () => {
        const res = await Mongo.FindOne(Table.aniBind, query);
        const ms = await JsonHelper.ArrayConvert<AniBind>(res, AniBind);
        const m = ms[0];
        console.log(`Update AniList bind: ${m.Code}`);
        if (m !== null && m !== undefined) {
          this.List.push(m);
          resolve(m);
        } else {
          console.log(
            `JsonHelper.ArrayConvert<AniBind>(res, AniBind) is 'null' or 'undefined'.`
          );
          resolve(null);
        }
      });
    });
  }

  public static Exists(discordId: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
      const aniBind = this.List.find(m => m.DiscordId === discordId);
      if (aniBind === null || aniBind === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static Get(discordId: string) {
    return new Promise<AniBind>(async (resolve, reject) => {
      await this.OnReady();
      if (this.List.length === 0) {
        console.log(`List is empty.`);
        resolve(null);
      }
      for (let i = 0; i < this.List.length; i++) {
        const m = this.List[i];
        if (m.DiscordId === discordId) {
          resolve(m);
          return;
        } else {
          if (i === this.List.length - 1) {
            console.log(
              `this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`
            );
            resolve(null);
          }
        }
      }
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
