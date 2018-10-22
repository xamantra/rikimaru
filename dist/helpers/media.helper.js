"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./../core/container");
const json2typescript_1 = require("json2typescript");
const root_model_1 = require("../models/root.model");
class MediaHelper {
    constructor() {
        this.Color = container_1.Container.Color;
        this.MediaHandler = container_1.Container.MediaHandler;
        this.MediaResult = container_1.Container.MediaResult;
        this.ResponseMessageHelper = container_1.Container.ResponseMessageHelper;
        console.log(`Constructed: "${MediaHelper.name}"`);
    }
    Handle(aniList, message, command, isDM) {
        const mediaHandler = this.MediaHandler;
        const color = this.Color;
        const mediaResult = this.MediaResult;
        const responseHelper = this.ResponseMessageHelper;
        const result = aniList.MediaSearch(command.Parameter, "ANIME");
        let media = [];
        const jsonConvert = new json2typescript_1.JsonConvert();
        jsonConvert.ignorePrimitiveChecks = false;
        jsonConvert.valueCheckingMode = json2typescript_1.ValueCheckingMode.ALLOW_NULL;
        result.then(async (root) => {
            media = await jsonConvert.deserialize(root, root_model_1.Root).Data.Page
                .media;
            const ongoing = mediaHandler.OngoingMedia(media);
            const unreleased = mediaHandler.UnreleasedMedia(media);
            const unreleasedNoDate = mediaHandler.UnreleasedNoDateMedia(media);
            const exactMedia = mediaHandler.ExactMedia(media, command.Parameter);
            const completed = mediaHandler.CompletedMedia(media);
            if (exactMedia.length > 0) {
                exactMedia.forEach(m => {
                    mediaResult.SendMessage(message, isDM, responseHelper.CreateMessage(m, m.status, color.Random));
                });
            }
            else if (ongoing.length > 0) {
                ongoing.forEach(m => {
                    mediaResult.SendMessage(message, isDM, responseHelper.CreateMessage(m, m.status, color.Random));
                });
            }
            else if (unreleased.length > 0) {
                unreleased.forEach(m => {
                    mediaResult.SendMessage(message, isDM, responseHelper.CreateMessage(m, m.status, color.Random));
                });
            }
            else if (unreleasedNoDate.length > 0) {
                unreleasedNoDate.forEach(m => {
                    mediaResult.SendMessage(message, isDM, responseHelper.CreateMessage(m, m.status, color.Random));
                });
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    completed.forEach(m => {
                        mediaResult.SendMessage(message, isDM, responseHelper.CreateMessage(m, m.status, color.Random));
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