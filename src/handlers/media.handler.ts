import { Media } from "../models/media.model";
import { Container } from "./../core/container";
import { TitleHelper } from "./../helpers/title.helper";

export class MediaHandler {
  private TitleHelper: TitleHelper;
  constructor() {
    this.TitleHelper = Container.TitleHelper;
    console.log(`Constructed: ${MediaHandler.name}`);
  }

  public ExactMedia(mediaList: Media[], search: string): Media[] {
    const title: TitleHelper = this.TitleHelper;
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (title.Match(m.title, search)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public OngoingMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "RELEASING" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public UnreleasedMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public UnreleasedNoDateMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode === null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public CompletedMedia(mediaList: Media[]): Media[] {
    const filteredMedia: Media[] = [];
    mediaList.forEach(m => {
      if (m.status === "FINISHED") {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }
}
