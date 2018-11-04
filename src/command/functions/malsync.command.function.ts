import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { MalBindData } from "../../data/mal.bind.data";
import { MediaSearch } from "../../core/media.search";
import { Sender } from "../../core/sender";
import { TitleHelper } from "../../helpers/title.helper";
import { MediaData } from "../../data/media.data";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { ClientManager } from "../../core/client";
import { AniStrings } from "../../core/anistrings";
import { MAL } from "../../core/mal";
import { MalAnime } from "../../models/mal.anime.model";

export class MalSyncFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    this.GetAll(message, dm)
      .then(() => {
        ClientManager.GetClient().then(client => {
          const res$m = `**${
            AniStrings.Random
          }**, Your *MAL currently watching list* is now synced with your subscriptions.`;
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
                    value: `If you've just modified your list, please wait at least 1 minute to **-malsync**.`
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
        console.log(err);
        this.SendStatus(message, dm);
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
      .then(async mal => {
        if (mal.Verified === true) {
          await UserData.GetUser(message.author.id)
            .then(async user => {
              await MAL.AnimeList(mal.MalUsername)
                .then(list => {
                  SubscriptionData.GetUserSubs(user.Id)
                    .then(subs => {
                      subs.forEach($s => {
                        const malAnime = list.find(
                          $ma => $ma.anime_id === $s.MediaId
                        );
                        if (malAnime !== null && malAnime !== undefined) {
                        } else {
                          SubscriptionData.Delete($s.MediaId, user.DiscordId);
                        }
                      });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
              await MAL.AnimeList(mal.MalUsername)
                .then(list => {
                  let iteration = 0;
                  list.forEach(anime => {
                    iteration++;
                    MediaSearch.Find(anime.anime_id)
                      .then(media => {
                        const title = TitleHelper.Get(media.title);
                        MediaData.Insert(media, title).then(async insertId => {
                          await SubscriptionData.Insert(media.idMal, user.Id)
                            .then(() => {
                              this.Check(iteration, list, resolve);
                            })
                            .catch((reason: string) => {
                              if (reason === "EXISTS") {
                                console.log(`Already subscribed.`);
                                this.Check(iteration, list, resolve);
                              } else {
                                console.log(reason);
                                this.Check(iteration, list, resolve);
                                return;
                              }
                            });
                        });
                        return;
                      })
                      .catch((reason: Error) => {
                        console.log(reason.message);
                        this.Check(iteration, list, resolve);
                      });
                    this.Check(iteration, list, resolve);
                  });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.SendStatus(message, dm);
        }
      })
      .catch(err => {
        this.SendStatus(message, dm);
        console.log(err);
      });
  }

  private Check(iteration: number, animeList: MalAnime[], resolve: () => void) {
    if (iteration === animeList.length) {
      resolve();
    }
  }

  private SendStatus(message: Message, dm: boolean) {
    Sender.Send(
      message,
      `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`,
      dm
    );
  }
}
