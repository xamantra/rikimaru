"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const media_result_1 = require("../../core/media.result");
const media_handler_1 = require("../../handlers/media.handler");
const response_message_helper_1 = require("../../helpers/response.message.helper");
const sender_1 = require("../../core/sender");
class MediaFunction {
    constructor() { }
    async Execute(message, command, dm) {
        await this.Handle(message, command, dm);
    }
    async Handle(message, command, isDM) {
        const color = message.member.highestRole.color;
        media_search_1.MediaSearch.All(command.Parameter)
            .then(results => {
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(results);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(results);
            const unreleasedNoDate = media_handler_1.MediaHandler.UnreleasedNoDateMedia(results);
            const completed = media_handler_1.MediaHandler.CompletedMedia(results);
            const exactMedia = media_handler_1.MediaHandler.ExactMedia(results, command.Parameter);
            if (exactMedia.length > 0) {
                exactMedia.forEach(async (m) => {
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                });
            }
            else if (ongoing.length > 0) {
                ongoing.forEach(async (m) => {
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                });
            }
            else if (unreleased.length > 0) {
                unreleased.forEach(async (m) => {
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                });
            }
            else if (unreleasedNoDate.length > 0) {
                unreleasedNoDate.forEach(async (m) => {
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                });
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    completed.forEach(async (m) => {
                        response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                            media_result_1.MediaResult.SendMessage(message, isDM, response);
                        });
                    });
                }
                else {
                    sender_1.Sender.SendInfo(message, `I found ***${completed.length}*** anime with your keyword ***${command.Parameter}*** and all of them is already completed.`, isDM);
                }
            }
            else {
                sender_1.Sender.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            }
        })
            .catch(() => {
            sender_1.Sender.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            console.warn(`Error while searching : [MediaSearch.All(${command.Parameter})]`);
        });
    }
}
exports.MediaFunction = MediaFunction;
