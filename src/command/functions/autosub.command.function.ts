import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MalBindData } from "../../data/mal.sync.data";
import { MediaSearch } from "../../core/media.search";
import { Sender } from "../../core/sender";
import { TitleHelper } from "../../helpers/title.helper";
import { MediaData } from "../../data/media.data";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { ClientManager } from "../../core/client";
import { Awaiter } from "../awaiter";
import { MessageHelper } from "../../helpers/message.helper";
import { MAL } from "../../core/mal";
import { MalAnime } from "../../models/mal.anime.model";

export class AutoSubFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    Awaiter.Send(message, 2000, async (m: Message) => {
      this.GetAll(message, dm)
        .then(() => {
          ClientManager.GetClient().then(client => {
            MessageHelper.Delete(m);
            const res$m = `**${
              Awaiter.Random
            }**, You are now subcribed to *all ongoing anime* from your MAL List.`;
            Sender.Send(
              message,
              {
                embed: {
                  color: message.member.highestRole.color,
                  thumbnail: { url: message.author.avatarURL },
                  title: `Rikimaru MAL Auto Subscribe`,
                  description: res$m,
                  fields: [
                    {
                      name: `To unsubscribe, type:`,
                      value: `\`-unsub anime title or keyword here\``
                    },
                    {
                      name: `To view all subscription, type:`,
                      value: `\`-viewsubs\``
                    },
                    {
                      name: `Please Note: `,
                      value: `If you've just modified your list, please wait at least 1 minute to **-autosub**.`
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
    return new Promise((resolve, reject) => {
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
    resolve: () => void,
    reject: (reason?: any) => void,
    message: Message,
    dm: boolean
  ) {
    MalBindData.Get(message.author.id)
      .then(mal => {
        if (mal.Verified === true) {
          MAL.AnimeList(mal.MalUsername)
            .then(animeList => {
              let iteration = 0;
              animeList.forEach(anime => {
                iteration++;
                MediaSearch.Find(anime.anime_id)
                  .then(media => {
                    const discordId = message.author.id;
                    const title = TitleHelper.Get(media.title);
                    MediaData.Insert(media, title).then(insertId => {
                      console.log(insertId);
                      UserData.GetUser(discordId)
                        .then(user => {
                          SubscriptionData.Insert(media.idMal, user.Id)
                            .then(() => {
                              this.Check(iteration, animeList, resolve);
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
              reject(err);
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

  private Check(iteration: number, animeList: MalAnime[], resolve: () => void) {
    if (iteration === animeList.length) {
      resolve();
    }
  }
}
