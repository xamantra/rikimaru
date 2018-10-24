import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { MediaSearch } from "./../../core/media.search";
import { SubscriptionData } from "./../../data/subscription.data";
import { TitleHelper } from "./../../helpers/title.helper";
import { MediaData } from "./../../data/media.data";
import { UserData } from "./../../data/user.data";
import { MediaResult } from "./../../core/media.result";
import { SearchList } from "./../../core/search.list";
import { MediaFormatHandler } from "./../../handlers/media.list.handler";
import { IMedia } from "./../../interfaces/page.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MediaHandler } from "../../handlers/media.handler";

export class SubscribeFunction implements ICommandFunction {
  public async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.Search(message, command, dm);
  }

  private async Search(message: Message, command: ICommand, dm: boolean) {
    await MediaSearch.All(command.Parameter, async (res: IMedia[]) => {
      const ongoing = await MediaHandler.OngoingMedia(res);
      const unreleased = await MediaHandler.UnreleasedMedia(res);
      if (ongoing.length === 0 && unreleased.length === 0) {
        await MediaResult.SendInfo(
          message,
          "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.",
          dm
        );
        return;
      }
      const results: IMedia[] = [];
      const formattedResults: any[] = [];
      await ongoing.forEach(async m => {
        results.push(m);
        await formattedResults.push(MediaFormatHandler.Get(m));
      });
      await unreleased.forEach(async m => {
        results.push(m);
        await formattedResults.push(MediaFormatHandler.Get(m));
      });
      if (results.length === 1) {
        const discordId = message.author.id;
        const mediaId = results[0].idMal;
        const title = TitleHelper.Get(results[0].title);
        await MediaData.Exists(mediaId, async exists => {
          if (exists === false) {
            await MediaData.Insert(mediaId, title, async insertId => {
              await console.log(insertId);
            });
          }
        });
        await UserData.GetUser(discordId, async (user, err) => {
          if (err === false) {
            await SubscriptionData.Exists(mediaId, user.Id, async exists => {
              if (exists === false) {
                await SubscriptionData.Insert(mediaId, user.Id, async () => {
                  await MediaResult.SendInfo(
                    message,
                    `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: \`-mysubs\` to view your subscriptions.\nEnter the command: \`-unsub ${title}\` to unsubscribe to this anime.`,
                    dm
                  );
                });
              } else {
                await MediaResult.SendInfo(
                  message,
                  `Cool! You are already subscribed to ***${title}***.\nEnter the command \`-unsub ${title}\`  to unsubscribe to this anime.`,
                  dm
                );
              }
            });
          }
        });
        return;
      } else {
        await MediaResult.SendInfo(
          message,
          await SearchList.Embed(command, formattedResults),
          dm
        );
      }
    });
  }
}
