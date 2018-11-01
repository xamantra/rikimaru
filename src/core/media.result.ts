import { Message, DiscordAPIError } from "discord.js";
import { ResponseMessage } from "../models/response.message.model";
import { Sender } from "./sender";

export class MediaResult {
  public static SendMessage(
    message: Message,
    isDM: boolean = false,
    responseMessage: ResponseMessage
  ) {
    this.EmbedTemplate(responseMessage).then(embed => {
      Sender.Send(message, embed, isDM);
    });
  }

  private static EmbedTemplate(rsMessage: ResponseMessage) {
    return new Promise<any>((resolve, reject) => {
      let name = "";
      let value = "";
      let episodes = "";
      console.log(`Total Eps for ${rsMessage.Title}: "${rsMessage.TotalEps}"`);
      if (rsMessage.TotalEps !== null && rsMessage.TotalEps !== undefined) {
        episodes = rsMessage.TotalEps === 0 ? `?` : `${rsMessage.TotalEps}`;
      } else {
        episodes = `?`;
      }
      switch (rsMessage.Status) {
        case "RELEASING":
          name = `*Episode* ***${rsMessage.Current}***/${episodes}`;
          value = `Will air in approximately **${
            rsMessage.Countdown
          }**\nLast update: *${rsMessage.UpdatedAt}*`;
          break;
        case "NOT_YET_RELEASED":
          if (rsMessage.Countdown !== null) {
            name = `*Not Yet Aired*`;
            value = `Will air in approximately **${
              rsMessage.Countdown
            }**\nStarts airing at: **${rsMessage.StartDate}**\nLast update: *${
              rsMessage.UpdatedAt
            }*`;
          }
          if (rsMessage.Countdown === null) {
            name = `*Not Yet Aired*`;
            value = `Will be aired on **${
              rsMessage.StartDate
            }**\nLast update: *${rsMessage.UpdatedAt}*`;
          }
          break;
        case "FINISHED":
          name = `*Already Completed!*`;
          value = `Aired: From **${rsMessage.StartDate}**  to  **${
            rsMessage.EndDate
          }**`;
          break;
        default:
          break;
      }

      resolve({
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
      });
    });
  }
}
