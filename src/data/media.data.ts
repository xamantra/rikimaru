import { MediaStatus } from "./../core/media.status";
import { QueueData } from "./queue.data";
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

export class MediaData {
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get GetLocalList() {
    return this.LocalList;
  }

  public get GetMediaList() {
    return this.MediaList;
  }
  static _instance: MediaData;
  private LocalList: Media[] = [];
  private MediaList: IMedia[];
  private DataHelper = DataHelper.Instance;
  private UserData = UserData.Instance;
  private QueueData = QueueData.Instance;
  private SubscriptionData = SubscriptionData.Instance;

  public async Init() {
    return new Promise(async (res, rej) => {
      this.MediaList = [];
      await Query.Execute(this.DataHelper.MediaSelectAll(), async result => {
        const media = await JsonHelper.ArrayConvert<Media>(result, Media);
        if (media === undefined || media === null) {
          rej(
            new Error(
              `"JsonHelper.ArrayConvert<Media>(result, Media)" is 'null' or 'undefined'.`
            )
          );
        } else {
          await media.forEach(m => {
            this.LocalList.push(m);
            console.log(`Pushed: ${m.Title}`);
          });
        }
      }).then(async () => {
        await this.LoadFromApi().then(() => {
          console.log(this.MediaList.length);
        });
        res();
      });
    });
  }

  public async LoadFromApi() {
    return new Promise(async (res, rej) => {
      const userDatas = this.UserData.All;
      const locals = this.LocalList;
      if (userDatas === undefined || userDatas === null) {
        rej(
          new Error(`"userDatas = this.UserData.All" is 'null' or 'undefined'`)
        );
      } else if (userDatas === undefined || userDatas === null) {
        rej(new Error(`"locals = this.LocalList" is 'null' or 'undefined'`));
      } else {
        await locals.forEach(async lm => {
          await MediaSearch.All(lm.Title, async (media: IMedia[]) => {
            await media.forEach(async $m => {
              if (MediaStatus.Ongoing($m) || MediaStatus.NotYetAired($m)) {
                await this.QueueData.Insert(
                  $m.idMal,
                  $m.nextAiringEpisode.next
                ).then(async () => {
                  await this.MediaList.push($m);
                });
              } else {
                if ($m.idMal === lm.MalId) {
                  await ArrayHelper.remove(this.LocalList, lm, async () => {
                    await Query.Execute(
                      await this.DataHelper.MediaDelete($m.id),
                      async () => {
                        await userDatas.forEach(async x => {
                          await this.SubscriptionData.Delete(
                            $m.idMal,
                            x.DiscordId,
                            () => {
                              console.log(
                                `All subscription of "${
                                  $m.title
                                }" has been remove`
                              );
                            }
                          );
                        });
                      }
                    );
                  });
                }
              }
            });
          });
        });
        res();
      }
    });
  }

  public async Insert(mal_id: number, title: string) {
    return new Promise<number>((res, rej) => {
      this.Exists(mal_id)
        .then(async exists => {
          if (exists === false) {
            await Query.Execute(
              await this.DataHelper.MediaInsert(mal_id, title),
              async result => {
                const myRes = await JsonHelper.Convert<MySqlResult>(
                  result,
                  MySqlResult
                );
                if (myRes.InsertId !== undefined && myRes.InsertId !== null) {
                  const media = new Media();
                  media.MalId = myRes.InsertId;
                  media.Title = title;
                  await this.LocalList.push(media);
                  await MediaSearch.All(title, (ms: IMedia[]) => {
                    ms.forEach(async $m => {
                      if (
                        MediaStatus.Ongoing($m) ||
                        MediaStatus.NotYetAired($m)
                      ) {
                        await this.MediaList.push($m);
                      }
                    });
                  });
                  res(myRes.InsertId);
                }
              }
            );
          } else {
            rej(new Error(`Media with Id: "${mal_id}" already exists!`));
          }
        })
        .catch(() => {
          rej(new Error(`Media with Id: "${mal_id}" already exists!`));
        });
    });
  }

  public async LogAll() {
    return new Promise(async (res, rej) => {
      if (this.MediaList.length > 0) {
        await this.MediaList.forEach(m => {
          console.log(`${MediaList.length} Media:`, m.idMal, m.title);
        });
        res();
      } else {
        rej(new Error(`"MediaList" doesn't have any items`));
      }
    });
  }

  public async Exists(malId: number) {
    return new Promise<boolean>(async (res, rej) => {
      const m = await this.LocalList.find(x => x.MalId === malId);
      if (m === null || m === undefined) {
        res(false);
      } else {
        res(true);
      }
    });
  }
}
