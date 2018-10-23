import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";

export class MediaFormatHandler {
  public static Get(media: IMedia) {
    const format = {
      name: `***${TitleHelper.Get(media.title)}***`,
      // tslint:disable-next-line:max-line-length
      value: `**Status:**  *${
        media.status
      }*\n***[MAL Link](https://myanimelist.net/anime/${media.idMal}/)***`
    };
    return format;
  }
}
