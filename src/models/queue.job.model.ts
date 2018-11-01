import { Queue } from "./subscription.model";
import { QueueData } from "./../data/queue.data";
import moment, { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";
import { MediaSearch } from "../core/media.search";
import { Color } from "../core/colors";
import { SubscriptionData } from "../data/subscription.data";
import { User } from "discord.js";
import { MediaStatus } from "../core/media.status";

export class QueueJob {
  private JobDate: Date;
  constructor(public media: IMedia, public queue: Queue) {}

  public Check() {
    const queueEpisode = this.queue.NextEpisode;
    const media = this.media;
    const title = TitleHelper.Get(media.title);
    this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
    if (MediaStatus.Completed(media) && media.episodes === 1) {
      this.FindUser(title, queueEpisode, media);
    } else if (queueEpisode < media.nextAiringEpisode.next) {
      console.log(`queueEpisode < media.nextAiringEpisode.next`);
      this.FindUser(title, queueEpisode, media);
    }
  }

  private FindUser(title: string, nextEpisode: number, media: IMedia) {
    console.log(`Getting subscribers of "${title}"`);
    SubscriptionData.GetSubscribers(this.media.idMal)
      .then(subscribers => {
        subscribers.forEach(subscriber => {
          console.log(subscriber);
          ClientManager.GetUser(subscriber.DiscordId)
            .then(user => {
              if (user.id === subscriber.DiscordId) {
                this.SendMessage(title, nextEpisode, media, user);
              }
            })
            .catch((err: Error) => {
              console.log(err.message);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  private SendMessage(
    title: string,
    nextEpisode: number,
    media: IMedia,
    user: User
  ) {
    console.log(`Oh!, ${title} Episode ${nextEpisode} has been released!`);
    this.EmbedTemplate(media, nextEpisode).then(embed => {
      user
        .send(embed)
        .then(() => {
          this.Update();
        })
        .catch((error: Error) => {
          console.log(`Queue Job: "${error.message}"`);
        });
    });
  }

  public Log() {
    const countdown = moment(this.JobDate).toNow(true);
    const title = TitleHelper.Get(this.media.title);
    console.log(
      `Queue Job { Queue Episode: "${
        this.queue.NextEpisode
      }", "${title} Episode ${
        this.media.nextAiringEpisode.next
      }"  in  ${countdown} }`
    );
  }

  private Update() {
    MediaSearch.Find(this.media.idMal)
      .then(media => {
        QueueData.Update(media, this)
          .then(() => {
            console.log(`Removed Queue: ${media.idMal}`);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.warn(
          `Error while searching : [MediaSearch.Find(${
            this.media.idMal
          })]. Trying again...`
        );
        this.Update();
      });
  }

  private async EmbedTemplate(media: IMedia, episode: number) {
    return new Promise<any>((resolve, reject) => {
      ClientManager.GetClient().then(client => {
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
              {
                name: `To view all subscription, type:`,
                value: `\`-viewsubs\``
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Rikimaru"
            }
          }
        };
        resolve(embed);
      });
    });
  }
}
