import { Queue, User } from "./subscription.model";
import { QueueData } from "./../data/queue.data";
import { Job } from "node-schedule";
import * as schedule from "node-schedule";
import { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";

export class QueueJob {
  constructor(
    private user: User,
    private media: IMedia,
    private queue: Queue
  ) {}

  public StartQueue() {
    const user = ClientManager.GetClient.users.get(this.user.DiscordId);
    const mediaId = this.queue.MediaId;
    const nextEpisode = this.queue.NextEpisode;
    const media = this.media;
    let job: Job = null;
    if (nextEpisode === media.nextAiringEpisode.next) {
      const date = unix(media.nextAiringEpisode.timeUntilAiring).toDate();
      job = schedule.scheduleJob(date, () => {
        user.send(
          `***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`
        );
        job = null;
        job.cancel(false);
        this.StartQueue();
      });
      return;
    }

    if (nextEpisode < media.nextAiringEpisode.next) {
      QueueData.Update(mediaId, media.nextAiringEpisode.next)
        .then(() => {
          user.send(
            `***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`
          );
          if (job !== null) {
            job.cancel(false);
            job = null;
          }
          this.StartQueue();
        })
        .catch((reason: Error) => {
          console.log(reason.message);
        });
      return;
    }
  }

  public Log() {
    console.log(
      `QueueJob >>> User: ${this.user.DiscordId}, Media: ${
        this.media.title
      } Episode ${this.media.nextAiringEpisode.next}, Queue: ${
        this.queue.Id
      } Episode: ${this.queue.NextEpisode}`
    );
  }
}
