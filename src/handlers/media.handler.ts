import { Container } from "./../core/container";
import { TitleHelper } from "./../helpers/title.helper";
import { IMedia } from "../interfaces/page.interface";

export class MediaHandler {
  private TitleHelper: TitleHelper;
  constructor() {
    this.TitleHelper = Container.TitleHelper;
    console.log(`Constructed: "${MediaHandler.name}"`);
  }

  public ExactMedia(mediaList: IMedia[], search: string) {
    const title = this.TitleHelper;
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (title.Match(m.title, search)) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public OngoingMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (m.status === "RELEASING" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public UnreleasedMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode !== null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public UnreleasedNoDateMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (m.status === "NOT_YET_RELEASED" && m.nextAiringEpisode === null) {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }

  public CompletedMedia(mediaList: IMedia[]) {
    const filteredMedia: IMedia[] = [];
    mediaList.forEach(m => {
      if (m.status === "FINISHED") {
        filteredMedia.push(m);
      }
    });
    return filteredMedia;
  }
}
