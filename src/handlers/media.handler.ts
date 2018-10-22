import { Media } from "../models/media.model";
import { TitleHelper } from "./../helpers/title.helper";

export class MediaHandler {
  public static ExactMedia(mediaList: Media[], search: string): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (TitleHelper.Match(m.title, search)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static OngoingMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "RELEASING" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static UnreleasedMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static UnreleasedNoDateMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode === null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static CompletedMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "FINISHED") {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }
}
