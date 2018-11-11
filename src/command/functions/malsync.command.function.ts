import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MalBindData } from "../../data/mal.bind.data";
import { Sender } from "../../core/sender";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { ClientManager } from "../../core/client";
import { MAL } from "../../core/mal";
import { AnimeCache } from "../../core/anime.cache";
import { QueueData } from "../../data/queue.data";
import { MediaStatus } from "../../core/media.status";

export class MalSyncFunction implements ICommandFunction {
  async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.GetAll(message, dm).catch(err => {
      console.log(err);
      this.SendStatus(message, dm);
    });
    const client = await ClientManager.GetClient();
    const res$m = `Your *MAL currently watching list* is now synced with your subscriptions.`;
    Sender.Send(
      message,
      {
        embed: {
          color: message.member.highestRole.color,
          thumbnail: { url: message.author.avatarURL },
          title: `Rikimaru MAL Auto Subscribe`,
          description: res$m,
          fields: [
            {
              name: `To unsubscribe, type:`,
              value: `\`-unsub anime title or keyword here\``
            },
            {
              name: `To view all subscription, type:`,
              value: `\`-viewsubs\``
            },
            {
              name: `Please Note: `,
              value: `If you've just modified your list, please wait at least 1 minute to **-malsync**.`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Rikimaru"
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
    const mal = await MalBindData.Get(message.author.id);
    if (mal === null) {
      this.SendStatus(message, dm);
      return;
    }

    if (mal.Verified === true) {
      const user = await UserData.GetUser(message.author.id);
      if (user === null) {
        Sender.SendError(message, dm);
        return;
      }
      const list = await MAL.GetCWList(mal.MalUsername);
      if (list === null) {
        Sender.SendError(message, dm);
        return;
      }
      const subs = await SubscriptionData.GetUserSubs(user.Id);
      for (let i = 0; i < subs.length; i++) {
        const $s = subs[i];
        const malAnime = list.find($ma => $ma.anime_id === $s.MediaId);
        if (malAnime !== null && malAnime !== undefined) {
        } else {
          await SubscriptionData.Delete($s.MediaId, user.DiscordId);
        }
      }

      for (let i = 0; i < list.length; i++) {
        const fromList = list[i];
        const anime = await AnimeCache.Get(fromList.anime_id);
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
      `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`,
      dm
    );
  }
}
