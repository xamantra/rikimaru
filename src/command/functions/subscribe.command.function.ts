import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { QueueData } from "./../../data/queue.data";
import { QueueJob } from "./../../models/queue.job.model";
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
import { Queue } from "../../models/subscription.model";

export class SubscribeFunction implements ICommandFunction {
  public async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await this.Search(message, command, dm);
  }

  private async Search(message: Message, command: ICommand, dm: boolean) {
    UserData.Insert(message.author.id).catch((reason: Error) => {
      console.log(reason.message);
    });
    MediaSearch.All(command.Parameter)
      .then(res => {
        const ongoing = MediaHandler.OngoingMedia(res);
        const unreleased = MediaHandler.UnreleasedMedia(res);
        if (ongoing.length === 0 && unreleased.length === 0) {
          MediaResult.SendInfo(
            message,
            "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.",
            dm
          );
        }
        const results: IMedia[] = [];
        const formattedResults: any[] = [];
        ongoing.forEach(async m => {
          results.push(m);
          formattedResults.push(MediaFormatHandler.Get(m));
        });
        unreleased.forEach(async m => {
          results.push(m);
          formattedResults.push(MediaFormatHandler.Get(m));
        });
        if (results.length === 1) {
          const discordId = message.author.id;
          const media = results[0];
          const title = TitleHelper.Get(results[0].title);
          MediaData.Insert(media, title)
            .then(insertId => {
              console.log(`Media ID: ${insertId}`);
              UserData.GetUser(discordId)
                .then(user => {
                  SubscriptionData.Insert(media.idMal, user.Id, message, dm)
                    .then(() => {
                      QueueData.GetQueue(media.idMal)
                        .then(queue => {
                          const queueJob = new QueueJob(user, media, queue);
                          QueueData.AddJob(queueJob);
                        })
                        .then(() => {
                          MediaResult.SendInfo(
                            message,
                            `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: \`-mysubs\` to view your subscriptions.\nEnter the command: \`-unsub ${title}\` to unsubscribe to this anime.`,
                            dm
                          );
                        });
                    })
                    .catch((reason: Error) => {
                      console.log(reason.message);
                    });
                })
                .catch((reason: Error) => {
                  console.log(reason.message);
                });
            })
            .catch((reason: Error) => {
              console.log(reason.message);
            });
        } else {
          MediaResult.SendInfo(
            message,
            SearchList.Embed(command, formattedResults),
            dm
          );
        }
      })
      .catch((reason: Error) => {
        MediaResult.SendInfo(
          message,
          "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.",
          dm
        );
        console.log(reason.message);
      });
  }
}
