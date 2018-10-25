import { Queue } from "./../models/subscription.model";
import { QueueJob } from "./../models/queue.job.model";
import { UserData } from "./user.data";
import { MySqlResult } from "./../models/result.mysql.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Query } from "./../core/query";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { MediaData } from "./media.data";

export class QueueData {
  private static Queues: Queue[] = [];

  public static async Init() {
    await Query.Execute(DataHelper.QueueSelectAll(), async result => {
      const queues = await JsonHelper.ArrayConvert<Queue>(result, Queue);
      await queues.forEach(q => {
        this.Queues.push(q);
      });
    });
  }

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
    callback?: () => Promise<void>
  ) {
    const oldQueue = await this.All.find(x => x.MediaId === mediaId);
    await Query.Execute(
      await DataHelper.QueueUpdate(mediaId, nextEpisode),
      async () => {
        await this.GetQueue(mediaId, async (q, err) => {
          if (err === false) {
            await ArrayHelper.remove(this.All, oldQueue, async () => {
              await this.Queues.push(q);
              await callback().then(async () => {
                await MediaData.LoadFromApi().then(async () => {
                  await MediaData.Exists(q.MediaId, async exists => {
                    if (exists === true) {
                      UserData.All.forEach(user => {
                        const queueJob = new QueueJob(user, q);
                        queueJob.StartQueue();
                      });
                    }
                  });
                });
              });
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
      await console.log(`Queue:`, q);
    });
  }
}
