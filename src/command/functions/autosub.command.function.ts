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
import { ClientManager } from "../../core/client";
import { AnimeList } from "../../models/jikan.anime.list";
import { Awaiter } from "../awaiter";
import { MessageHelper } from "../../helpers/message.helper";

export class AutoSubFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    Awaiter.Send(message, 2000, async (m: Message) => {
      this.GetAll(message, dm)
        .then(count => {
          ClientManager.GetClient().then(client => {
            MessageHelper.Delete(m);
            console.log(`New Sub Count: "${count}"`);
            const res$m =
              count > 0
                ? `**${
                    Awaiter.Random
                  }**, You are now subcribe to **${count} ongoing anime** from your MAL List.`
                : `**${
                    Awaiter.Random
                  }**, Cool! You are already subscribe to **all ongoing anime** in your list.`;
            Sender.Send(
              message,
              {
                embed: {
                  color: message.member.highestRole.color,
                  thumbnail: { url: message.author.avatarURL },
                  title: `**Rikimaru MAL Auto Subscribe**`,
                  description: res$m,
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
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                  }
                }
              },
              dm
            );
          });
        })
        .catch(err => {
          MessageHelper.Delete(m);
          console.log(err);
          Sender.Send(
            message,
            `Oops! It looks like you haven't binded you account with rikimaru discord yet.\nEnter the command **-malbind malusername** to bind your account.`,
            dm
          );
        });
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
          let newCount = 0;
          let oldCount = 0;
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
                                newCount++;
                                this.Check(
                                  iteration,
                                  animeList,
                                  newCount,
                                  resolve
                                );
                              })
                              .catch((reason: string) => {
                                if (reason === "EXISTS") {
                                  console.log(`Already subscribed.`);
                                  oldCount++;
                                  this.Check(
                                    iteration,
                                    animeList,
                                    newCount,
                                    resolve
                                  );
                                } else {
                                  console.log(reason);
                                  this.Check(
                                    iteration,
                                    animeList,
                                    newCount,
                                    resolve
                                  );
                                  return;
                                }
                              });
                          })
                          .catch((reason: Error) => {
                            console.log(reason.message);
                            this.Check(iteration, animeList, newCount, resolve);
                            return;
                          });
                      })
                      .catch((reason: Error) => {
                        console.log(reason.message);
                        this.Check(iteration, animeList, newCount, resolve);
                        return;
                      });
                    return;
                  })
                  .catch((reason: Error) => {
                    console.log(reason.message);
                    this.Check(iteration, animeList, newCount, resolve);
                  });
                this.Check(iteration, animeList, newCount, resolve);
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
    count: number,
    resolve: (count: number) => void
  ) {
    if (iteration === animeList.anime.length) {
      resolve(count);
    }
  }
}
