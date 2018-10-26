import { Queue, User } from "./subscription.model";
import { MediaData } from "./../data/media.data";
import { QueueData } from "./../data/queue.data";
import { Job } from "node-schedule";
import * as schedule from "node-schedule";
import moment, { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";
import { MediaSearch } from "../core/media.search";

export class QueueJob {
  private Job: Job;
  private JobDate: Date;
  constructor(public user: User, public media: IMedia, public queue: Queue) {}

  public StartQueue() {
    ClientManager.GetUser(this.user.DiscordId).then(user => {
      const nextEpisode = this.queue.NextEpisode;
      const media = this.media;
      const title = TitleHelper.Get(media.title);
      if (nextEpisode === media.nextAiringEpisode.next) {
        this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
        this.Job = schedule.scheduleJob(
          `"${media.title}"`,
          this.JobDate,
          () => {
            user
              .send(
                `***${title}***  *Episode: ${nextEpisode}*  has been aired!`
              )
              .then(() => {
                this.Update(media.idMal);
              })
              .catch((error: Error) => {
                console.log(error.message);
              });
          }
        );
      } else if (nextEpisode < media.nextAiringEpisode.next) {
        user
          .send(`***${title}***  *Episode: ${nextEpisode}*  has been aired!`)
          .then(() => {
            this.Update(media.idMal);
          })
          .catch((error: Error) => {
            console.log(error.message);
          });
      } else {
        this.Update(media.idMal);
      }
    });
  }

  public Cancel() {
    if (this.Job !== undefined && this.Job !== null) {
      this.Job.cancel(false);
      this.Job = null;
    }
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

  private Update(mediaId: number) {
    MediaSearch.Find(mediaId)
      .then($m => {
        QueueData.Update($m)
          .then(() => {
            QueueData.RemoveJob(this);
          })
          .catch((reason: Error) => {
            console.log(reason.message);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  private Embed() {}
}
