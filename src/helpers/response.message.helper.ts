import {
  IMedia,
  IDate,
  INextAiringEpisode
} from "../interfaces/page.interface";
import { ResponseMessage } from "../models/response.message.model";
import { TitleHelper } from "./title.helper";
import { TimeHelper } from "./time.helper";

export class ResponseMessageHelper {
  constructor() {
    console.log(`Constructed: "${ResponseMessageHelper.name}"`);
  }

  public static CreateMessage(media: IMedia, status: string, color: number) {
    let responseMessage: ResponseMessage;
    let nextAiringEpisode: INextAiringEpisode;
    let next: number;
    let start: IDate;
    let end: IDate;
    let countdown: string = null;
    const lastUpdate = TimeHelper.Elapsed(media.updatedAt);
    if (media.startDate !== null) {
      start = media.startDate;
    }
    if (media.endDate !== null) {
      end = media.endDate;
    }
    if (media.nextAiringEpisode !== null) {
      nextAiringEpisode = media.nextAiringEpisode;
      if (nextAiringEpisode.next !== null) {
        next = nextAiringEpisode.next;
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
      media.type,
      status,
      next,
      countdown,
      lastUpdate,
      TimeHelper.YearMonthDay(start.year, start.month, start.day),
      TimeHelper.YearMonthDay(end.year, end.month, end.day)
    );
    return responseMessage;
  }
}
