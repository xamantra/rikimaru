import { Database, RunResult } from "sqlite3";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { JsonConvert } from "json2typescript";
import { Media } from "../models/subscription.model";

export class MediaData {
  private static MediaList: Media[] = [];
  public static Init(): void {
    const db: Database = DataHelper.DB;
    const converter: JsonConvert = JsonHelper.Converter;
    db.serialize(() => {
      db.each(`SELECT * FROM media`, (err: Error, row: any) => {
        if (row !== null) {
          try {
            const media: Media = converter.deserialize(row, Media) as Media;
            this.MediaList.push(media);
            console.log(media);
          } catch (error) {
            console.log(err);
          }
        }
      });
    });
  }

  public static Add(
    mal_id: number,
    title: string,
    nextAiringEp: number,
    timeUntilAiring: number
  ): void {
    const db: Database = DataHelper.DB;
    db.serialize(() => {
      db.run(
        `INSERT OR IGNORE INTO media (mal_id, title, next_episode, next_schedule) VALUES(${mal_id}, "${title}", ${nextAiringEp}, ${timeUntilAiring})`,
        (result: RunResult, err: Error) => {
          if (err.message !== null) {
            console.log(err.message);
          }
        }
      );
    });
  }

  public static get All(): Media[] {
    return this.MediaList;
  }
}
