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
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private Queues: Queue[] = [];
  private DataHelper = DataHelper.Instance;
  private UserData = UserData.Instance;
  private MediaData = MediaData.Instance;

  public async Init() {
    return new Promise((resolve, reject) => {
      Query.Execute(this.DataHelper.QueueSelectAll(), async result => {
        const queues = await JsonHelper.ArrayConvert<Queue>(result, Queue);
        if (queues === null || queues === undefined) {
          reject(
            new Error(
              `"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`
            )
          );
        } else {
          await queues.forEach(q => {
            this.Queues.push(q);
          });
          resolve();
        }
      });
    });
  }

  public async GetQueue(mediaId: number) {
    return new Promise<Queue>(async (resolve, reject) => {
      const q = await this.All.find(x => x.MediaId === mediaId);
      if (q !== null && q !== undefined) {
        resolve(q);
      } else {
        reject(
          new Error(
            `"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public async Insert(mediaId: number, next_episode: number) {
    return new Promise<number>((resolve, reject) => {
      this.Exists(mediaId, async exists => {
        if (exists === false) {
          await Query.Execute(
            this.DataHelper.QueueInsert(mediaId, next_episode),
            async result => {
              const res = await JsonHelper.ArrayConvert<MySqlResult>(
                result,
                MySqlResult
              )[0];
              if (res !== undefined && res !== null) {
                const q = new Queue();
                q.Id = res.InsertId;
                q.MediaId = mediaId;
                q.NextEpisode = next_episode;
                await this.Queues.push(q);
                resolve(q.Id);
              }
            }
          );
        } else {
          reject(new Error(`Queue with mediaId: "${mediaId}" already exists.`));
        }
      });
    });
  }

  public async Update(mediaId: number, nextEpisode: number) {
    return new Promise(async (resolve, reject) => {
      const oldQueue = await this.All.find(x => x.MediaId === mediaId);
      Query.Execute(
        this.DataHelper.QueueUpdate(mediaId, nextEpisode),
        async () => {
          await this.GetQueue(mediaId)
            .then(async q => {
              await ArrayHelper.remove(this.All, oldQueue, async () => {
                await this.Queues.push(q);
                await this.MediaData.LoadFromApi().then(async () => {
                  await this.MediaData.GetMediaList.forEach(async m => {
                    await this.UserData.All.forEach(async user => {
                      const queueJob = new QueueJob(user, m, q);
                      await queueJob.StartQueue();
                    });
                  });
                });
                resolve();
              });
            })
            .catch((reason: Error) => {
              console.log(reason.message);
            });
        }
      );
    });
  }

  public async Exists(mediaId: number, callback?: (exists: boolean) => void) {
    return new Promise<boolean>(async (resolve, reject) => {
      const q = await this.All.find(x => x.MediaId === mediaId);
      if (q === null || q === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public async LogAll() {
    return new Promise(async (resolve, reject) => {
      if (this.Queues === null || this.Queues === undefined) {
        reject(new Error(`"Queues" is 'null' or 'undefined'.`));
      } else {
        await this.Queues.forEach(q => {
          console.log(`Queue:`, q.MediaId);
        });
        resolve();
      }
    });
  }
}
