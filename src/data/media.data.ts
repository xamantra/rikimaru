import { MediaStatus } from "./../core/media.status";
import { SubscriptionData } from "./subscription.data";
import { Query } from "./../core/query";
import { MediaSearch } from "./../core/media.search";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { Media, User } from "../models/subscription.model";
import { IMedia } from "../interfaces/page.interface";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";
import { UserData } from "./user.data";
import { QueueData } from "./queue.data";

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
    return new Promise(async (resolve, reject) => {
      this.Clear().then(() => {
        Query.Execute(this.DataHelper.MediaSelectAll()).then(async result => {
          const $result = await JsonHelper.ArrayConvert<Media>(result, Media);
          console.log($result);
          if ($result === undefined || $result === null) {
            reject(new Error(`"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`));
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
                  .catch((reason: Error) => { console.log(reason.message); });
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
        rej(new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`));
      } else if (locals === undefined || locals === null) {
        rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
      } else {
        let iteration = 0;
        console.log(`Iterating through "locals (${this.LocalList.length} items)"`);
        locals.forEach(lm => {
          iteration++;
          console.log(`Iteration: ${iteration}`);
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
                if (iteration === locals.length) {
                  res();
                }
              } else {
                ArrayHelper.remove(this.LocalList, lm, () => {
                  Query.Execute(this.DataHelper.MediaDelete($m.id), () => {
                    userDatas.forEach(x => {
                      SubscriptionData.Delete($m.idMal, x.DiscordId).then(
                        () => {
                          const qj = QueueData.GetJobs.find(j => j.user.Id === x.Id && j.media.idMal === $m.idMal);
                          QueueData.RemoveJob(qj);
                          console.log(`All subscription of "${$m.title}" has been remove`);
                        }
                      );
                    });
                  });
                  if (iteration === locals.length) {
                    res();
                  }
                });
              }
            })
            .catch(error => {
              console.warn(`Error while searching : [MediaSearch.Find(${lm.MalId})]`);
            });
        });
      }
    });
  }

  public static async Insert(media: IMedia, title: string, user: User = null) {
    return new Promise<number>(async (resolve, reject) => {
      const exist = await this.Exists(media.idMal);
      if (exist === false) {
        const result = await Query.Execute(this.DataHelper.MediaInsert(media.idMal, title));
        const myRes = await JsonHelper.Convert<MySqlResult>(result, MySqlResult);
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
                resolve(media.idMal);
              })
              .catch((reason: Error) => { console.log(reason.message); });
          }
        }
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
