import { QueueJob } from "./../models/queue.job.model";
import { JsonHelper } from "./../helpers/json.helper";
import { Tables } from "../core/tables";
import { ArrayHelper } from "../helpers/array.helper";
import { IMedia } from "../interfaces/page.interface";
import { Mongo } from "../core/mongo";
import { Queue } from "../models/subscription.model";
import { NullCheck } from "../helpers/null.checker.helper";
import { AnimeCache } from "../core/anime.cache";

export class QueueData {
  public static get All() {
    return this.Queues;
  }

  static _instance: QueueData;
  private static Queues: Queue[] = [];
  private static QueueJobs: QueueJob[] = [];
  public static Initializing = false;

  public static async Init() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      await this.Clear().catch((err: Error) => {
        console.log(err.message);
      });
      this.Initializing = true;
      const result = await Mongo.FindAll(Tables.queue);
      const queues = await JsonHelper.ArrayConvert<Queue>(result, Queue);
      if (queues === null || queues === undefined) {
        this.Initializing = false;
        console.log(
          `"JsonHelper.ArrayConvert<Queue>(result, Queue)" is 'null' or 'undefined'`
        );
        resolve();
      } else {
        if (queues.length === 0) {
          this.Initializing = false;
          console.log(`Queue List Length: ${this.Queues.length}`);
          resolve();
        } else {
          this.Queues = queues;
          this.Initializing = false;
          console.log(`Queue List Length: ${this.Queues.length}`);
          resolve();
        }
      }
    });
  }

  public static CheckFromApi() {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < this.Queues.length; i++) {
        const queue = this.Queues[i];
        const anime = await AnimeCache.Get(queue.MediaId);
        this.SetQueue(queue, anime);
        if (i === this.Queues.length - 1) {
          resolve();
        }
      }
    });
  }

  private static async Clear() {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
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
      await this.OnReady();
      const q = this.All.find(x => x.MediaId === mediaId);
      if (NullCheck.Fine(q)) {
        resolve(q);
      } else {
        console.log(
          `"this.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`
        );
        resolve(null);
      }
    });
  }

  public static async SetQueue(queue: Queue, anime: IMedia) {
    await this.OnReady();
    if (NullCheck.Fine(queue)) {
      const queueJob = new QueueJob(anime, queue);
      await this.AddJob(queueJob);
    }
  }

  public static GetJobs() {
    return new Promise<QueueJob[]>(async (resolve, reject) => {
      await this.OnReady();
      resolve(this.QueueJobs);
    });
  }

  public static AddJob(queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      await queueJob.Check();
      this.QueueJobs.push(queueJob);
      resolve();
    });
  }

  public static async RemoveJob(queueJob: QueueJob) {
    await this.OnReady();
    ArrayHelper.remove(this.QueueJobs, queueJob, async () => {
      queueJob = null;
    });
  }

  public static async Insert(mediaId: number, next_episode: number) {
    return new Promise<string>(async (resolve, reject) => {
      await this.OnReady();
      const exists = await this.Exists(mediaId);
      if (exists === false) {
        const data = { media_id: mediaId, next_episode: next_episode };
        const result = await Mongo.Insert(Tables.queue, data);
        if (result.insertedId !== undefined && result.insertedId !== null) {
          const q = new Queue();
          q.Id = result.insertedId;
          q.MediaId = mediaId;
          q.NextEpisode = next_episode;
          this.Queues.push(q);
          resolve(q.Id);
        } else {
          resolve(null);
        }
      } else {
        const queue = await this.GetQueue(mediaId);
        if (queue === null || queue === undefined) {
          resolve(null);
        } else {
          resolve(queue.Id);
        }
      }
    });
  }

  public static async Update(media: IMedia, queueJob: QueueJob) {
    return new Promise(async (resolve, reject) => {
      await this.OnReady();
      const query = { media_id: media.idMal };
      const newValues = {
        $set: { next_episode: media.nextAiringEpisode.next }
      };
      await Mongo.Update(Tables.queue, query, newValues);
      await this.Init();
      const q = await this.GetQueue(media.idMal);
      if (NullCheck.Fine(q)) {
        const qj = new QueueJob(media, q as Queue);
        await this.AddJob(qj);
        await this.RemoveJob(queueJob);
        resolve();
      } else {
        resolve();
      }
    });
  }

  public static async Exists(mediaId: number) {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.OnReady();
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
      await this.OnReady();
      if (this.Queues === null || this.Queues === undefined) {
        reject(new Error(`"Queues" is 'null' or 'undefined'.`));
      } else {
        console.log(this.Queues);
        console.log(this.QueueJobs);
        resolve();
      }
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
