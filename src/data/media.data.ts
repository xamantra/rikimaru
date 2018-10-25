import { MediaStatus } from "./../core/media.status";
import { QueueJob } from "./../models/queue.job.model";
import { SubscriptionData } from "./subscription.data";
import { Query } from "./../core/query";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media, Queue } from "../models/subscription.model";
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
        locals.forEach(async lm => {
          MediaSearch.All(lm.Title).then(media => {
            media.forEach($m => {
              if (this.MediaList.length === locals.length) {
                res();
                return;
              }
              if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
                QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                  .then(insertId => {
                    const queue = new Queue();
                    queue.Id = insertId;
                    queue.MediaId = $m.idMal;
                    queue.NextEpisode = $m.nextAiringEpisode.next;
                    UserData.All.forEach(user => {
                      const queueJob = new QueueJob(user, $m, queue);
                      QueueData.AddJob(queueJob);
                    });
                  })
                  .catch(() => {
                    const queue = QueueData.All.find(
                      x => x.MediaId === $m.idMal
                    );
                    UserData.All.forEach(user => {
                      const queueJob = new QueueJob(user, $m, queue);
                      QueueData.AddJob(queueJob);
                    });
                    console.log(`No need to add. Already exists.`);
                  });
                console.log(`Pushed: ${lm.Title}`);
                this.MediaList.push($m);
              } else {
                if ($m.idMal === lm.MalId) {
                  ArrayHelper.remove(this.LocalList, lm, () => {
                    Query.Execute(this.DataHelper.MediaDelete($m.id), () => {
                      userDatas.forEach(x => {
                        SubscriptionData.Delete($m.idMal, x.DiscordId).then(
                          () => {
                            console.log(
                              `All subscription of "${
                                $m.title
                              }" has been remove`
                            );
                          }
                        );
                      });
                    });
                  });
                  if (this.MediaList.length === locals.length) {
                    res();
                  }
                }
              }
            });
          });
        });
      }
    });
  }

  public static async Insert(mal_id: number, title: string) {
    return new Promise<number>((res, rej) => {
      this.Exists(mal_id)
        .then(async exists => {
          if (exists === false) {
            Query.Execute(
              this.DataHelper.MediaInsert(mal_id, title),
              async result => {
                const myRes = JsonHelper.Convert<MySqlResult>(
                  result,
                  MySqlResult
                );
                if (myRes.InsertId !== undefined && myRes.InsertId !== null) {
                  const media = new Media();
                  media.MalId = myRes.InsertId;
                  media.Title = title;
                  this.LocalList.push(media);
                  MediaSearch.All(title).then(ms => {
                    ms.forEach(async $m => {
                      if (
                        MediaStatus.Ongoing($m) ||
                        MediaStatus.NotYetAired($m)
                      ) {
                        this.MediaList.push($m);
                        QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                          .then(qId => {
                            res(myRes.InsertId);
                          })
                          .catch((reason: Error) => {
                            console.log(reason.message);
                          });
                      }
                    });
                  });
                }
              }
            );
          } else {
          }
        })
        .catch(() => {
          rej(new Error(`Media with Id: "${mal_id}" already exists!`));
        });
    });
  }

  public static async LogAll() {
    return new Promise(async (res, rej) => {
      if (this.MediaList.length > 0) {
        this.MediaList.forEach(m => {
          console.log(`Media:`, m.idMal, m.title);
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
