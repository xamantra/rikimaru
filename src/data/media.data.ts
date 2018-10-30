import { MediaStatus } from "./../core/media.status";
import { SubscriptionData } from "./subscription.data";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media, User } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";
import { UserData } from "./user.data";
import { QueueData } from "./queue.data";
import { Randomizer } from "../helpers/random.helper";
import { Mongo } from "../core/mongo";

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

  public static async Init() {
    return new Promise(async (resolve, reject) => {
      this.Clear().then(() => {
        Mongo.FindAll(DataHelper.media).then(async result => {
          const $result = await JsonHelper.ArrayConvert<Media>(result, Media);
          if ($result === undefined || $result === null) {
            reject(
              new Error(
                `"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`
              )
            );
          } else {
            let iteration = 0;
            $result.forEach(m => {
              iteration++;
              this.LocalList.push(m);
              if (iteration === $result.length) {
                this.LoadFromApi()
                  .then(() => {
                    console.log(`Media List Length: ${this.MediaList.length}`);
                    resolve();
                  })
                  .catch((reason: Error) => {
                    console.log(reason.message);
                  });
              }
            });
          }
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
      console.log(this.LocalList);
      if (userDatas === undefined || userDatas === null) {
        rej(
          new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`)
        );
      } else if (locals === undefined || locals === null) {
        rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
      } else {
        let iteration = 0;
        console.log(
          `Iterating through "locals (${this.LocalList.length} items)"`
        );
        locals.forEach(lm => {
          MediaSearch.Find(lm.MalId)
            .then($m => {
              iteration++;
              if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
                QueueData.Insert($m.idMal, $m.nextAiringEpisode.next)
                  .then(insertId => {
                    this.MediaList.push($m);
                    console.log(`Pushed: ${lm.Title}`);
                    this.Check(iteration, $m, res);
                  })
                  .catch(() => {
                    this.Check(iteration, $m, res);
                    console.log(`No need to add. Already exists.`);
                  });
              } else {
                ArrayHelper.remove(this.LocalList, lm, () => {
                  const query = { _id: $m.idMal };
                  Mongo.Delete(DataHelper.media, query).then(() => {
                    userDatas.forEach(x => {
                      SubscriptionData.Delete($m.idMal, x.DiscordId).then(
                        () => {
                          const qj = QueueData.GetJobs.find(
                            j => j.media.idMal === $m.idMal
                          );
                          QueueData.RemoveJob(qj);
                          console.log(
                            `All subscription of "${$m.title}" has been remove`
                          );
                        }
                      );
                    });
                  });
                  this.Check(iteration, $m, res);
                });
              }
            })
            .catch(error => {
              console.warn(
                `Error while searching : [MediaSearch.Find(${lm.MalId})]`
              );
            });
        });
      }
    });
  }

  private static Check(
    iteration: number,
    $m: IMedia,
    res: (value?: void | PromiseLike<void>) => void
  ) {
    QueueData.SetQueue($m);
    if (iteration === this.LocalList.length) {
      console.log(`Iteration: ${iteration}`);
      res();
    }
  }

  public static async Insert(media: IMedia, title: string, user: User = null) {
    return new Promise<number>(async (resolve, reject) => {
      const exist = await this.Exists(media.idMal);
      if (exist === false) {
        const data = { _id: media.idMal, title: title };
        Mongo.Insert(DataHelper.media, data).then(async result => {
          if (result.InsertId !== undefined && result.InsertId !== null) {
            const m = new Media();
            m.MalId = result.InsertId;
            m.Title = title;
            this.LocalList.push(m);
            if (MediaStatus.Ongoing(media) || MediaStatus.NotYetAired(media)) {
              this.MediaList.push(media);
              QueueData.Insert(media.idMal, media.nextAiringEpisode.next)
                .then(qId => {
                  resolve(media.idMal);
                })
                .catch((reason: Error) => {
                  console.log(reason.message);
                });
            }
          }
        });
      } else {
        resolve(media.idMal);
      }
    });
  }

  public static GetMedia(malId: number) {
    return new Promise<IMedia>((resolve, reject) => {
      let iteration = 0;
      this.MediaList.forEach($m => {
        iteration++;
        if ($m.idMal === malId) {
          resolve($m);
        }
        if (iteration === this.MediaList.length) {
          reject(new Error(`NO media with id "${malId}" was found.`));
        }
      });
    });
  }

  public static GetRandom() {
    return new Promise<IMedia>((resolve, reject) => {
      setInterval(() => {
        const media = this.MediaList[
          Randomizer.randomInt(0, this.MediaList.length - 1)
        ];
        if (media !== null && media !== undefined) {
          resolve(media);
        }
      }, 0);
    });
  }

  public static async LogAll() {
    return new Promise(async (res, rej) => {
      let iteration = 1;
      this.LocalList.forEach(m => {
        console.log(m);
        if (iteration === this.LocalList.length) {
          res();
        } else {
          iteration++;
        }
      });
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
