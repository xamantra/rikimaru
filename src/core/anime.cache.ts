import { IMedia } from "../interfaces/page.interface";
import { MediaSearch } from "./media.search";
import { ArrayHelper } from "../helpers/array.helper";
import { Media } from "../models/subscription.model";
import unique from "array-unique";

export class AnimeCache {
  private static List: IMedia[] = [];

  public static async Update(index: number) {
    unique(this.List);
    setTimeout(async () => {
      unique(this.List);
      const local = this.List[index];
      if (this.List.length > 0) {
        const fromApi = await MediaSearch.Find(local.idMal);
        if (fromApi !== null && fromApi !== undefined) {
          ArrayHelper.remove(this.List, local, () => {
            unique(this.List);
            this.List.push(fromApi);
          });
        } else {
          this.Update(0);
        }
        if (index === this.List.length - 1) {
          this.Update(0);
        } else {
          this.Update(index + 1);
        }
      }
    }, 1000);
  }

  public static async Get(id: number) {
    return new Promise<IMedia>(async (resolve, reject) => {
      unique(this.List);
      const local = this.List.find(x => x.idMal === id);
      const fromApi = await MediaSearch.Find(id);
      if (local !== null && local !== undefined) {
        resolve(local);
      } else if (fromApi !== null && fromApi !== undefined) {
        this.List.push(fromApi);
        unique(this.List);
        resolve(fromApi);
      } else {
        resolve(null);
      }
    });
  }

  public static async Search(keyword: string) {
    return new Promise<IMedia[]>(async (resolve, reject) => {
      unique(this.List);
      const found: IMedia[] = [];
      const length = this.List.length;
      if (length === 0) {
        const fromApi = await MediaSearch.All(keyword);
        this.List.concat(fromApi);
        unique(this.List);
        resolve(fromApi);
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
            const fromApi = await MediaSearch.All(keyword);
            this.List = this.List.concat(fromApi);
            unique(this.List);
            resolve(fromApi);
          } else {
            resolve(found);
          }
        }
      }
    });
  }

  private static async ScanMatch(keyword: string, title: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const match = await this.ScanTitle(keyword, title);
      if (match < 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  private static async ScanTitle(keyword: string, title: string) {
    return new Promise<number>((resolve, reject) => {
      const keywords = keyword.split(/ +/g);
      let match = 0;
      for (let i = 0; i < keywords.length; i++) {
        const word = keywords[i];
        if (title.toLowerCase().includes(word)) {
          match++;
        }
        if (i === keywords.length - 1) {
          if (match === keywords.length) resolve(match);
          else resolve(-1);
        }
      }
    });
  }
}
