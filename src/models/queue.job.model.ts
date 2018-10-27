import { Queue, User } from "./subscription.model";
import { QueueData } from "./../data/queue.data";
import { Job } from "node-schedule";
import moment, { unix } from "moment";
import { ClientManager } from "../core/client";
import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";
import { MediaSearch } from "../core/media.search";
import { Color } from "../core/colors";

export class QueueJob {
  private Job: Job;
  private JobDate: Date;
  constructor(public user: User, public media: IMedia, public queue: Queue) { }

  public StartQueue() {
    ClientManager.GetUser(this.user.DiscordId).then(user => {
      const nextEpisode = this.queue.NextEpisode;
      const media = this.media;
      let timeout = media.nextAiringEpisode.timeUntilAiring * 1000;
      if (timeout > 2147483647) {
        timeout = 2147483647;
      }
      if (nextEpisode === media.nextAiringEpisode.next) {
        console.log(
          `${media.title.romaji} Episode ${
          media.nextAiringEpisode.next
          } is synced with the api, Cool!`
        );
        this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
        setTimeout(() => {
          user
            .send(this.Embed(media, media.nextAiringEpisode.next))
            .then(() => {
              setTimeout(() => {
                this.Update();
              }, 1800000);
            })
            .catch((error: Error) => {
              console.log(error.message);
            });
        }, timeout);
      } else if (nextEpisode < media.nextAiringEpisode.next) {
        console.log(
          `Oh!, ${media.title.romaji} Episode ${
          media.nextAiringEpisode.next
          } is NOT synced with the api!`
        );
        user
          .send(this.Embed(media, nextEpisode))
          .then(() => {
            setTimeout(() => {
              this.Update();
            }, 2000);
          })
          .catch((error: Error) => {
            console.log(error.message);
          });
      } else {
        setTimeout(() => {
          this.Update();
        }, 2000);
      }
    });
  }

  public Log() {
    const countdown = moment(this.JobDate).toNow(true);
    const title = TitleHelper.Get(this.media.title);
    console.log(
      `Queue Job { Queue Episode: "Episode ${this.queue.NextEpisode}" User: "${
      this.user.DiscordId
      }": "${title} Episode ${
      this.media.nextAiringEpisode.next
      }"  in  ${countdown} }`
    );
  }

  private Update() {
    MediaSearch.Find(this.media.idMal).then(media => {
      QueueData.Update(this.user, media, this)
        .then(() => {
          console.log(`Removed Queue: ${media.idMal}`);
        })
        .catch(error => {
          console.warn(
            `Error while searching : [MediaSearch.Find(${this.media.idMal})]`
          );
        });
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
          { name: `To view all subscription, type:`, value: `\`-viewsubs\`` }
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
