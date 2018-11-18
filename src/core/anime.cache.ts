import { IMedia } from "../interfaces/page.interface";
import { MediaSearch } from "./media.search";
import { ArrayHelper } from "../helpers/array.helper";
import { Random } from "../helpers/random.helper";
import { TitleHelper } from "../helpers/title.helper";
import { MediaStatus } from "./media.status";
import { Config } from "./config";
import { NullCheck } from "../helpers/null.checker.helper";

export class AnimeCache {
  private static List: IMedia[] = [];

  public static async Update(index: number = 0) {
    setTimeout(async () => {
      if (this.List.length > 0) {
        const fromCache = this.List[index];
        // we only update the "cached anime" if it is NOT competed.
        if (!MediaStatus.Completed(fromCache)) {
          const fromApi = await MediaSearch.Find(fromCache.idMal);
          if (NullCheck.Fine(fromApi)) {
            ArrayHelper.remove(this.List, fromCache, async () => {
              const exists = await this.Exists(fromApi.idMal);
              if (exists === false) {
                this.List.push(fromApi);
                this.Check(index);
              } else {
                this.Check(index);
              }
            });
          } else {
            this.Check(index);
          }
        } else {
          this.Check(index);
        }
      } else {
        this.Check(0);
      }
    }, Config.CACHE_UPDATE_INTERVAL);
  }

  private static Check(index: number) {
    if (index === this.List.length - 1) {
      this.Update(0);
    } else {
      this.Update(index + 1);
    }
  }

  private static Exists(id: number) {
    return new Promise<boolean>((resolve, reject) => {
      const anime = this.List.find(x => x.idMal === id);
      if (anime !== null && anime !== undefined) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public static async Get(id: number) {
    return new Promise<IMedia>(async (resolve, reject) => {
      const local = this.List.find(x => x.idMal === id);
      if (local !== null && local !== undefined) {
        resolve(local);
      } else {
        const fromApi = await MediaSearch.Find(id);
        const exists = await this.Exists(fromApi.idMal);
        if (exists === false) this.List.push(fromApi);
        resolve(fromApi);
      }
    });
  }

  public static GetRandom() {
    return new Promise<IMedia>((resolve, reject) => {
      setInterval(() => {
        const anime = this.List[Random.Range(0, this.List.length - 1)];
        if (anime !== null && anime !== undefined) {
          resolve(anime);
        }
      }, 1);
    });
  }

  public static async Search(keyword: string) {
    return new Promise<IMedia[]>(async (resolve, reject) => {
      const found: IMedia[] = [];
      const length = this.List.length;
      if (length === 0) {
        const apiResult = await MediaSearch.All(keyword);
        if (apiResult.length === 0) {
          resolve(found);
          return;
        }
        for (let x = 0; x < apiResult.length; x++) {
          const fromApi = apiResult[x];
          const exists = await this.Exists(fromApi.idMal);
          if (exists === false) this.List.push(fromApi);
          if (x === apiResult.length - 1) resolve(apiResult);
        }
      }
      for (let i = 0; i < length; i++) {
        const anime = this.List[i];
        const english = anime.title.english;
        const romaji = anime.title.romaji;
        let media: IMedia = null;
        if (english !== null && english !== undefined) {
          const match = await this.ScanMatch(keyword, english);
          if (match === true) {
            media = anime;
          }
        }
        if (romaji !== null && romaji !== undefined) {
          const match = await this.ScanMatch(keyword, romaji);
          if (match === true) {
            media = anime;
          }
        }
        if (media !== null) found.push(media);
        if (i === length - 1) {
          if (found.length === 0) {
            const apiResult = await MediaSearch.All(keyword);
            if (apiResult.length === 0) {
              resolve(found);
            }
            for (let x = 0; x < apiResult.length; x++) {
              const fromApi = apiResult[x];
              const exists = await this.Exists(fromApi.idMal);
              if (exists === false) this.List.push(fromApi);
              if (x === apiResult.length - 1) resolve(apiResult);
            }
          } else {
            resolve(found);
          }
        }
      }
    });
  }

  private static async ScanMatch(keyword: string, title: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const titleMatch = await this.ScanTitle(keyword, title);
      const acroMatch = await this.ScanAcro(keyword, title);
      if (titleMatch) {
        resolve(titleMatch);
      } else if (acroMatch) {
        resolve(acroMatch);
      } else {
        resolve(false);
      }
    });
  }

  private static async ScanTitle(keyword: string, title: string) {
    return new Promise<boolean>((resolve, reject) => {
      const keywords = keyword.split(/ +/g);
      let match = 0;
      for (let i = 0; i < keywords.length; i++) {
        const word = keywords[i];
        if (title.toLowerCase().includes(word)) {
          match++;
        }
        if (i === keywords.length - 1) {
          if (match === keyword.length) {
            resolve(true);
            return;
          }
          resolve(false);
        }
      }
    });
  }

  private static async ScanAcro(keyword: string, title: string) {
    return new Promise<boolean>((resolve, reject) => {
      const titleWords = title.toLowerCase().split(/ +/g);
      // acronym doesn't have space.
      if (keyword.includes(" ")) {
        resolve(false);
        return;
      }
      const acronym = keyword.replace(".", "").toLowerCase();
      let acroTitle = "";
      for (let i = 0; i < titleWords.length; i++) {
        const word = titleWords[i];
        acroTitle += `${word[0]}`;
      }
      if (acroTitle.includes(acronym)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  public static Log() {
    for (let i = 0; i < this.List.length; i++) {
      const anime = this.List[i];
      const title = TitleHelper.Get(anime.title);
      const id = anime.id;
      const malId = anime.idMal;
      const episodes = anime.episodes;
      console.log(
        `${i + 1}. Ids:[${id}, ${malId}], "${title}", ${episodes} episodes.`
      );
    }
  }
}
