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
        await media_search_1.MediaSearch.All(command.Parameter, async (res) => {
            const ongoing = await media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = await media_handler_1.MediaHandler.UnreleasedMedia(res);
            const unreleasedNoDate = await media_handler_1.MediaHandler.UnreleasedNoDateMedia(res);
            const completed = await media_handler_1.MediaHandler.CompletedMedia(res);
            const exactMedia = await media_handler_1.MediaHandler.ExactMedia(res, command.Parameter);
            if (exactMedia.length > 0) {
                exactMedia.forEach(async (m) => {
                    await media_result_1.MediaResult.SendMessage(message, isDM, await response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (ongoing.length > 0) {
                await ongoing.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, await response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleased.length > 0) {
                await unreleased.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, await response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleasedNoDate.length > 0) {
                await unreleasedNoDate.forEach(async (m) => {
                    media_result_1.MediaResult.SendMessage(message, isDM, await response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    await completed.forEach(async (m) => {
                        await media_result_1.MediaResult.SendMessage(message, isDM, await response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                    });
                }
                else {
                    await media_result_1.MediaResult.SendInfo(message, `I found ***${completed.length}*** anime with your keyword ***${command.Parameter}*** and all of them is already completed.`, isDM);
                }
            }
            else {
                await media_result_1.MediaResult.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            }
        });
    }
}
exports.MediaFunction = MediaFunction;
//# sourceMappingURL=media.command.function.js.map