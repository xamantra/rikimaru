import { MediaStatus } from "./../core/media.status";
import { QueueJob } from "./../models/queue.job.model";
import { SubscriptionData } from "./subscription.data";
import { Query } from "./../core/query";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media, Queue, User } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";
import { UserData } from "./user.data";
import { TitleHelper } from "../helpers/title.helper";
import { QueueData } from "./queue.data";
import { MediaResult } from "../core/media.result";
import { Message } from "discord.js";

export class MediaData {
  public static get GetLocalList() {
    return this.LocalList;
  }

  public static get GetMediaList() {
    return this.MediaList;
  }
  static _instance: MediaData;
  private static LocalList: Media[] = [];
  private static MediaList: IMedia[] = [];
  private static DataHelper = DataHelper.Instance;

  public static async Init() {
    return new Promise(async (res, rej) => {
      this.Clear();
      Query.Execute(this.DataHelper.MediaSelectAll(), async result => {
        const media = JsonHelper.ArrayConvert<Media>(result, Media);
        if (media === undefined || media === null) {
          rej(
            new Error(
              `"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`
            )
          );
        } else {
          media.forEach(m => {
            this.LocalList.push(m);
          });
        }
      }).then(() => {
        this.LoadFromApi()
          .then(() => {
            console.log(`Media List Length: ${this.MediaList.length}`);
            res();
          })
          .catch((reason: Error) => {
            console.log(reason.message);
          });
      });
    });
  }

  public static async Clear() {
    return new Promise((resolve, reject) => {
      this.LocalList.length = 0;
      this.MediaList.length = 0;
      this.LocalList.splice(0, this.LocalList.length);
      this.MediaList.splice(0, this.MediaList.length);
      if (this.LocalList.length === 0 && this.MediaList.length === 0) {
        resolve();
      } else {
        reject(new Error(`The arrays were not cleared.`));
      }
    });
  }

  public static async LoadFromApi() {
    return new Promise<void>(async (res, rej) => {
      const userDatas = UserData.All;
      const locals = this.LocalList;
      if (userDatas === undefined || userDatas === null) {
        rej(
          new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`)
        );
      } else if (userDatas === undefined || userDatas === null) {
        rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
      } else {
        locals.forEach(lm => {
          MediaSearch.Find(lm.MalId)
            .then($m => {
              if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
                QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                  .then(insertId => {
                    QueueData.SetQueue($m);
                  })
                  .catch(() => {
                    QueueData.SetQueue($m);
                    console.log(`No need to add. Already exists.`);
                  });
                console.log(`Pushed: ${lm.Title}`);
                this.MediaList.push($m);
              } else {
                ArrayHelper.remove(this.LocalList, lm, () => {
                  Query.Execute(this.DataHelper.MediaDelete($m.id), () => {
                    userDatas.forEach(x => {
                      SubscriptionData.Delete($m.idMal, x.DiscordId).then(
                        () => {
                          console.log(
                            `All subscription of "${$m.title}" has been remove`
                          );
                        }
                      );
                    });
                  });
                });
              }
              if (this.LocalList.length === this.MediaList.length) {
                res();
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    });
  }

  public static async Insert(media: IMedia, title: string, user: User = null) {
    return new Promise<number>((res, rej) => {
      this.Exists(media.idMal).then(async exists => {
        if (exists === false) {
          Query.Execute(
            this.DataHelper.MediaInsert(media.idMal, title),
            async result => {
              const myRes = JsonHelper.Convert<MySqlResult>(
                result,
                MySqlResult
              );
              if (myRes.InsertId !== undefined && myRes.InsertId !== null) {
                const m = new Media();
                m.MalId = myRes.InsertId;
                m.Title = title;
                this.LocalList.push(m);
                if (
                  MediaStatus.Ongoing(media) ||
                  MediaStatus.NotYetAired(media)
                ) {
                  this.MediaList.push(media);
                  QueueData.Insert(media.idMal, media.nextAiringEpisode.next)
                    .then(qId => {
                      res(media.idMal);
                    })
                    .catch((reason: Error) => {
                      console.log(reason.message);
                    });
                }
              }
            }
          );
        } else {
          res(media.idMal);
        }
      });
    });
  }

  public static async LogAll() {
    return new Promise(async (res, rej) => {
      if (this.MediaList.length > 0) {
        this.MediaList.forEach(m => {
          const title = TitleHelper.Get(m.title);
          console.log(`Media { "${title}" }`);
        });
        res();
      } else {
        rej(new Error(`"MediaList" doesn't have any items`));
      }
    });
  }

  public static async Exists(malId: number) {
    return new Promise<boolean>(async (res, rej) => {
      const m = this.LocalList.find(x => x.MalId === malId);
      if (m === null || m === undefined) {
        res(false);
      } else {
        res(true);
      }
    });
  }
}
