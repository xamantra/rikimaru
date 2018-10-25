import { MediaStatus } from "./../core/media.status";
import { QueueData } from "./queue.data";
import { SubscriptionData } from "./subscription.data";
import { Query } from "./../core/query";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";
import { UserData } from "./user.data";
import { QueueJob } from "../models/queue.job.model";

export class MediaData {
  private static LocalList: Media[] = [];
  private static MediaList: IMedia[] = [];
  public static async Init() {
    await Query.Execute(DataHelper.MediaSelectAll(), async result => {
      const res = await JsonHelper.ArrayConvert<Media>(result, Media);
      await res.forEach(async media => {
        await this.LocalList.push(media);
      });
      await this.LoadFromApi();
    });
  }

  public static async LoadFromApi() {
    this.MediaList = [];
    const userDatas = UserData.All;
    const locals = this.LocalList;
    await locals.forEach(async lm => {
      await MediaSearch.All(lm.Title, async (res: IMedia[]) => {
        await res.forEach(async $m => {
          if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
            await this.MediaList.push($m);
            return;
          } else {
            if ($m.idMal === lm.MalId) {
              await ArrayHelper.remove(this.LocalList, lm, async () => {
                await Query.Execute(DataHelper.MediaDelete($m.id), () => {
                  userDatas.forEach(x => {
                    SubscriptionData.Delete($m.idMal, x.DiscordId, () => {
                      console.log(
                        `All subscription of "${$m.title}" has been remove`
                      );
                    });
                  });
                });
              });
            }
          }
        });
      });
    });
  }

  public static async Insert(
    mal_id: number,
    title: string,
    callback: (insertId: number) => void = null
  ) {
    await this.Exists(mal_id, async exists => {
      if (exists === false) {
        await Query.Execute(
          await DataHelper.MediaInsert(mal_id, title),
          async result => {
            const res = await JsonHelper.Convert<MySqlResult>(
              result,
              MySqlResult
            );
            if (res.InsertId !== undefined && res.InsertId !== null) {
              const media = new Media();
              media.MalId = res.InsertId;
              media.Title = title;
              await this.LocalList.push(media);
              await MediaSearch.All(title, async (ms: IMedia[]) => {
                await ms.forEach(async $m => {
                  if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
                    await this.MediaList.push($m);
                  }
                });
              });
              if (callback !== null) {
                await callback(res.InsertId);
              }
            }
          }
        );
      }
    });
  }

  public static LogAll() {
    this.MediaList.forEach(async m => {
      await console.log(`Media:`, m.idMal, m.title);
    });
  }

  public static get GetLocalList() {
    return this.LocalList;
  }

  public static get GetMediaList() {
    return this.MediaList;
  }

  public static async Exists(
    malId: number,
    callback?: (exists: boolean) => void
  ) {
    const m = this.LocalList.find(x => x.MalId === malId);
    if (m === null || m === undefined) {
      await callback(false);
    } else {
      await callback(true);
    }
  }
}
