import { MediaStatus } from "./../core/media.status";
import { Query } from "./../core/query";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { MySqlResult } from "../models/result.mysql.model";

export class MediaData {
  private static LocalList: Media[] = [];
  private static MediaList: IMedia[] = [];
  public static Init() {
    Query.Execute(DataHelper.MediaSelectAll(), async result => {
      const res = await JsonHelper.ArrayConvert<Media>(result, Media);
      await res.forEach(async media => {
        await this.LocalList.push(media);
      });
      await console.log(this.LocalList);
      await this.LoadFromApi();
    });
  }

  public static LoadFromApi() {
    console.log("Loading from api...");
    this.LocalList.forEach(async m => {
      await MediaSearch.All(m.Title, async (res: IMedia[]) => {
        await res.forEach(async $m => {
          if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
            await this.MediaList.push($m);
            await console.log($m.idMal);
          }
        });
      });
    });
  }

  public static Insert(
    mal_id: number,
    title: string,
    callback: (insertId: number) => void = null
  ) {
    this.Exists(mal_id, async exists => {
      if (exists === false) {
        await Query.Execute(
          DataHelper.MediaInsert(mal_id, title),
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
                callback(res.InsertId);
              }
            }
          }
        );
      }
    });
  }

  public static LogAll() {
    this.LocalList.forEach(async m => {
      await console.log(m.Title);
    });
    this.MediaList.forEach(async m => {
      await console.log(m.idMal);
    });
  }

  public static get GetLocalList() {
    return this.LocalList;
  }

  public static get GetMediaList() {
    return this.MediaList;
  }

  public static Exists(malId: number, callback?: (exists: boolean) => void) {
    Query.Execute(DataHelper.MediaSelect(malId), async result => {
      const media = await JsonHelper.ArrayConvert<Media>(result, Media)[0];
      if (media === undefined || media === null) {
        await callback(false);
      } else {
        await callback(true);
      }
    });
  }
}
