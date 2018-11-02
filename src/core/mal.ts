import { Config } from "./config";
import rp from "request-promise";
import { JsonHelper } from "../helpers/json.helper";
import { MalAnime } from "../models/mal.anime.model";

export class MAL {
  public static AnimeList(username: string) {
    return new Promise<MalAnime[]>((resolve, reject) => {
      const url = Config.MAL_CW_BASE(username);
      const options = {
        uri: url,
        json: true
      };

      rp(options)
        .then(async (result: any) => {
          const converted = await JsonHelper.ArrayConvert<MalAnime>(
            result,
            MalAnime
          );
          if (converted != null || converted !== undefined) {
            resolve(converted);
          } else {
            reject(new Error(`Result is either 'null' or 'undefined'.`));
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
