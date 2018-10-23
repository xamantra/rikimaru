import { IMedia } from "./../interfaces/page.interface";

export class MediaStatus {
  public static Ongoing($m: IMedia) {
    if ($m.status === "RELEASING" && $m.nextAiringEpisode !== null) {
      return true;
    }
    return false;
  }

  public static NotYetAired($m: IMedia) {
    if ($m.status === "NOT_YET_RELEASED" && $m.nextAiringEpisode !== null) {
      return true;
    }
    return false;
  }

  public static NotYetAiredNoDate($m: IMedia) {
    if ($m.status === "NOT_YET_RELEASED" && $m.nextAiringEpisode === null) {
      return true;
    }
    return false;
  }

  public static Completed($m: IMedia) {
    if ($m.status === "FINISHED") {
      return true;
    }
    return false;
  }
}
