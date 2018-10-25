import { Queue, User } from "./subscription.model";
import { MediaData } from "./../data/media.data";
import { QueueData } from "./../data/queue.data";
import { Job } from "node-schedule";
import * as schedule from "node-schedule";
import moment, { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";

export class QueueJob {
  private Job: Job;
  private JobDate: Date;
  constructor(public user: User, public media: IMedia, public queue: Queue) {}

  public StartQueue() {
    const user = ClientManager.GetClient.users.get(this.user.DiscordId);
    const mediaId = this.queue.MediaId;
    const nextEpisode = this.queue.NextEpisode;
    const media = this.media;
    if (nextEpisode === media.nextAiringEpisode.next) {
      this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
      this.Job = schedule.scheduleJob(
        `User: "${user.username}", Media: "${media.title}"`,
        this.JobDate,
        () => {
          user
            .send(
              `***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`
            )
            .then(() => {
              this.Job = null;
              this.Job.cancel(false);
              QueueData.RemoveJob(this);
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    }

    if (nextEpisode < media.nextAiringEpisode.next) {
      QueueData.Update(mediaId, media.nextAiringEpisode.next)
        .then(() => {
          user.send(
            `***${media.title}***  *Episode: ${nextEpisode}*  has been aired!`
          );
          if (this.Job !== null) {
            QueueData.RemoveJob(this);
          }
        })
        .catch((reason: Error) => {
          console.log(reason.message);
        });
      return;
    }
  }

  public Cancel() {
    this.Job.cancel(false);
    this.Job = null;
    QueueData.RemoveJob(this);
  }

  public Log() {
    const countdown = moment(this.JobDate).toNow(true);
    console.log(
      `QueueJob >>> User: ${this.user.DiscordId}, Media: ${TitleHelper.Get(
        this.media.title
      )} Episode ${this.media.nextAiringEpisode.next}, Queue: ${
        this.queue.Id
      } Episode: ${this.queue.NextEpisode}, JobDate: ${
        this.JobDate
      }, TimeRemaining: ${countdown}`
    );
  }
}
