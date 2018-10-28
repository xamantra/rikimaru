import { Queue, User } from "./../models/subscription.model";
import { QueueJob } from "./../models/queue.job.model";
import { MySqlResult } from "./../models/result.mysql.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Query } from "./../core/query";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { IMedia } from "../interfaces/page.interface";
import { SubscriptionData } from "./subscription.data";
import { UserData } from "./user.data";

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
      this.Clear()
        .then(() => {
          Query.Execute(this.DataHelper.QueueSelectAll(), async result => {
            const queues = await JsonHelper.ArrayConvert<Queue>(result, Queue);
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
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    });
  }

  private static async Clear() {
    return new Promise((resolve, reject) => {
      this.Queues.length = 0;
      this.QueueJobs.length = 0;
      this.Queues.splice(0, this.Queues.length);
      this.QueueJobs.splice(0, this.QueueJobs.length);
      if (this.Queues.length === 0 && this.QueueJobs.length === 0) {
        resolve();
      } else {
        reject(new Error(`The arrays were not cleared.`));
      }
    });
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

  public static SetQueue($m: IMedia) {
    this.GetQueue($m.idMal).then(queue => {
      const queueJob = new QueueJob($m, queue);
      this.AddJob(queueJob);
      // UserData.All.forEach(user => {
      //   SubscriptionData.Exists($m.idMal, user.Id).then(exists => {
      //     if (exists === true) {
      //       const queueJob = new QueueJob($m, queue);
      //       QueueData.AddJob(queueJob);
      //     }
      //   });
      // });
    });
  }

  public static get GetJobs() {
    return this.QueueJobs;
  }

  public static AddJob(queueJob: QueueJob) {
    return new Promise((resolve, reject) => {
      queueJob.Check();
      this.QueueJobs.push(queueJob);
      resolve();
    });
  }

  public static RemoveJob(queueJob: QueueJob) {
    ArrayHelper.remove(this.QueueJobs, queueJob, () => {
      console.log(`Queue Job: "${queueJob.queue.MediaId}"`);
      queueJob = null;
    });
  }

  public static async Insert(mediaId: number, next_episode: number) {
    return new Promise<number>((resolve, reject) => {
      this.Exists(mediaId).then(exists => {
        if (exists === false) {
          Query.Execute(
            this.DataHelper.QueueInsert(mediaId, next_episode),
            async result => {
              const res = await JsonHelper.Convert<MySqlResult>(
                result,
                MySqlResult
              );
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
          const queue = this.Queues.find(x => x.MediaId === mediaId);
          resolve(queue.Id);
        }
      });
    });
  }

  public static async Update(media: IMedia, queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      Query.Execute(
        this.DataHelper.QueueUpdate(media.idMal, media.nextAiringEpisode.next)
      )
        .then(() => {
          this.Init().then(() => {
            this.GetQueue(media.idMal)
              .then(q => {
                const qj = new QueueJob(media, q);
                this.AddJob(qj).then(() => {
                  console.log(`New/Refreshed queue job: ${qj.queue.MediaId}`);
                });
              })
              .catch(err => {
                console.log(err);
              });
            // SubscriptionData.Exists(media.idMal, user.Id).then(exists => {
            //   if (exists === true) {
            //     this.GetQueue(media.idMal).then(q => {
            //       const qj = new QueueJob(media, q);
            //       this.AddJob(qj).then(() => {
            //         this.RemoveJob(queueJob);
            //         resolve();
            //       });
            //     });
            //   } else {
            //     reject(
            //       `User ${user.DiscordId} is not subscribe to Media ${
            //         media.idMal
            //       }`
            //     );
            //   }
            // });
          });
        })
        .catch(err => {
          console.log(err);
        });
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
          console.log(q);
        });
        this.QueueJobs.forEach(qj => {
          qj.Log();
        });
        resolve();
      }
    });
  }
}
