import { Config } from "./config";
import rp from "request-promise";
import { JsonHelper } from "../helpers/json.helper";
import { Profile } from "../models/jikan.profile";
import { AnimeList } from "../models/jikan.anime.list";

export class JikanRequest {
  public static Profile(path: string, param1: string, param2: string = null) {
    return new Promise<Profile>((resolve, reject) => {
      let url = `${Config.JIKAN_BASE_URL}/${path}/${param1}`;
      if (param2 !== null) {
        url = `${url}/${param2}`;
      }
      const options = {
        uri: url,
        json: true
      };

      rp(options)
        .then(async (result: any) => {
          const converted = await JsonHelper.Convert<Profile>(result, Profile);
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

  public static AnimeList(username: string, type: string) {
    return new Promise<AnimeList>((resolve, reject) => {
      const url = `${Config.JIKAN_BASE_URL}user/${username}/animelist/${type}`;
      const options = {
        uri: url,
        json: true
      };

      rp(options)
        .then(async (result: any) => {
          const converted = await JsonHelper.Convert<AnimeList>(
            result,
            AnimeList
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
