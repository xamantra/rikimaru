"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("./sender");
const config_1 = require("./config");
class MediaResult {
    static SendMessage(message, isDM = false, responseMessage) {
        this.EmbedTemplate(responseMessage).then(embed => {
            sender_1.Sender.Send(message, embed, isDM);
        });
    }
    static EmbedTemplate(rsMessage) {
        return new Promise((resolve, reject) => {
            let name = "";
            let value = "";
            let episodes = "";
            console.log(`Total Eps for ${rsMessage.Title}: "${rsMessage.TotalEps}"`);
            if (rsMessage.TotalEps !== null && rsMessage.TotalEps !== undefined) {
                episodes = rsMessage.TotalEps === 0 ? `?` : `${rsMessage.TotalEps}`;
            }
            else {
                episodes = `?`;
            }
            switch (rsMessage.Status) {
                case "RELEASING":
                    name = `Episode ***${rsMessage.Current}***/${episodes}`;
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
            resolve({
                embed: {
                    color: rsMessage.Color,
                    thumbnail: {
                        url: rsMessage.Thumbnail
                    },
                    title: `${rsMessage.Title}`,
                    url: `${config_1.Config.MAL_ANIME_BASE}/${rsMessage.IdMal}/`,
                    fields: [
                        {
                            name: name,
                            value: value
                        },
                        {
                            name: `Links:`,
                            value: `[MyAnimeList](${config_1.Config.MAL_ANIME_BASE}/${rsMessage.IdMal}/)  |  [AniList](${config_1.Config.ANI_ANIME_BASE}/${rsMessage.Id}/)`
                        }
                    ]
                }
            });
        });
    }
}
exports.MediaResult = MediaResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEucmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEucmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscUNBQWtDO0FBQ2xDLHFDQUFrQztBQUVsQyxNQUFhLFdBQVc7SUFDZixNQUFNLENBQUMsV0FBVyxDQUN2QixPQUFnQixFQUNoQixPQUFnQixLQUFLLEVBQ3JCLGVBQWdDO1FBRWhDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQTBCO1FBQ3JELE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLFNBQVMsQ0FBQyxLQUFLLE1BQU0sU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDekUsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDbkUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxHQUFHLENBQUM7YUFDaEI7WUFDRCxRQUFRLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLEtBQUssV0FBVztvQkFDZCxJQUFJLEdBQUcsY0FBYyxTQUFTLENBQUMsT0FBTyxPQUFPLFFBQVEsRUFBRSxDQUFDO29CQUN4RCxLQUFLLEdBQUcsK0JBQ04sU0FBUyxDQUFDLFNBQ1oscUJBQXFCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQztvQkFDNUMsTUFBTTtnQkFDUixLQUFLLGtCQUFrQjtvQkFDckIsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTt3QkFDaEMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO3dCQUN6QixLQUFLLEdBQUcsK0JBQ04sU0FBUyxDQUFDLFNBQ1osMkJBQTJCLFNBQVMsQ0FBQyxTQUFTLHFCQUM1QyxTQUFTLENBQUMsU0FDWixHQUFHLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTt3QkFDaEMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO3dCQUN6QixLQUFLLEdBQUcsc0JBQ04sU0FBUyxDQUFDLFNBQ1oscUJBQXFCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQztxQkFDN0M7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsSUFBSSxHQUFHLHNCQUFzQixDQUFDO29CQUM5QixLQUFLLEdBQUcsaUJBQWlCLFNBQVMsQ0FBQyxTQUFTLGFBQzFDLFNBQVMsQ0FBQyxPQUNaLElBQUksQ0FBQztvQkFDTCxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtZQUVELE9BQU8sQ0FBQztnQkFDTixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUN0QixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxTQUFTO3FCQUN6QjtvQkFDRCxLQUFLLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUMzQixHQUFHLEVBQUUsR0FBRyxlQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEdBQUc7b0JBQ25ELE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxJQUFJLEVBQUUsSUFBSTs0QkFDVixLQUFLLEVBQUUsS0FBSzt5QkFDYjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxLQUFLLEVBQUUsaUJBQWlCLGVBQU0sQ0FBQyxjQUFjLElBQzNDLFNBQVMsQ0FBQyxLQUNaLG9CQUFvQixlQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUk7eUJBQzlEO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEvRUQsa0NBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IFJlc3BvbnNlTWVzc2FnZSB9IGZyb20gXCIuLi9tb2RlbHMvcmVzcG9uc2UubWVzc2FnZS5tb2RlbFwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4vc2VuZGVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIE1lZGlhUmVzdWx0IHtcbiAgcHVibGljIHN0YXRpYyBTZW5kTWVzc2FnZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGlzRE06IGJvb2xlYW4gPSBmYWxzZSxcbiAgICByZXNwb25zZU1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZVxuICApIHtcbiAgICB0aGlzLkVtYmVkVGVtcGxhdGUocmVzcG9uc2VNZXNzYWdlKS50aGVuKGVtYmVkID0+IHtcbiAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBpc0RNKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIEVtYmVkVGVtcGxhdGUocnNNZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgbmFtZSA9IFwiXCI7XG4gICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgbGV0IGVwaXNvZGVzID0gXCJcIjtcbiAgICAgIGNvbnNvbGUubG9nKGBUb3RhbCBFcHMgZm9yICR7cnNNZXNzYWdlLlRpdGxlfTogXCIke3JzTWVzc2FnZS5Ub3RhbEVwc31cImApO1xuICAgICAgaWYgKHJzTWVzc2FnZS5Ub3RhbEVwcyAhPT0gbnVsbCAmJiByc01lc3NhZ2UuVG90YWxFcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcGlzb2RlcyA9IHJzTWVzc2FnZS5Ub3RhbEVwcyA9PT0gMCA/IGA/YCA6IGAke3JzTWVzc2FnZS5Ub3RhbEVwc31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXBpc29kZXMgPSBgP2A7XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHJzTWVzc2FnZS5TdGF0dXMpIHtcbiAgICAgICAgY2FzZSBcIlJFTEVBU0lOR1wiOlxuICAgICAgICAgIG5hbWUgPSBgRXBpc29kZSAqKioke3JzTWVzc2FnZS5DdXJyZW50fSoqKi8ke2VwaXNvZGVzfWA7XG4gICAgICAgICAgdmFsdWUgPSBgV2lsbCBhaXIgaW4gYXBwcm94aW1hdGVseSAqKiR7XG4gICAgICAgICAgICByc01lc3NhZ2UuQ291bnRkb3duXG4gICAgICAgICAgfSoqXFxuTGFzdCB1cGRhdGU6ICoke3JzTWVzc2FnZS5VcGRhdGVkQXR9KmA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJOT1RfWUVUX1JFTEVBU0VEXCI6XG4gICAgICAgICAgaWYgKHJzTWVzc2FnZS5Db3VudGRvd24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5hbWUgPSBgKk5vdCBZZXQgQWlyZWQqYDtcbiAgICAgICAgICAgIHZhbHVlID0gYFdpbGwgYWlyIGluIGFwcHJveGltYXRlbHkgKioke1xuICAgICAgICAgICAgICByc01lc3NhZ2UuQ291bnRkb3duXG4gICAgICAgICAgICB9KipcXG5TdGFydHMgYWlyaW5nIGF0OiAqKiR7cnNNZXNzYWdlLlN0YXJ0RGF0ZX0qKlxcbkxhc3QgdXBkYXRlOiAqJHtcbiAgICAgICAgICAgICAgcnNNZXNzYWdlLlVwZGF0ZWRBdFxuICAgICAgICAgICAgfSpgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocnNNZXNzYWdlLkNvdW50ZG93biA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbmFtZSA9IGAqTm90IFlldCBBaXJlZCpgO1xuICAgICAgICAgICAgdmFsdWUgPSBgV2lsbCBiZSBhaXJlZCBvbiAqKiR7XG4gICAgICAgICAgICAgIHJzTWVzc2FnZS5TdGFydERhdGVcbiAgICAgICAgICAgIH0qKlxcbkxhc3QgdXBkYXRlOiAqJHtyc01lc3NhZ2UuVXBkYXRlZEF0fSpgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkZJTklTSEVEXCI6XG4gICAgICAgICAgbmFtZSA9IGAqQWxyZWFkeSBDb21wbGV0ZWQhKmA7XG4gICAgICAgICAgdmFsdWUgPSBgQWlyZWQ6IEZyb20gKioke3JzTWVzc2FnZS5TdGFydERhdGV9KiogIHRvICAqKiR7XG4gICAgICAgICAgICByc01lc3NhZ2UuRW5kRGF0ZVxuICAgICAgICAgIH0qKmA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiByc01lc3NhZ2UuQ29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICB1cmw6IHJzTWVzc2FnZS5UaHVtYm5haWxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiBgJHtyc01lc3NhZ2UuVGl0bGV9YCxcbiAgICAgICAgICB1cmw6IGAke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHtyc01lc3NhZ2UuSWRNYWx9L2AsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYExpbmtzOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XSgke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHtcbiAgICAgICAgICAgICAgICByc01lc3NhZ2UuSWRNYWxcbiAgICAgICAgICAgICAgfS8pICB8ICBbQW5pTGlzdF0oJHtDb25maWcuQU5JX0FOSU1FX0JBU0V9LyR7cnNNZXNzYWdlLklkfS8pYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==