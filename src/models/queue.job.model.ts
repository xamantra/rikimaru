import { Queue, User } from "./subscription.model";
import { QueueData } from "./../data/queue.data";
import { Job } from "node-schedule";
import * as schedule from "node-schedule";
import moment, { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";
import { MediaSearch } from "../core/media.search";
import { Color } from "../core/colors";

export class QueueJob {
  private Job: Job;
  private JobDate: Date;
  constructor(public user: User, public media: IMedia, public queue: Queue) {}

  public StartQueue() {
    ClientManager.GetUser(this.user.DiscordId).then(user => {
      const nextEpisode = this.queue.NextEpisode;
      const media = this.media;
      // const title = TitleHelper.Get(media.title);
      if (nextEpisode === media.nextAiringEpisode.next) {
        this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
        this.Job = schedule.scheduleJob(
          `"${media.title}"`,
          this.JobDate,
          () => {
            user
              .send(this.Embed(media, media.nextAiringEpisode.next))
              .then(() => {
                this.Update();
              })
              .catch((error: Error) => {
                console.log(error.message);
              });
          }
        );
      } else if (nextEpisode < media.nextAiringEpisode.next) {
        console.log(this.queue, media);
        user
          .send(this.Embed(media, nextEpisode))
          .then(() => {
            this.Update();
          })
          .catch((error: Error) => {
            console.log(error.message);
          });
      } else {
        this.Update();
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

  private Update() {
    if (this.Job !== undefined && this.Job !== null) {
      this.Job.cancel(false);
    }
    QueueData.Update(this.user, this.media, this)
      .then(() => {
        console.log(`Removing Queue: ${this.media.idMal}`);
      })
      .catch((reason: Error) => {
        console.log(reason.message);
      });
  }

  private Embed(media: IMedia, episode: number) {
    const client = ClientManager.GetClient;
    const t = TitleHelper.Get(media.title);
    const embed = {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: media.coverImage.large
        },
        title: `***${t}***`,
        url: `https://myanimelist.net/anime/${media.idMal}/`,
        description: `**Episode ${episode}** *has been aired!*`,
        fields: [
          { name: `To unsubscribe, type:`, value: `\`-unsub ${t}\`` },
          { name: `To view all subscription, type:`, value: `\`-mysubs\`` }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
    return embed;
  }
}
