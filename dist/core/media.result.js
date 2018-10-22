"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaResult {
    constructor() {
        console.log(`Discord is ready...`);
    }
    SendMessage(message, isDM = false, responseMessage) {
        this.Send(message, this.EmbedTemplate(responseMessage), isDM);
    }
    Send(message, content, isDM = false) {
        if (isDM) {
            message.author.send(content);
        }
        else {
            message.reply(content);
        }
    }
    SendInfo(message, content, isDM = false) {
        this.Send(message, content, isDM);
    }
    EmbedTemplate(rsMessage) {
        let name = "";
        let value = "";
        if (rsMessage.Status === "RELEASING") {
            name = `*Episode ${rsMessage.Current}*`;
            value = `Will air in approximately **${rsMessage.Countdown}**\n Last update: *${rsMessage.UpdatedAt}*`;
        }
        else if (rsMessage.Status === "NOT_YET_RELEASED" &&
            rsMessage.Countdown !== null) {
            name = `*Not Yet Aired*`;
            value = `Will air in approximately **${rsMessage.Countdown}**\nStarts airing at: **${rsMessage.StartDate}**\nLast update: *${rsMessage.UpdatedAt}*`;
        }
        else if (rsMessage.Status === "NOT_YET_RELEASED" &&
            rsMessage.Countdown === null) {
            name = `*Not Yet Aired*`;
            value = `Will be aired on **${rsMessage.StartDate}**\n Last update: *${rsMessage.UpdatedAt}*`;
        }
        else if (rsMessage.Status === "FINISHED") {
            name = `*Already Completed!*`;
            value = `Aired: From **${rsMessage.StartDate}**  to  **${rsMessage.EndDate}**`;
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