import { Title } from "../models/title.model";

export class TitleHelper {
  public static Get(title: Title): string {
    if (title.english !== null) {
      return title.english;
    } else if (title.romaji !== null) {
      return title.romaji;
    } else {
      return title.native;
    }
  }

  public static Match(title: Title, search: string): boolean {
    if (
      title.english !== null &&
      title.english.toLowerCase() === search.toLowerCase()
    ) {
      return true;
    } else if (
      title.romaji !== null &&
      title.romaji.toLowerCase() === search.toLowerCase()
    ) {
      return true;
    } else if (
      title.native !== null &&
      title.native.toLowerCase() === search.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }
}
