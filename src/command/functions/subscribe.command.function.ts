import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { QueueData } from "./../../data/queue.data";
import { QueueJob } from "./../../models/queue.job.model";
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
import { Awaiter } from "../awaiter";
import { MessageHelper } from "../../helpers/message.helper";

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
    Awaiter.Send(message, 2000, ($m: Message) => {
      MediaSearch.All(command.Parameter)
        .then(res => {
          console.log(
            `There are "${res.length} results" for the search "${
              command.Parameter
            }".`
          );
          const ongoing = MediaHandler.OngoingMedia(res);
          const unreleased = MediaHandler.UnreleasedMedia(res);
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
            console.log(media);
            const title = TitleHelper.Get(results[0].title);
            MediaData.Insert(media, title)
              .then(insertId => {
                console.log(insertId);
                UserData.GetUser(discordId)
                  .then(user => {
                    console.log(user);
                    SubscriptionData.Insert(media.idMal, user.Id)
                      .then(() => {
                        QueueData.GetQueue(media.idMal).then(queue => {
                          const queueJob = new QueueJob(media, queue);
                          QueueData.AddJob(queueJob).then(() => {
                            SubscribeFunction.Embed(message, media, true).then(
                              embed => {
                                Sender.SendInfo(message, embed, dm);
                                console.log(`Added to queue: ${insertId}`);
                              }
                            );
                          });
                        });
                      })
                      .catch((reason: string) => {
                        if (reason === "EXISTS") {
                          SubscribeFunction.Embed(message, media, false).then(
                            embed => {
                              Sender.SendInfo(message, embed, dm);
                            }
                          );
                        } else {
                          console.log(reason);
                        }
                      });
                  })
                  .catch((reason: Error) => {
                    console.log(reason.message);
                  });
              })
              .catch((reason: Error) => {
                console.log(reason.message);
              });
          } else if (results.length > 1) {
            SearchList.Embed(message, command, formattedResults).then(embed => {
              Sender.SendInfo(message, embed, dm);
            });
          }
          MessageHelper.Delete($m);
        })
        .catch((reason: Error) => {
          Sender.SendInfo(
            message,
            "SYSTEM ERROR!!!. I couldn't apprehend. Please try again.",
            dm
          );
          console.log(reason.message);
          MessageHelper.Delete($m);
        });
    });
  }

  // tslint:disable-next-line:member-ordering
  public static async Embed(message: Message, media: IMedia, newSub: boolean) {
    return new Promise<any>((resolve, reject) => {
      ClientManager.GetClient().then(client => {
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
    });
  }
}
