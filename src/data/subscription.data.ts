import { Query } from "./../core/query";
import { MediaData } from "./media.data";
import { QueueJob } from "./../models/queue.job.model";
import { QueueData } from "./queue.data";
import { UserData } from "./user.data";
import { Subscription } from "./../models/subscription.model";
import { JsonHelper } from "../helpers/json.helper";
import { DataHelper } from "../helpers/data.helper";
import { MySqlResult } from "../models/result.mysql.model";
import { ArrayHelper } from "../helpers/array.helper";

export class SubscriptionData {
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get All() {
    return this.SubscriptionList;
  }
  static _instance: SubscriptionData;
  private DataHelper = DataHelper.Instance;
  private UserData = UserData.Instance;
  private QueueData = QueueData.Instance;
  private MediaData = MediaData.Instance;
  private SubscriptionList: Subscription[] = [];

  public async Init() {
    return new Promise((resolve, reject) => {
      Query.Execute(this.DataHelper.SubsSelectAll(), async result => {
        const subs = await JsonHelper.ArrayConvert<Subscription>(
          result,
          Subscription
        );
        if (subs === null || subs === undefined) {
          reject(
            new Error(
              `JsonHelper.ArrayConvert<Subscription>(result,Subscription);`
            )
          );
        } else {
          await subs.forEach(async sub => {
            await this.SubscriptionList.push(sub);
            const queue = await this.QueueData.All.find(
              q => q.MediaId === sub.MediaId
            );
            const media = await this.MediaData.GetMediaList.find(
              x => x.idMal === queue.MediaId
            );
            if (
              queue !== undefined &&
              queue !== null &&
              media !== undefined &&
              media !== null
            ) {
              await this.UserData.All.forEach(u => {
                const queueJob = new QueueJob(u, media, queue);
                queueJob.StartQueue();
              });
            }
          });
          resolve();
        }
      });
    });
  }

  public async GetSub(mediaId: number, userId: number) {
    return new Promise<Subscription>(async (resolve, reject) => {
      const sub = await this.All.find(
        x => x.MediaId === mediaId && x.UserId === userId
      );
      if (sub !== null && sub !== undefined) {
        resolve(sub);
      } else {
        reject(
          new Error(
            `"this.All.find(x => x.MediaId === mediaId && x.UserId === userId)" is 'null' or 'undefined'.`
          )
        );
      }
    });
  }

  public async Insert(mediaId: number, userId: number) {
    return new Promise((resolve, reject) => {
      this.Exists(mediaId, userId)
        .then(async exists => {
          if (exists === false) {
            const user = await this.UserData.All.find(x => x.Id === userId);
            if (user === null || user === undefined) {
              reject(
                new Error(
                  `"this.UserData.All.find(x => x.Id === userId)" is 'null' or 'undefined'.`
                )
              );
            } else {
              const queue = await this.QueueData.All.find(
                x => x.MediaId === mediaId
              );
              if (queue === null || queue === undefined) {
                reject(
                  new Error(
                    `"this.QueueData.All.find(x => x.MediaId === mediaId)" is 'null' or 'undefined'.`
                  )
                );
              } else {
                await Query.Execute(
                  await this.DataHelper.SubsInsert(mediaId, userId),
                  async result => {
                    const res = await JsonHelper.Convert<MySqlResult>(
                      result,
                      MySqlResult
                    );
                    if (res.InsertId !== undefined && res.InsertId !== null) {
                      const sub = new Subscription();
                      sub.Id = res.InsertId;
                      sub.MediaId = mediaId;
                      sub.UserId = userId;
                      await this.SubscriptionList.push(sub);
                      if (queue !== undefined && queue !== null) {
                        const media = await this.MediaData.GetMediaList.find(
                          x => x.idMal === sub.MediaId
                        );
                        const queueJob = new QueueJob(user, media, queue);
                        await queueJob.StartQueue();
                      }
                    }
                    resolve();
                  }
                );
              }
            }
          } else {
            reject(
              new Error(
                `Subscription with MediaId: "${mediaId}" and UserId: "${userId}" already exists!`
              )
            );
          }
        })
        .catch((reason: Error) => {
          console.log(reason.message);
        });
    });
  }

  public async Delete(
    mediaId: number,
    discordId: string,
    callback?: () => void
  ) {
    return new Promise((res, rej) => {
      this.UserData.GetUser(discordId)
        .then(user => {
          Query.Execute(
            this.DataHelper.SubsDelete(mediaId, user.Id),
            result => {
              const sub = this.SubscriptionList.find(
                x => x.MediaId === mediaId && x.UserId === user.Id
              );
              if (sub !== null && sub !== undefined) {
                ArrayHelper.remove(this.SubscriptionList, sub, () => {
                  if (callback !== null) {
                    callback();
                  }
                });
                res();
              } else {
                rej(
                  new Error(`"this.SubscriptionList.find(
                  x => x.MediaId === mediaId && x.UserId === user.Id
                )" is 'null' or 'undefined'.`)
                );
              }
            }
          );
        })
        .catch((reason: Error) => {
          rej(reason);
        });
    });
  }

  public async Exists(mediaId: number, userId: number) {
    return new Promise<boolean>((resolve, reject) => {
      const sub = this.All.find(
        x => x.MediaId === mediaId && x.UserId === userId
      );
      if (sub === null || sub === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  public async LogAll() {
    return new Promise((resolve, reject) => {
      if (this.All === null || this.All === undefined) {
        reject(new Error(`"this.All" is 'null' or 'undefined'.`));
      } else {
        this.All.forEach(sub => {
          console.log(`Subscription:`, sub);
        });
        resolve();
      }
    });
  }
}
