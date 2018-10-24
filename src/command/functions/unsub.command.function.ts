import { ICommandFunction } from "../../interfaces/command.function.interface";
import { MediaSearch } from "./../../core/media.search";
import { SubscriptionData } from "./../../data/subscription.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { IMedia } from "../../interfaces/page.interface";
import { UserData } from "../../data/user.data";
import { MediaResult } from "../../core/media.result";
import { MediaFormatHandler } from "../../handlers/media.list.handler";
import { SearchList } from "../../core/search.list";
import { TitleHelper } from "../../helpers/title.helper";

export class UnsubFunction implements ICommandFunction {
  public async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.Search(message, command, dm);
  }

  private async Search(message?: Message, command?: ICommand, dm?: boolean) {
    const title = command.Parameter;
    let media: IMedia[] = [];
    const discordId = message.author.id;
    let userId: number;
    await UserData.GetUser(discordId, async (user, err) => {
      if (err) {
        console.log(err);
        return;
      }
      userId = await user.Id;
    });
    const userMedia: number[] = [];
    const filteredMedia: IMedia[] = [];
    const formattedResults: any[] = [];
    await MediaSearch.All(command.Parameter, async (res: IMedia[]) => {
      media = res;
      await SubscriptionData.All.forEach(async sub => {
        if (sub.UserId === userId) {
          await userMedia.push(sub.MediaId);
        }
      });
      await media.forEach(async m => {
        if (userMedia.includes(m.idMal)) {
          await filteredMedia.push(m);
          await formattedResults.push(MediaFormatHandler.Get(m));
        }
      });
      if (filteredMedia.length === 0) {
        await MediaResult.SendInfo(
          message,
          `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`,
          dm
        );
      } else if (filteredMedia.length === 1) {
        await SubscriptionData.Delete(
          filteredMedia[0].idMal,
          discordId,
          async () => {
            await MediaResult.SendInfo(
              message,
              `You are now unsubscribed from  ***${TitleHelper.Get(
                filteredMedia[0].title
              )}***`,
              dm
            );
          }
        );
      } else {
        await MediaResult.SendInfo(
          message,
          SearchList.Embed(command, formattedResults),
          dm
        );
      }
    });
  }
}
