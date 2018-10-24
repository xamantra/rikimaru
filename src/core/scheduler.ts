import * as schedule from "node-schedule";
import moment, { unix } from "moment";
import { IMedia } from "../interfaces/page.interface";

export class Scheduler {
  private static _instance: Scheduler;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async Add(media: IMedia, callback: (job: schedule.Job) => void) {
    const sched = await moment(unix(media.nextAiringEpisode.airingAt)).toDate();
    const job = await schedule.scheduleJob(sched, async () => {
      await callback(job);
    });
  }
}
