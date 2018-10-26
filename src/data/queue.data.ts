import { Queue, User } from "./../models/subscription.model";
import { QueueJob } from "./../models/queue.job.model";
import { MySqlResult } from "./../models/result.mysql.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Query } from "./../core/query";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { IMedia } from "../interfaces/page.interface";

export class QueueData {
  public static get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private static Queues: Queue[] = [];
  private static QueueJobs: QueueJob[] = [];
  private static DataHelper = DataHelper.Instance;

  public static async Init() {
    this.Queues = [];
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

  public static get GetJobs() {
    return this.QueueJobs;
  }

  public static AddJob(queueJob: QueueJob) {
    return new Promise((resolve, reject) => {
      queueJob.StartQueue();
      this.QueueJobs.push(queueJob);
      resolve();
    });
  }

  public static RemoveJob(queueJob: QueueJob) {
    ArrayHelper.remove(this.QueueJobs, queueJob, () => {
      console.log(`Queue Job: "${queueJob}"`);
      queueJob.Cancel();
      queueJob = null;
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
          const queue = this.Queues.find(x => x.MediaId === mediaId);
          resolve(queue.Id);
        }
      });
    });
  }

  public static async Update(user: User, media: IMedia, queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      Query.Execute(
        this.DataHelper.QueueUpdate(media.idMal, media.nextAiringEpisode.next)
      ).then(() => {
        this.Init().then(() => {
          this.GetQueue(media.idMal).then(q => {
            const qj = new QueueJob(user, media, q);
            this.AddJob(qj).then(() => {
              this.RemoveJob(queueJob);
              resolve();
            });
          });
        });
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
