"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_message_helper_1 = require("./response.message.helper");
const json2typescript_1 = require("json2typescript");
const root_model_1 = require("../models/root.model");
const media_handler_1 = require("../handlers/media.handler");
const container_1 = require("../core/container");
const colors_1 = require("../core/colors");
class MediaHelper {
    static Handle(aniList, message, command, isDM, subscribe) {
        const mediaResult = container_1.Container.MediaResult;
        const result = aniList.MediaSearch(command.Parameter, "ANIME");
        let media = [];
        const jsonConvert = new json2typescript_1.JsonConvert();
        jsonConvert.ignorePrimitiveChecks = false;
        jsonConvert.valueCheckingMode = json2typescript_1.ValueCheckingMode.ALLOW_NULL;
        result.then(async (root) => {
            media = await jsonConvert.deserialize(root, root_model_1.Root).Data.Page
                .media;
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(media);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(media);
            const unreleasedNoDate = media_handler_1.MediaHandler.UnreleasedNoDateMedia(media);
            const exactMedia = media_handler_1.MediaHandler.ExactMedia(media, command.Parameter);
            const completed = media_handler_1.MediaHandler.CompletedMedia(media);
            if (exactMedia.length > 0) {
                exactMedia.forEach(m => {
                    mediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (ongoing.length > 0) {
                ongoing.forEach(m => {
                    mediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleased.length > 0) {
                unreleased.forEach(m => {
                    mediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (unreleasedNoDate.length > 0) {
                unreleasedNoDate.forEach(m => {
                    mediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                });
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    completed.forEach(m => {
                        mediaResult.SendMessage(message, isDM, response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, colors_1.Color.Random));
                    });
                }
                else {
                    mediaResult.SendInfo(message, `I found ***${completed.length}*** anime with your keyword ***${command.Parameter}*** and all of them is already completed.`, isDM);
                }
            }
            else {
                mediaResult.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            }
        });
    }
}
exports.MediaHelper = MediaHelper;
//# sourceMappingURL=media.helper.js.map