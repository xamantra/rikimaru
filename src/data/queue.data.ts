import { Queue, User } from "./../models/subscription.model";
import { QueueJob } from "./../models/queue.job.model";
import { JsonHelper } from "./../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { ArrayHelper } from "../helpers/array.helper";
import { IMedia } from "../interfaces/page.interface";
import { Mongo } from "../core/mongo";

export class QueueData {
  public static get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private static Queues: Queue[] = [];
  private static QueueJobs: QueueJob[] = [];
  public static Initializing = false;

  public static async Init() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        this.Clear()
          .then(() => {
            this.Initializing = true;
            console.log(`queue data...`);
            Mongo.FindAll(DataHelper.queue).then(async result => {
              const queues = await JsonHelper.ArrayConvert<Queue>(
                result,
                Queue
              );
              if (queues === null || queues === undefined) {
                this.Initializing = false;
                reject(
                  new Error(
                    `"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`
                  )
                );
              } else {
                if (queues.length === 0) {
                  console.log(`resolvingqueue`);
                  this.Initializing = false;
                  resolve();
                }
                queues.forEach(q => {
                  this.Queues.push(q);
                  // console.log(q);
                });
                this.Initializing = false;
                resolve();
              }
            });
          })
          .catch((err: Error) => {
            console.log(err.message);
          });
      });
    });
  }

  private static async Clear() {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        this.Queues.length = 0;
        this.QueueJobs.length = 0;
        this.Queues.splice(0, this.Queues.length);
        this.QueueJobs.splice(0, this.QueueJobs.length);
        console.log(`checking lengths`);
        if (this.Queues.length === 0 && this.QueueJobs.length === 0) {
          console.log(`checked lengths.`);
          resolve();
        } else {
          reject(new Error(`The arrays were not cleared.`));
        }
      });
    });
  }

  public static async GetQueue(mediaId: number) {
    return new Promise<Queue>(async (resolve, reject) => {
      this.OnReady().then(() => {
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
    });
  }

  public static SetQueue($m: IMedia) {
    this.GetQueue($m.idMal).then(queue => {
      this.OnReady().then(() => {
        const queueJob = new QueueJob($m, queue);
        this.AddJob(queueJob);
      });
    });
  }

  public static GetJobs() {
    return new Promise<QueueJob[]>((resolve, reject) => {
      this.OnReady().then(() => {
        resolve(this.QueueJobs);
      });
    });
  }

  public static AddJob(queueJob: QueueJob) {
    return new Promise((resolve, reject) => {
      this.OnReady().then(() => {
        queueJob.Check();
        this.QueueJobs.push(queueJob);
        resolve();
      });
    });
  }

  public static RemoveJob(queueJob: QueueJob) {
    ArrayHelper.remove(this.QueueJobs, queueJob, () => {
      this.OnReady().then(() => {
        console.log(`Queue Job: "${queueJob.queue.MediaId}"`);
        queueJob = null;
      });
    });
  }

  public static async Insert(mediaId: number, next_episode: number) {
    console.log(`inserting queue...`);
    return new Promise<string>((resolve, reject) => {
      this.OnReady().then(() => {
        this.Exists(mediaId).then(exists => {
          if (exists === false) {
            console.log(`new queue....`);
            const data = { media_id: mediaId, next_episode: next_episode };
            Mongo.Insert(DataHelper.queue, data).then(result => {
              if (
                result.insertedId !== undefined &&
                result.insertedId !== null
              ) {
                const q = new Queue();
                q.Id = result.insertedId;
                q.MediaId = mediaId;
                q.NextEpisode = next_episode;
                this.Queues.push(q);
                console.log(`${q.MediaId} added to queue.`);
                resolve(q.Id);
              } else {
                reject(new Error(`ERROR: 654567898765`));
              }
            });
          } else {
            const queue = this.Queues.find(x => x.MediaId === mediaId);
            resolve(queue.Id);
          }
        });
      });
    });
  }

  public static async Update(media: IMedia, queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      this.OnReady().then(() => {
        const query = { media_id: media.idMal };
        const newValues = {
          $set: { next_episode: media.nextAiringEpisode.next }
        };
        Mongo.Update(DataHelper.queue, query, newValues).then(result => {
          this.Init().then(() => {
            this.GetQueue(media.idMal)
              .then(q => {
                const qj = new QueueJob(media, q);
                this.AddJob(qj).then(() => {
                  this.RemoveJob(queueJob);
                  console.log(`New/Refreshed queue job: ${qj.queue.MediaId}`);
                  resolve();
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      });
    });
  }

  public static async Exists(mediaId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      this.OnReady().then(() => {
        const q = this.All.find(x => x.MediaId === mediaId);
        if (q === null || q === undefined) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static async LogAll() {
    return new Promise(async (resolve, reject) => {
      this.OnReady().then(() => {
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
    });
  }

  public static OnReady() {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.Initializing === false) {
          resolve();
        }
      }, 1);
    });
  }
}
