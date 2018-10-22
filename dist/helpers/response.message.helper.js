"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_message_model_1 = require("../models/response.message.model");
const container_1 = require("../core/container");
class ResponseMessageHelper {
    constructor() {
        this.TimeHelper = container_1.Container.TimeHelper;
        this.TitleHelper = container_1.Container.TitleHelper;
        console.log(`Constructed: "${ResponseMessageHelper.name}"`);
    }
    CreateMessage(media, status, color) {
        const timeHelper = this.TimeHelper;
        const titleHelper = this.TitleHelper;
        let responseMessage;
        let nextAiringEpisode;
        let episode;
        let start;
        let end;
        let countdown = null;
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
        responseMessage = new response_message_model_1.ResponseMessage(media.idMal, color, media.coverImage.large, titleHelper.Get(media.title), status, episode, countdown, lastUpdate, timeHelper.YearMonthDay(start.year, start.month, start.day), timeHelper.YearMonthDay(end.year, end.month, end.day));
        return responseMessage;
    }
}
exports.ResponseMessageHelper = ResponseMessageHelper;
//# sourceMappingURL=response.message.helper.js.map