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
import { AnimeCache } from "../core/anime.cache";
import { NullCheck } from "../helpers/null.checker.helper";
import { Config } from "../core/config";

export class QueueJob {
  private JobDate: Date;
  constructor(public media: IMedia, public queue: Queue) {}

  public async Check() {
    return new Promise(async (resolve, reject) => {
      const queueEpisode = this.queue.NextEpisode;
      const media = this.media;
      const title = TitleHelper.Get(media.title);
      this.JobDate = unix(media.nextAiringEpisode.airingAt).toDate();
      if (MediaStatus.Completed(media) && media.episodes === 1) {
        await this.FindUser(title, queueEpisode, media);
        resolve();
      } else if (queueEpisode < media.nextAiringEpisode.next) {
        await this.FindUser(title, queueEpisode, media);
        resolve();
      }
    });
  }

  private FindUser(title: string, nextEpisode: number, media: IMedia) {
    return new Promise(async (resolve, reject) => {
      console.log(`Getting subscribers of "${title}"`);
      const subscribers = await SubscriptionData.GetSubscribers(
        this.media.idMal
      );
      if (subscribers.length === 0) {
        this.Update();
        resolve();
      }
      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];
        const user = await ClientManager.GetUser(subscriber.DiscordId);
        if (NullCheck.Fine(user)) {
          await this.SendMessage(title, nextEpisode, media, user);
          if (i === subscribers.length - 1) {
            await this.Update();
            resolve();
          }
        } else {
          if (i === subscribers.length - 1) {
            await this.Update();
            resolve();
          }
        }
      }
    });
  }

  private SendMessage(
    title: string,
    nextEpisode: number,
    media: IMedia,
    user: User
  ) {
    return new Promise(async (resolve, reject) => {
      const embed = await this.EmbedTemplate(media, nextEpisode);
      await user
        .send(embed)
        .then(async () => {
          console.log(
            `DM has been sent to "${
              user.username
            }" for "${title} Episode ${nextEpisode}"`
          );
          // await this.Sleep(1000);
          // const support = await this.SupportTemplate();
          // await user.send(support).catch(err => {
          //   console.log(err);
          // });
          resolve();
        })
        .catch(err => {
          console.log(err);
          resolve();
        });
    });
  }

  private Update() {
    return new Promise(async (resolve, reject) => {
      const media = await AnimeCache.Get(this.media.idMal);
      if (NullCheck.Fine(media)) {
        await QueueData.Update(media, this);
        console.log(`Removed Queue: ${media.idMal}`);
        resolve();
      } else {
        console.warn(
          `Error while searching : [MediaSearch.Find(${
            this.media.idMal
          })]. Trying again...`
        );
        await this.Update();
        resolve();
      }
    });
  }

  private EmbedTemplate(media: IMedia, episode: number) {
    return new Promise<any>(async (resolve, reject) => {
      const prefix = Config.COMMAND_PREFIX;
      const client = await ClientManager.GetClient();
      const t = TitleHelper.Get(media.title);
      let episodes = `?`;
      if (NullCheck.Fine(media.episodes)) {
        episodes = `${media.episodes}`;
      }
      const embed = {
        embed: {
          color: Color.Random,
          thumbnail: {
            url: media.coverImage.large
          },
          title: `${t}`,
          url: `${Config.MAL_ANIME_BASE}/${media.idMal}/`,
          description: `Episode ***${episode}***/${episodes} is now airing.`,
          fields: [
            {
              name: `Links:`,
              value: `[MyAnimeList](${Config.MAL_ANIME_BASE}/${
                media.idMal
              }/)  |  [AniList](${Config.ANI_ANIME_BASE}/${media.id}/)`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: `© ${Config.BOT_NAME}`
          }
        }
      };
      resolve(embed);
    });
  }

  // private SupportTemplate() {
  //   return new Promise<any>((resolve, reject) => {
  //     const embed = {
  //       embed: {
  //         color: Color.Random,
  //         fields: [
  //           {
  //             name: `Support me on Discord Bot List (DBL)`,
  //             value: `[Vote to ${Config.BOT_NAME}](${Config.DBL_BOT_LINK}/vote)`
  //           }
  //         ]
  //       }
  //     };
  //     resolve(embed);
  //   });
  // }

  // private Sleep(timeout: number) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, timeout);
  //   });
  // }
}
