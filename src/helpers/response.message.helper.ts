import { IMedia } from "../interfaces/page.interface";
import { EndDate } from "../models/end.date.model";
import { NextAiringEpisode } from "../models/next.airing.episode.model";
import { ResponseMessage } from "../models/response.message.model";
import { StartDate } from "../models/start.date.model";
import { TitleHelper } from "./title.helper";
import { TimeHelper } from "./time.helper";

export class ResponseMessageHelper {
  public static CreateMessage(
    media: IMedia,
    status: string,
    color: number
  ): ResponseMessage {
    let responseMessage: ResponseMessage;
    let nextAiringEpisode: NextAiringEpisode;
    let episode: number;
    let start: StartDate;
    let end: EndDate;
    let countdown: string = null;
    const lastUpdate: string = TimeHelper.Elapsed(media.updatedAt);
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
        countdown = TimeHelper.Countdown(nextAiringEpisode.timeUntilAiring);
      }
    }
    responseMessage = new ResponseMessage(
      media.idMal,
      color,
      media.coverImage.large,
      TitleHelper.Get(media.title),
      status,
      episode,
      countdown,
      lastUpdate,
      TimeHelper.YearMonthDay(start.year, start.month, start.day),
      TimeHelper.YearMonthDay(end.year, end.month, end.day)
    );
    return responseMessage;
  }
}
