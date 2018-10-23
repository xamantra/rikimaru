import { Anilist } from "./anilist";
import { IMedia } from "./../interfaces/page.interface";
import { JsonHelper } from "../helpers/json.helper";
import { Root } from "../models/root.model";

export class MediaSearch {
  public static All(title: string, callback?: (res: IMedia[]) => void) {
    const result = Anilist.MediaQuery(title);
    let media: IMedia[] = [];
    result.then(async root => {
      media = await (JsonHelper.Converter.deserialize(root, Root) as Root).Data
        .Page.media;
      callback(media);
    });
  }
}
