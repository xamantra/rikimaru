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
  public static get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private static Queues: Queue[] = [];
  private static QueueJobs: QueueJob[] = [];
  private static DataHelper = DataHelper.Instance;

  public static async Init() {
    return new Promise((resolve, reject) => {
      Query.Execute(this.DataHelper.QueueSelectAll(), async result => {
        const queues = JsonHelper.ArrayConvert<Queue>(result, Queue);
        if (queues === null || queues === undefined) {
          reject(
            new Error(
              `"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`
            )
          );
        } else {
          queues.forEach(q => {
            this.Queues.push(q);
          });
          resolve();
        }
      });
    });
  }

  public static AddJob(queueJob: QueueJob) {
    this.QueueJobs.push(queueJob);
  }

  public static async GetQueue(mediaId: number) {
    return new Promise<Queue>(async (resolve, reject) => {
      const q = this.All.find(x => x.MediaId === mediaId);
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

  public static async Insert(mediaId: number, next_episode: number) {
    return new Promise<number>((resolve, reject) => {
      this.Exists(mediaId).then(exists => {
        if (exists === false) {
          Query.Execute(
            this.DataHelper.QueueInsert(mediaId, next_episode),
            result => {
              const res = JsonHelper.Convert<MySqlResult>(result, MySqlResult);
              console.log(res);
              if (res !== undefined && res !== null) {
                const q = new Queue();
                q.Id = res.InsertId;
                q.MediaId = mediaId;
                q.NextEpisode = next_episode;
                this.Queues.push(q);
                console.log(`${q.MediaId} added to queue.`);
                resolve(q.Id);
              } else {
                reject(
                  new Error(
                    `JsonHelper.ArrayConvert<MySqlResult>(result, MySqlResult)[0] is 'null' or 'undefined'.`
                  )
                );
              }
            }
          );
        } else {
          reject(new Error(`Queue with mediaId: "${mediaId}" already exists.`));
        }
      });
    });
  }

  public static async Update(mediaId: number, nextEpisode: number) {
    return new Promise(async (resolve, reject) => {
      const oldQueue = this.All.find(x => x.MediaId === mediaId);
      Query.Execute(
        this.DataHelper.QueueUpdate(mediaId, nextEpisode),
        async () => {
          this.GetQueue(mediaId)
            .then(async q => {
              ArrayHelper.remove(this.All, oldQueue, async () => {
                this.Queues.push(q);
                MediaData.LoadFromApi()
                  .then(async () => {
                    MediaData.GetMediaList.forEach(async m => {
                      UserData.All.forEach(async user => {
                        const queueJob = new QueueJob(user, m, q);
                        queueJob.StartQueue();
                        QueueData.AddJob(queueJob);
                      });
                    });
                  })
                  .catch((reason: Error) => {
                    console.log(reason.message);
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

  public static async Exists(mediaId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      const q = this.All.find(x => x.MediaId === mediaId);
      if (q === null || q === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public static async LogAll() {
    return new Promise(async (resolve, reject) => {
      if (this.Queues === null || this.Queues === undefined) {
        reject(new Error(`"Queues" is 'null' or 'undefined'.`));
      } else {
        this.Queues.forEach(q => {
          console.log(`Queue:`, q.MediaId);
        });
        this.QueueJobs.forEach(qj => {
          qj.Log();
        });
        resolve();
      }
    });
  }
}
