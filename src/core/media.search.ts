import { AniList } from "./anilist";
import { IMedia } from "./../interfaces/page.interface";
import { JsonHelper } from "../helpers/json.helper";
import { RootPage, RootMedia } from "../models/root.model";

export class MediaSearch {
  public static async All(title: string) {
    return new Promise<IMedia[]>((resolve, reject) => {
      const result = AniList.MediaSearch(title);
      let media: IMedia[] = [];
      result
        .then($p => {
          media = (JsonHelper.Converter.deserialize($p, RootPage) as RootPage)
            .DataPage.Page.media;
          if (media !== undefined && media !== null) {
            resolve(media);
          } else {
            reject(
              new Error(
                `"(JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page.media" is 'null' or 'undefined'.`
              )
            );
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public static async Find(id: number) {
    return new Promise<IMedia>(async (resolve, reject) => {
      const $m = await AniList.MediaQuery(id);
      let media: IMedia;
      if ($m !== null) {
        media = (JsonHelper.Converter.deserialize($m, RootMedia) as RootMedia)
          .DataMedia.Media;
        resolve(media);
      } else {
        resolve(null);
      }
    });
  }
}
