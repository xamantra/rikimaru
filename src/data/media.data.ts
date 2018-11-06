import { MediaStatus } from "./../core/media.status";
import { SubscriptionData } from "./subscription.data";
import { JsonHelper } from "../helpers/json.helper";
import { Table } from "../core/table";
import { Media, User } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { ArrayHelper } from "../helpers/array.helper";
import { UserData } from "./user.data";
import { QueueData } from "./queue.data";
import { Random } from "../helpers/random.helper";
import { Mongo } from "../core/mongo";
import { AnimeCache } from "../core/anime.cache";

export class MediaData {
  public static get GetLocalList() {
    return this.LocalList;
  }

  public static get GetMediaList() {
    return this.MediaList;
  }
  static _instance: MediaData;
  private static LocalList: Media[] = [];
  private static MediaList: IMedia[] = [];
  public static Initializing = false;

  public static async Init() {
    return new Promise(async (resolve, reject) => {
      await this.Clear();
      this.Initializing = true;
      const result = await Mongo.FindAll(Table.media);
      const $result = await JsonHelper.ArrayConvert<Media>(result, Media);
      if ($result === undefined || $result === null) {
        reject(
          new Error(
            `"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`
          )
        );
      } else {
        if ($result.length === 0) {
          resolve();
        }
        for (let i = 0; i < $result.length; i++) {
          const m = $result[i];
          this.LocalList.push(m);
          if (i === $result.length - 1) {
            await this.LoadFromApi().catch((reason: Error) => {
              console.log(reason.message);
            });
            console.log(`Media List Length: ${this.MediaList.length}`);
            resolve();
          }
        }
      }
    });
  }

  public static async Clear() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      this.LocalList.length = 0;
      this.MediaList.length = 0;
      this.LocalList.splice(0, this.LocalList.length);
      this.MediaList.splice(0, this.MediaList.length);
      if (this.LocalList.length === 0 && this.MediaList.length === 0) {
        resolve();
      } else {
        reject(new Error(`The arrays were not cleared.`));
      }
    });
  }

  public static async LoadFromApi() {
    return new Promise<void>(async (resolve, reject) => {
      const userDatas = UserData.All;
      const locals = this.LocalList;
      if (userDatas === undefined || userDatas === null) {
        reject(
          new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`)
        );
      } else if (locals === undefined || locals === null) {
        reject(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
      } else {
        for (let i = 0; i < locals.length; i++) {
          const lm = locals[i];
          const $m = await AnimeCache.Get(lm.MalId);
          if (
            $m !== null &&
            (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m))
          ) {
            await QueueData.Insert($m.idMal, $m.nextAiringEpisode.next).catch(
              () => {
                this.Check(i, $m, resolve);
              }
            );
            this.MediaList.push($m);
            this.Check(i, $m, resolve);
          } else {
            ArrayHelper.remove(this.LocalList, lm, async () => {
              const query = { _id: $m.idMal };
              await Mongo.Delete(Table.media, query);
              userDatas.forEach(async x => {
                await SubscriptionData.Delete($m.idMal, x.DiscordId);
                const jobs = await QueueData.GetJobs();
                jobs.forEach(qj => {
                  QueueData.RemoveJob(qj);
                });
              });
              this.Check(i, $m, resolve);
            });
          }
        }
      }
    });
  }

  private static Check(
    iteration: number,
    $m: IMedia,
    res: (value?: void | PromiseLike<void>) => void
  ) {
    QueueData.SetQueue($m);
    if (iteration === this.LocalList.length - 1) {
      this.Initializing = false;
      res();
    }
  }

  public static async Insert(media: IMedia, title: string, user: User = null) {
    return new Promise<number>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(media.idMal);
      if (exists === false) {
        const data = { _id: media.idMal, title: title };
        const result = await Mongo.Insert(Table.media, data);
        if (result.insertedId !== undefined && result.insertedId !== null) {
          const m = new Media();
          m.MalId = media.idMal;
          m.Title = title;
          this.LocalList.push(m);
          if (MediaStatus.Ongoing(media) || MediaStatus.NotYetAired(media)) {
            this.MediaList.push(media);
            await QueueData.Insert(
              media.idMal,
              media.nextAiringEpisode.next
            ).catch((reason: Error) => {
              console.log(reason.message);
            });
            resolve(media.idMal);
          }
        }
      } else {
        resolve(media.idMal);
      }
    });
  }

  public static GetMedia(malId: number) {
    return new Promise<IMedia>(async (resolve, reject) => {
      await this.OnReady();
      let iteration = 0;
      this.MediaList.forEach($m => {
        iteration++;
        if ($m.idMal === malId) {
          resolve($m);
        }
        if (iteration === this.MediaList.length) {
          reject(new Error(`NO media with id "${malId}" was found.`));
        }
      });
    });
  }

  public static GetRandom() {
    return new Promise<IMedia>(async (resolve, reject) => {
      await this.OnReady();
      setInterval(() => {
        const media = this.MediaList[
          Random.Range(0, this.MediaList.length - 1)
        ];
        if (media !== null && media !== undefined) {
          resolve(media);
        }
      }, 0);
    });
  }

  public static async LogAll() {
    return new Promise(async (res, rej) => {
      await this.OnReady();
      console.log(this.LocalList);
      res();
    });
  }

  public static async Exists(malId: number) {
    return new Promise<boolean>(async (res, rej) => {
      await this.OnReady();
      const m = this.LocalList.find(x => x.MalId === malId);
      if (m === null || m === undefined) {
        res(false);
      } else {
        res(true);
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
