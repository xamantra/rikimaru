import { ICommandFunction } from "../../interfaces/command.function.interface";
import { MediaSearch } from "./../../core/media.search";
import { SubscriptionData } from "./../../data/subscription.data";
import { Anilist } from "./../../core/anilist";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { IMedia } from "../../interfaces/page.interface";
import { JsonHelper } from "../../helpers/json.helper";
import { Root } from "../../models/root.model";
import { UserData } from "../../data/user.data";
import { MediaResult } from "../../core/media.result";
import { MediaFormatHandler } from "../../handlers/media.list.handler";
import { SearchList } from "../../core/search.list";

export class UnsubFunction implements ICommandFunction {
  public Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.Search(message, command, dm);
  }

  private Search(message?: Message, command?: ICommand, dm?: boolean) {
    const title = command.Parameter;
    let media: IMedia[] = [];
    const discordId = message.author.id;
    const userId = UserData.GetUser(discordId).Id;
    const userMedia: number[] = [];
    const filteredMedia: IMedia[] = [];
    const formattedResults: any[] = [];
    MediaSearch.All(command.Parameter, (res: IMedia[]) => {
      media = res;
      SubscriptionData.All.forEach(sub => {
        if (sub.UserId === userId) {
          userMedia.push(sub.MediaId);
        }
      });
      media.forEach(m => {
        if (userMedia.includes(m.idMal)) {
          filteredMedia.push(m);
          formattedResults.push(MediaFormatHandler.Get(m));
        }
        if (filteredMedia.length === 0) {
          MediaResult.SendInfo(
            message,
            `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`,
            dm
          );
        } else if (filteredMedia.length === 1) {
          SubscriptionData.Delete(filteredMedia[0].idMal, discordId, () => {
            MediaResult.SendInfo(
              message,
              `You are now unsubscribed from  ***${title}***`,
              dm
            );
          });
        } else {
          MediaResult.SendInfo(
            message,
            SearchList.Embed(command, formattedResults),
            dm
          );
        }
      });
    });
  }
}
