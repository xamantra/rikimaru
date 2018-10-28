"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("./sender");
class MediaResult {
    static SendMessage(message, isDM = false, responseMessage) {
        sender_1.Sender.Send(message, this.EmbedTemplate(responseMessage), isDM);
    }
    static EmbedTemplate(rsMessage) {
        let name = "";
        let value = "";
        switch (rsMessage.Status) {
            case "RELEASING":
                name = `*Episode ${rsMessage.Current}*`;
                value = `Will air in approximately **${rsMessage.Countdown}**\nLast update: *${rsMessage.UpdatedAt}*`;
                break;
            case "NOT_YET_RELEASED":
                if (rsMessage.Countdown !== null) {
                    name = `*Not Yet Aired*`;
                    value = `Will air in approximately **${rsMessage.Countdown}**\nStarts airing at: **${rsMessage.StartDate}**\nLast update: *${rsMessage.UpdatedAt}*`;
                }
                if (rsMessage.Countdown === null) {
                    name = `*Not Yet Aired*`;
                    value = `Will be aired on **${rsMessage.StartDate}**\nLast update: *${rsMessage.UpdatedAt}*`;
                }
                break;
            case "FINISHED":
                name = `*Already Completed!*`;
                value = `Aired: From **${rsMessage.StartDate}**  to  **${rsMessage.EndDate}**`;
                break;
            default:
                break;
        }
        return {
            embed: {
                color: rsMessage.Color,
                thumbnail: {
                    url: rsMessage.Thumbnail
                },
                title: `***${rsMessage.Title}***   `,
                url: `https://myanimelist.net/anime/${rsMessage.Id}/`,
                fields: [
                    {
                        name: name,
                        value: value
                    }
                ]
            }
        };
    }
}
exports.MediaResult = MediaResult;
//# sourceMappingURL=media.result.js.map