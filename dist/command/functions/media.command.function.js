"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const media_result_1 = require("../../core/media.result");
const media_handler_1 = require("../../handlers/media.handler");
const response_message_helper_1 = require("../../helpers/response.message.helper");
const colors_1 = require("../../core/colors");
class MediaFunction {
    constructor() {
        console.log(`Constructed: "${MediaFunction.name}"`);
    }
    async Execute(message, command, dm) {
        await this.Handle(message, command, dm);
    }
    async Handle(message, command, isDM) {
        media_search_1.MediaSearch.All(command.Parameter).then(res => {
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(res);
            const unreleasedNoDate = media_handler_1.MediaHandler.UnreleasedNoDateMedia(res);
            const completed = media_handler_1.MediaHandler.CompletedMedia(res);
            const exactMedia = media_handler_1.MediaHandler.ExactMedia(res, command.Parameter);
            if (exactMedia.length > 0) {
                exactMedia.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (ongoing.length > 0) {
                ongoing.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleased.length > 0) {
                unreleased.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleasedNoDate.length > 0) {
                unreleasedNoDate.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    completed.forEach(async (m) => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                    });
                }
                else {
                    media_result_1.MediaResult.SendInfo(message, `I found ***${completed.length}*** anime with your keyword ***${command.Parameter}*** and all of them is already completed.`, isDM);
                }
            }
            else {
                media_result_1.MediaResult.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            }
        });
    }
}
exports.MediaFunction = MediaFunction;
//# sourceMappingURL=media.command.function.js.map