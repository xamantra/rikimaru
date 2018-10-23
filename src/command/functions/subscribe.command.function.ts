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
import { Anilist } from "../../core/anilist";
import { JsonHelper } from "../../helpers/json.helper";
import { Root } from "../../models/root.model";
import { MediaHandler } from "../../handlers/media.handler";
import { User } from "../../models/subscription.model";

export class SubscribeFunction implements ICommandFunction {
  public Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.Search(message, command, dm);
  }

  private Search(message: Message, command: ICommand, dm: boolean) {
    MediaSearch.All(command.Parameter, (res: IMedia[]) => {
      const ongoing = MediaHandler.OngoingMedia(res);
      const unreleased = MediaHandler.UnreleasedMedia(res);
      if (ongoing.length === 0 && unreleased.length === 0) {
        MediaResult.SendInfo(
          message,
          "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown.",
          dm
        );
        return;
      }
      const results: IMedia[] = [];
      const formattedResults: any[] = [];
      ongoing.forEach(m => {
        results.push(m);
        formattedResults.push(MediaFormatHandler.Get(m));
      });
      unreleased.forEach(m => {
        results.push(m);
        formattedResults.push(MediaFormatHandler.Get(m));
      });
      if (results.length === 1) {
        const discordId = message.author.id;
        let user = UserData.GetUser(discordId);
        if (user === undefined) {
          user = new User();
          user.Id = -1;
          user.DiscordId = discordId;
        }
        const mediaId = results[0].idMal;
        const title = TitleHelper.Get(results[0].title);
        if (!UserData.Exists(discordId)) {
          UserData.Add(discordId);
        }
        if (!MediaData.Exist(mediaId)) {
          MediaData.Add(mediaId, title);
        }
        if (!SubscriptionData.Exists(mediaId, user.Id)) {
          SubscriptionData.Add(mediaId, user.Id);
          MediaResult.SendInfo(
            message,
            `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: ***-mysubs*** to view your subscriptions.`,
            dm
          );
        } else {
          MediaResult.SendInfo(
            message,
            `Cool! You are already subscribed to ***${title}***.\nEnter the command ***-unsub ${title}***  to unsubscribe to this anime.`,
            dm
          );
        }
        return;
      } else {
        MediaResult.SendInfo(
          message,
          SearchList.Embed(command, formattedResults),
          dm
        );
      }
    });
  }
}
