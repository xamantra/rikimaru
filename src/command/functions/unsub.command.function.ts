import { ICommandFunction } from "../../interfaces/command.function.interface";
import { SubscriptionData } from "./../../data/subscription.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { IMedia } from "../../interfaces/page.interface";
import { UserData } from "../../data/user.data";
import { MediaFormatHandler } from "../../handlers/media.list.handler";
import { SearchList } from "../../core/search.list";
import { TitleHelper } from "../../helpers/title.helper";
import { Sender } from "./../../core/sender";
import { User } from "../../models/subscription.model";
import { AnimeCache } from "../../core/anime.cache";

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
    const discordId = message.author.id;
    const userMedia: number[] = [];
    const filteredMedia: IMedia[] = [];
    const formattedResults: any[] = [];
    const user = await UserData.GetUser(discordId);
    if (user === null) {
      Sender.SendError(message, dm);
      return;
    }
    const media = await AnimeCache.Search(command.Parameter);
    await SubscriptionData.All.forEach(async sub => {
      if (sub.UserId === (user as User).Id) {
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
      Sender.SendInfo(
        message,
        `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`,
        dm
      );
    } else if (filteredMedia.length === 1) {
      await SubscriptionData.Delete(filteredMedia[0].idMal, discordId);
      Sender.SendInfo(
        message,
        `You are now unsubscribed from  ***${TitleHelper.Get(
          filteredMedia[0].title
        )}***`,
        dm
      );
    } else {
      const embed = await SearchList.Embed(message, command, formattedResults);
      Sender.SendInfo(message, embed, dm);
    }
  }
}
