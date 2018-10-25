import { Anilist } from "./anilist";
import { IMedia } from "./../interfaces/page.interface";
import { JsonHelper } from "../helpers/json.helper";
import { Root } from "../models/root.model";

export class MediaSearch {
  public static async All(title: string) {
    return new Promise<IMedia[]>((resolve, reject) => {
      const result = Anilist.MediaQuery(title);
      let media: IMedia[] = [];
      result.then(async root => {
        media = (JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page
          .media;
        if (media !== undefined && media !== null && media.length > 0) {
          resolve(media);
        } else {
          reject(
            new Error(
              `"(JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page.media" is 'null' or 'undefined'.`
            )
          );
        }
      });
    });
  }
}
