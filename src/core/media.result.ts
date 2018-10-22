import { Message } from "discord.js";
import { ResponseMessage } from "../models/response.message.model";
import {
  IOngoingResponse,
  IUnreleasedWithDate,
  IUnreleasedNoDate,
  ICompleted
} from "../interfaces/message.response.interface";

export class MediaResult {
  constructor() {
    console.log(`Constructed: "${MediaResult.name}"`);
  }

  public SendMessage(
    message: Message,
    isDM: boolean = false,
    responseMessage: ResponseMessage
  ) {
    this.Send(message, this.EmbedTemplate(responseMessage), isDM);
  }

  private Send(message: Message, content: any, isDM: boolean = false) {
    if (isDM) {
      message.author.send(content);
    } else {
      message.reply(content);
    }
  }

  public SendInfo(message: Message, content: any, isDM: boolean = false) {
    this.Send(message, content, isDM);
  }

  private EmbedTemplate(rsMessage: ResponseMessage) {
    let name = "";
    let value = "";
    if (rsMessage.Status === "RELEASING") {
      name = `*Episode ${rsMessage.Current}*`;
      value = `Will air in approximately **${
        rsMessage.Countdown
      }**\nLast update: *${rsMessage.UpdatedAt}*`;
    } else if (
      rsMessage.Status === "NOT_YET_RELEASED" &&
      rsMessage.Countdown !== null
    ) {
      name = `*Not Yet Aired*`;
      value = `Will air in approximately **${
        rsMessage.Countdown
      }**\nStarts airing at: **${rsMessage.StartDate}**\nLast update: *${
        rsMessage.UpdatedAt
      }*`;
    } else if (
      rsMessage.Status === "NOT_YET_RELEASED" &&
      rsMessage.Countdown === null
    ) {
      name = `*Not Yet Aired*`;
      value = `Will be aired on **${rsMessage.StartDate}**\nLast update: *${
        rsMessage.UpdatedAt
      }*`;
    } else if (rsMessage.Status === "FINISHED") {
      name = `*Already Completed!*`;
      value = `Aired: From **${rsMessage.StartDate}**  to  **${
        rsMessage.EndDate
      }**`;
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
