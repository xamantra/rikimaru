import {
  IMedia,
  IDate,
  INextAiringEpisode
} from "../interfaces/page.interface";
import { ResponseMessage } from "../models/response.message.model";
import { TitleHelper } from "./title.helper";
import { TimeHelper } from "./time.helper";
import { Container } from "../core/container";

export class ResponseMessageHelper {
  private TimeHelper: TimeHelper;
  private TitleHelper: TitleHelper;
  constructor() {
    this.TimeHelper = Container.TimeHelper;
    this.TitleHelper = Container.TitleHelper;
    console.log(`Constructed: "${ResponseMessageHelper.name}"`);
  }

  public CreateMessage(media: IMedia, status: string, color: number) {
    const timeHelper = this.TimeHelper;
    const titleHelper = this.TitleHelper;
    let responseMessage: ResponseMessage;
    let nextAiringEpisode: INextAiringEpisode;
    let episode: number;
    let start: IDate;
    let end: IDate;
    let countdown: string = null;
    const lastUpdate = timeHelper.Elapsed(media.updatedAt);
    if (media.startDate !== null) {
      start = media.startDate;
    }
    if (media.endDate !== null) {
      end = media.endDate;
    }
    if (media.nextAiringEpisode !== null) {
      nextAiringEpisode = media.nextAiringEpisode;
      if (nextAiringEpisode.episode !== null) {
        episode = nextAiringEpisode.episode;
      }
      if (nextAiringEpisode.timeUntilAiring !== null) {
        countdown = timeHelper.Countdown(nextAiringEpisode.timeUntilAiring);
      }
    }
    responseMessage = new ResponseMessage(
      media.idMal,
      color,
      media.coverImage.large,
      titleHelper.Get(media.title),
      status,
      episode,
      countdown,
      lastUpdate,
      timeHelper.YearMonthDay(start.year, start.month, start.day),
      timeHelper.YearMonthDay(end.year, end.month, end.day)
    );
    return responseMessage;
  }
}
