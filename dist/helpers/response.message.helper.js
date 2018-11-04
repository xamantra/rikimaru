"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_message_model_1 = require("../models/response.message.model");
const title_helper_1 = require("./title.helper");
const time_helper_1 = require("./time.helper");
class ResponseMessageHelper {
    static CreateMessage(media, status, color) {
        return new Promise((resolve, reject) => {
            let responseMessage;
            let nextAiringEpisode;
            let next;
            let start;
            let end;
            let countdown = null;
            const lastUpdate = time_helper_1.TimeHelper.Elapsed(media.updatedAt);
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
                    countdown = time_helper_1.TimeHelper.Countdown(nextAiringEpisode.timeUntilAiring);
                }
            }
            responseMessage = new response_message_model_1.ResponseMessage(media.idMal, color, media.coverImage.large, title_helper_1.TitleHelper.Get(media.title), media.type, status, media.episodes, next, countdown, lastUpdate, time_helper_1.TimeHelper.YearMonthDay(start.year, start.month, start.day), time_helper_1.TimeHelper.YearMonthDay(end.year, end.month, end.day));
            resolve(responseMessage);
        });
    }
}
exports.ResponseMessageHelper = ResponseMessageHelper;
