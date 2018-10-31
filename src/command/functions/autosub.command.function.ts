import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MalBindData } from "../../data/mal.sync.data";
import { JikanRequest } from "../../core/jikan";
import { MediaSearch } from "../../core/media.search";
import { Sender } from "../../core/sender";
import { TitleHelper } from "../../helpers/title.helper";
import { MediaData } from "../../data/media.data";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { QueueData } from "../../data/queue.data";
import { QueueJob } from "../../models/queue.job.model";
import { ClientManager } from "../../core/client";
import { AnimeList } from "../../models/jikan.anime.list";

export class AutoSubFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.GetAll(message, dm)
      .then(count => {
        ClientManager.GetClient().then(client => {
          Sender.Send(
            message,
            {
              embed: {
                color: message.member.highestRole.color,
                thumbnail: { url: message.author.avatarURL },
                title: `**Rikimaru MAL Auto Subscribe**`,
                description: `That was sweet! You are now subcribe to **${count} ongoing anime** from your MAL List.`,
                fields: [
                  {
                    name: `To unsubscribe, type:`,
                    value: `\`-unsub anime title or keyword here\``
                  },
                  {
                    name: `To view all subscription, type:`,
                    value: `\`-viewsubs\``
                  }
                ],
                timestamp: new Date(),
                footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
              }
            },
            dm
          );
        });
      })
      .catch(err => {
        console.log(err);
        Sender.Send(
          message,
          `Oops! It looks like you haven't binded you account with rikimaru discord yet.\nEnter the command **-malbind malusername** to bind your account.`,
          dm
        );
      });
  }

  private GetAll(message: Message, dm: boolean) {
    return new Promise<number>((resolve, reject) => {
      UserData.Insert(message.author.id)
        .then(insertId => {
          this.Run(resolve, reject, message, dm);
        })
        .catch(err => {
          this.Run(resolve, reject, message, dm);
        });
    });
  }

  private Run(
    resolve: (res: number) => void,
    reject: (reason?: any) => void,
    message: Message,
    dm: boolean
  ) {
    MalBindData.Get(message.author.id)
      .then(mal => {
        if (mal.Verified === true) {
          JikanRequest.AnimeList(mal.MalUsername, "watching")
            .then(animeList => {
              let iteration = 0;
              animeList.anime.forEach(anime => {
                iteration++;
                MediaSearch.Find(anime.mal_id)
                  .then(media => {
                    const discordId = message.author.id;
                    console.log(media);
                    const title = TitleHelper.Get(media.title);
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
                                    console.log(`Added to queue: ${insertId}`);
                                    this.Check(iteration, animeList, resolve);
                                  });
                                });
                              })
                              .catch((reason: string) => {
                                if (reason === "EXISTS") {
                                  console.log(`Already subscribed.`);
                                  this.Check(iteration, animeList, resolve);
                                } else {
                                  console.log(reason);
                                  this.Check(iteration, animeList, resolve);
                                  return;
                                }
                              });
                          })
                          .catch((reason: Error) => {
                            console.log(reason.message);
                            this.Check(iteration, animeList, resolve);
                            return;
                          });
                      })
                      .catch((reason: Error) => {
                        console.log(reason.message);
                        this.Check(iteration, animeList, resolve);
                        return;
                      });
                    return;
                  })
                  .catch((reason: Error) => {
                    console.log(reason.message);
                    this.Check(iteration, animeList, resolve);
                  });
                this.Check(iteration, animeList, resolve);
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          Sender.Send(
            message,
            `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`,
            dm
          );
        }
      })
      .catch(err => {
        reject(err);
      });
  }

  private Check(
    iteration: number,
    animeList: AnimeList,
    resolve: (count: number) => void
  ) {
    if (iteration === animeList.anime.length) {
      resolve(animeList.anime.length);
    }
  }
}
