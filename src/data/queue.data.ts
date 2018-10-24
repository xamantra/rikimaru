import { Queue } from "./../models/subscription.model";
import { MySqlResult } from "./../models/result.mysql.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Query } from "./../core/query";
import { DataHelper } from "../helpers/data.helper";

export class QueueData {
  private static Queues: Queue[] = [];

  public static Init() {
    Query.Execute(DataHelper.QueueSelectAll(), async result => {
      const queue = await JsonHelper.ArrayConvert<Queue>(result, Queue);
      await queue.forEach(async q => {
        await this.Queues.push(q);
      });
      await console.log(this.Queues);
    });
  }

  public static GetQueue(
    mediaId: number,
    callback?: (queue: Queue, err: boolean) => {}
  ) {
    Query.Execute(DataHelper.QueueSelect(mediaId), async result => {
      const queue = await JsonHelper.ArrayConvert<Queue>(result, Queue)[0];
      if (queue !== undefined || queue !== null) {
        await callback(queue, false);
      } else {
        await callback(null, true);
      }
    });
  }

  public static Insert(
    mediaId: number,
    next_episode: number,
    callback?: (insertId: number) => void
  ) {
    this.Exists(mediaId, async exists => {
      if (exists === false) {
        await Query.Execute(
          DataHelper.QueueInsert(mediaId, next_episode),
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
              callback(q.Id);
            }
          }
        );
      }
    });
  }

  public static Update(
    mediaId: number,
    nextEpisode: number,
    callback?: () => void
  ) {
    Query.Execute(
      DataHelper.QueueUpdate(mediaId, nextEpisode),
      async result => {
        const res = await JsonHelper.Convert<MySqlResult>(result, MySqlResult);
        await console.log(res);
        await callback();
      }
    );
  }

  public static Exists(mediaId: number, callback?: (exists: boolean) => void) {
    Query.Execute(DataHelper.QueueSelect(mediaId), async result => {
      const q = await JsonHelper.ArrayConvert<Queue>(result, Queue)[0];
      if (q === undefined || q === null) {
        await callback(false);
      } else {
        await callback(true);
      }
    });
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
