import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { Sender } from "../../core/sender";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { ClientManager } from "../../core/client";
import { AnimeCache } from "../../core/anime.cache";
import { QueueData } from "../../data/queue.data";
import { MediaStatus } from "../../core/media.status";
import { Config } from "../../core/config";
import { AniBindData } from "../../data/ani.bind.data";
import { AniList } from "../../core/anilist";
import { JsonHelper } from "../../helpers/json.helper";
import { ListRoot } from "../../models/ani.sync.model";
import { NullCheck } from "../../helpers/null.checker.helper";

export class AniSyncFunction implements ICommandFunction {
  async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.GetAll(message, dm).catch(err => {
      console.log(err);
      this.SendStatus(message, dm);
    });
    const client = ClientManager.Client;
    const res$m = `Your *AniList currently watching list* is now synced with your subscriptions.`;
    const prefix = Config.COMMAND_PREFIX;
    Sender.Send(
      message,
      {
        embed: {
          color: message.member.highestRole.color,
          thumbnail: { url: message.author.avatarURL },
          title: `${Config.BOT_NAME} AniList Auto Subscribe`,
          description: res$m,
          fields: [
            {
              name: `To unsubscribe, type:`,
              value: `\`${prefix}unsub anime title or keyword here\``
            },
            {
              name: `To view all subscription, type:`,
              value: `\`${prefix}viewsubs\``
            },
            {
              name: `Please Note: `,
              value: `If you've just modified your list, please wait at least 1 minute to **${prefix}anisync**.`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: `© ${Config.BOT_NAME}`
          }
        }
      },
      dm
    );
  }

  private GetAll(message: Message, dm: boolean) {
    return new Promise(async (resolve, reject) => {
      await UserData.Insert(message.author.id).catch(err => console.log(err));
      this.Run(resolve, reject, message, dm);
    });
  }

  private async Run(
    resolve: () => void,
    reject: (reason?: any) => void,
    message: Message,
    dm: boolean
  ) {
    const ani = await AniBindData.Get(message.author.id);
    if (ani === null) {
      this.SendStatus(message, dm);
      return;
    }

    if (ani.Verified === true) {
      const user = await UserData.GetUser(message.author.id);
      if (user === null) {
        Sender.SendError(message, dm);
        return;
      }
      const apiResult = await AniList.MediaListQuery(ani.AniListId);
      if (!NullCheck.Fine(apiResult)) {
        Sender.SendError(message, dm);
        return;
      }
      const converted = await JsonHelper.Convert<ListRoot>(apiResult, ListRoot);
      if (!NullCheck.Fine(converted)) {
        Sender.SendError(message, dm);
        return;
      }
      const list = converted.data.collection.lists[0].entries;
      if (!NullCheck.Fine(list)) {
        Sender.SendError(message, dm);
        return;
      }
      const subs = await SubscriptionData.GetUserSubs(user.Id);
      for (let i = 0; i < subs.length; i++) {
        const $s = subs[i];
        const anilistAnime = list.find($ma => $ma.media.idMal === $s.MediaId);
        if (anilistAnime !== null && anilistAnime !== undefined) {
        } else {
          await SubscriptionData.Delete($s.MediaId, user.DiscordId);
        }
      }

      for (let i = 0; i < list.length; i++) {
        const fromList = list[i];
        const anime = await AnimeCache.Get(fromList.media.idMal);
        if (MediaStatus.Ongoing(anime) || MediaStatus.NotYetAired(anime)) {
          await QueueData.Insert(anime.idMal, anime.nextAiringEpisode.next);
          await SubscriptionData.Insert(anime.idMal, user.Id);
          if (i === list.length - 1) {
            resolve();
          }
        } else {
          if (i === list.length - 1) {
            resolve();
          }
        }
      }
    } else {
      this.SendStatus(message, dm);
    }
  }

  private SendStatus(message: Message, dm: boolean) {
    Sender.Send(
      message,
      `Oops! Your AniList account is not verified and binded.\n Enter the command **${
        Config.COMMAND_PREFIX
      }anibind anilistusername**`,
      dm
    );
  }
}
