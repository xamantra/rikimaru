import { RunResult } from "sqlite3";
import { MediaStatus } from "./../core/media.status";
import { MediaSearch } from "./../core/media.search";
import { Anilist } from "./../core/anilist";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { Root } from "../models/root.model";

export class MediaData {
  private static LocalList: Media[] = [];
  private static MediaList: IMedia[] = [];
  public static Init() {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM media`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const media = converter.deserialize(row, Media) as Media;
            this.LocalList.push(media);
          } catch (error) {
            console.log(err);
          }
        }
      });
    });
  }

  public static LoadFromApi() {
    console.log("Loading from api...");
    this.LocalList.forEach(async m => {
      MediaSearch.All(m.Title, (res: IMedia[]) => {
        res.forEach($m => {
          if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
            this.MediaList.push($m);
            console.log($m.idMal);
          }
        });
      });
    });
  }

  public static Add(mal_id: number, title: string) {
    const db = DataHelper.DB;
    const converter = JsonHelper.Converter;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO media (mal_id, title) VALUES(${mal_id}, '${title}')`,
        (result: RunResult, err: Error) => {
          if (err !== undefined) {
            console.log(err.message);
          } else {
            db.each(
              `SELECT * FROM media WHERE mal_id=${mal_id}`,
              (e: Error, row: any) => {
                this.LocalList.push(converter.deserialize(row, Media));
                const oldMedia = this.MediaList.find(x => x.idMal === mal_id);
                if (oldMedia === null || oldMedia === undefined) {
                  MediaSearch.All(title, (res: IMedia[]) => {
                    res.forEach($m => {
                      if (
                        MediaStatus.Ongoing($m) ||
                        MediaStatus.NotYetAired($m)
                      ) {
                        this.MediaList.push($m);
                      }
                    });
                  });
                }
              }
            );
          }
        }
      );
    });
  }

  public static LogAll() {
    this.LocalList.forEach(m => {
      console.log(m.Title);
    });
    this.MediaList.forEach(m => {
      console.log(m.idMal);
    });
  }

  public static get GetLocalList() {
    return this.LocalList;
  }

  public static get GetMediaList() {
    return this.MediaList;
  }

  public static Exist(malId: number) {
    let e = false;
    this.LocalList.forEach(media => {
      if (media.MalId === malId) {
        e = true;
      }
    });
    return e;
  }
}
