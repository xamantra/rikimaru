import { IMedia } from "../interfaces/page.interface";
import { TitleHelper } from "../helpers/title.helper";
import { Config } from "../core/config";

export class MediaFormatHandler {
  public static Get(media: IMedia) {
    const format = {
      name: `**${TitleHelper.Get(media.title)}**`, // tslint:disable-next-line:max-line-length
      value: `[MyAnimeList](${Config.MAL_ANIME_BASE}/${
        media.idMal
      }/)\nStatus:  *${media.status}*\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
    };
    return format;
  }
}
