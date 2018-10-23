import { TitleHelper } from "./../helpers/title.helper";
import { MediaStatus } from "./../core/media.status";
import { IMedia } from "../interfaces/page.interface";

export class MediaHandler {
  public static ExactMedia(mediaList: IMedia[], search: string) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (TitleHelper.Match(m.title, search)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static OngoingMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (MediaStatus.Ongoing(m)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static UnreleasedMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (MediaStatus.NotYetAired(m)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static UnreleasedNoDateMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (MediaStatus.NotYetAiredNoDate(m)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public static CompletedMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (MediaStatus.Completed(m)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }
}
