import { Queue } from "./../models/subscription.model";
import { MySqlResult } from "./../models/result.mysql.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Query } from "./../core/query";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";

export class QueueData {
  private static Queues: Queue[] = [];

  public static async Init() {}

  public static async GetQueue(
    mediaId: number,
    callback?: (queue: Queue, err: boolean) => void
  ) {
    const q = await this.All.find(x => x.MediaId === mediaId);
    if (q !== null && q !== undefined) {
      await callback(q, false);
    } else {
      await callback(null, true);
    }
  }

  public static async Insert(
    mediaId: number,
    next_episode: number,
    callback?: (insertId: number) => void
  ) {
    await this.Exists(mediaId, async exists => {
      if (exists === false) {
        await Query.Execute(
          await DataHelper.QueueInsert(mediaId, next_episode),
          async result => {
            const res = await JsonHelper.ArrayConvert<MySqlResult>(
              result,
              MySqlResult
            )[0];
            if (res.InsertId !== undefined || res.InsertId !== null) {
              const q = new Queue();
              q.Id = res.InsertId;
              q.MediaId = mediaId;
              q.NextEpisode = next_episode;
              await this.Queues.push(q);
              await callback(q.Id);
            }
          }
        );
      }
    });
  }

  public static async Update(
    mediaId: number,
    nextEpisode: number,
    callback?: () => void
  ) {
    const oldQueue = this.All.find(x => x.MediaId === mediaId);
    await Query.Execute(
      await DataHelper.QueueUpdate(mediaId, nextEpisode),
      async () => {
        await this.GetQueue(mediaId, async (q, err) => {
          if (err === false) {
            await ArrayHelper.remove(this.All, oldQueue, async () => {
              await this.Queues.push(q);
              await callback();
            });
          }
        });
      }
    );
  }

  public static async Exists(
    mediaId: number,
    callback?: (exists: boolean) => void
  ) {
    const q = this.All.find(x => x.MediaId === mediaId);
    if (q === null || q === undefined) {
      await callback(false);
    } else {
      await callback(true);
    }
  }

  public static get All() {
    return this.Queues;
  }

  public static LogAll() {
    this.Queues.forEach(async q => {
      await console.log(q);
    });
  }
}
