import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { MediaSearch } from "./../../core/media.search";
import { SubscriptionData } from "./../../data/subscription.data";
import { TitleHelper } from "./../../helpers/title.helper";
import { MediaData } from "./../../data/media.data";
import { UserData } from "./../../data/user.data";
import { SearchList } from "./../../core/search.list";
import { MediaFormatHandler } from "./../../handlers/media.list.handler";
import { IMedia } from "./../../interfaces/page.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MediaHandler } from "../../handlers/media.handler";
import { ClientManager } from "../../core/client";
import { Sender } from "../../core/sender";
import { User } from "../../models/subscription.model";
import { AnimeCache } from "../../core/anime.cache";

export class SubscribeFunction implements ICommandFunction {
  public async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.Search(message, command, dm);
  }

  private async Search(message: Message, command: ICommand, dm: boolean) {
    UserData.Insert(message.author.id).catch((err: Error) => {
      console.log(err);
    });
    AnimeCache.Search(command.Parameter)
      .then(async res => {
        const ongoing = await MediaHandler.OngoingMedia(res);
        const unreleased = await MediaHandler.UnreleasedMedia(res);
        if (ongoing.length === 0 && unreleased.length === 0) {
          Sender.SendInfo(
            message,
            "There is nothing to subscribe. The anime you search might be **already completed** or it is **not yet aired and the release date is currently unknown**, or try **another keyword**.",
            dm
          );
          return;
        }
        const results: IMedia[] = [];
        const formattedResults: any[] = [];
        await ongoing.forEach(async m => {
          results.push(m);
          formattedResults.push(MediaFormatHandler.Get(m));
        });
        await unreleased.forEach(async m => {
          results.push(m);
          formattedResults.push(MediaFormatHandler.Get(m));
        });
        if (results.length === 1) {
          const discordId = message.author.id;
          const media = results[0];
          console.log(media);
          const title = TitleHelper.Get(results[0].title);
          await MediaData.Insert(media, title).catch((reason: Error) => {
            console.log(reason.message);
          });
          const user = await UserData.GetUser(discordId).catch(
            (reason: Error) => {
              console.log(reason.message);
            }
          );
          if (user instanceof User === false) return;
          await SubscriptionData.Insert(media.idMal, (user as User).Id).catch(
            async (reason: string) => {
              if (reason === "EXISTS") {
                const $embed = await SubscribeFunction.Embed(
                  message,
                  media,
                  false
                );
                Sender.SendInfo(message, $embed, dm);
              } else {
                console.log(reason);
              }
            }
          );
          const embed = await SubscribeFunction.Embed(message, media, true);
          Sender.SendInfo(message, embed, dm);
        } else if (results.length > 1) {
          const embed = await SearchList.Embed(
            message,
            command,
            formattedResults
          );
          Sender.SendInfo(message, embed, dm);
        }
      })
      .catch((reason: Error) => {
        Sender.SendInfo(
          message,
          "SYSTEM ERROR!!!. I couldn't apprehend. Please try again.",
          dm
        );
        console.log(reason.message);
      });
  }

  // tslint:disable-next-line:member-ordering
  public static async Embed(message: Message, media: IMedia, newSub: boolean) {
    return new Promise<any>(async (resolve, reject) => {
      const client = await ClientManager.GetClient();
      const t = TitleHelper.Get(media.title);
      const embed = {
        embed: {
          color: message.member.highestRole.color,
          thumbnail: { url: media.coverImage.large },
          title: `***${t}***`,
          url: `https://myanimelist.net/anime/${media.idMal}/`,
          description: newSub
            ? `You are now subscribed to this anime. *I will DM you when new episode is aired.*`
            : `You are already subscribed to this anime.`,
          fields: [
            { name: `To unsubscribe, type:`, value: `\`-unsub ${t}\`` },
            {
              name: `To view all subscription, type:`,
              value: `\`-viewsubs\``
            }
          ],
          timestamp: new Date(),
          footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
        }
      };
      resolve(embed);
    });
  }
}
