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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEucmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEucmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscUNBQWtDO0FBQ2xDLHFDQUFrQztBQUVsQyxNQUFhLFdBQVc7SUFDZixNQUFNLENBQUMsV0FBVyxDQUN2QixPQUFnQixFQUNoQixPQUFnQixLQUFLLEVBQ3JCLGVBQWdDO1FBRWhDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQTBCO1FBQ3JELE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLFNBQVMsQ0FBQyxLQUFLLE1BQU0sU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDekUsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDbkUsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxHQUFHLENBQUM7YUFDaEI7WUFDRCxRQUFRLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLEtBQUssV0FBVztvQkFDZCxJQUFJLEdBQUcsY0FBYyxTQUFTLENBQUMsT0FBTyxPQUFPLFFBQVEsRUFBRSxDQUFDO29CQUN4RCxLQUFLLEdBQUcsK0JBQ04sU0FBUyxDQUFDLFNBQ1oscUJBQXFCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQztvQkFDNUMsTUFBTTtnQkFDUixLQUFLLGtCQUFrQjtvQkFDckIsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTt3QkFDaEMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO3dCQUN6QixLQUFLLEdBQUcsK0JBQ04sU0FBUyxDQUFDLFNBQ1osMkJBQTJCLFNBQVMsQ0FBQyxTQUFTLHFCQUM1QyxTQUFTLENBQUMsU0FDWixHQUFHLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTt3QkFDaEMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO3dCQUN6QixLQUFLLEdBQUcsc0JBQ04sU0FBUyxDQUFDLFNBQ1oscUJBQXFCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQztxQkFDN0M7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsSUFBSSxHQUFHLHNCQUFzQixDQUFDO29CQUM5QixLQUFLLEdBQUcsaUJBQWlCLFNBQVMsQ0FBQyxTQUFTLGFBQzFDLFNBQVMsQ0FBQyxPQUNaLElBQUksQ0FBQztvQkFDTCxNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtZQUVELE9BQU8sQ0FBQztnQkFDTixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUN0QixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxTQUFTO3FCQUN6QjtvQkFDRCxLQUFLLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUMzQixHQUFHLEVBQUUsR0FBRyxlQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEdBQUc7b0JBQ25ELE1BQU0sRUFBRTt3QkFDTjs0QkFDRSxJQUFJLEVBQUUsSUFBSTs0QkFDVixLQUFLLEVBQUUsS0FBSzt5QkFDYjt3QkFDRDs0QkFDRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxLQUFLLEVBQUUsaUJBQWlCLGVBQU0sQ0FBQyxjQUFjLElBQzNDLFNBQVMsQ0FBQyxLQUNaLG9CQUFvQixlQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQyxFQUFFLElBQUk7eUJBQzlEO3FCQUNGO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEvRUQsa0NBK0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBSZXNwb25zZU1lc3NhZ2UgfSBmcm9tIFwiLi4vbW9kZWxzL3Jlc3BvbnNlLm1lc3NhZ2UubW9kZWxcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuL3NlbmRlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYVJlc3VsdCB7XG4gIHB1YmxpYyBzdGF0aWMgU2VuZE1lc3NhZ2UoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBpc0RNOiBib29sZWFuID0gZmFsc2UsXG4gICAgcmVzcG9uc2VNZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VcbiAgKSB7XG4gICAgdGhpcy5FbWJlZFRlbXBsYXRlKHJlc3BvbnNlTWVzc2FnZSkudGhlbihlbWJlZCA9PiB7XG4gICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgaXNETSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBFbWJlZFRlbXBsYXRlKHJzTWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IG5hbWUgPSBcIlwiO1xuICAgICAgbGV0IHZhbHVlID0gXCJcIjtcbiAgICAgIGxldCBlcGlzb2RlcyA9IFwiXCI7XG4gICAgICBjb25zb2xlLmxvZyhgVG90YWwgRXBzIGZvciAke3JzTWVzc2FnZS5UaXRsZX06IFwiJHtyc01lc3NhZ2UuVG90YWxFcHN9XCJgKTtcbiAgICAgIGlmIChyc01lc3NhZ2UuVG90YWxFcHMgIT09IG51bGwgJiYgcnNNZXNzYWdlLlRvdGFsRXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXBpc29kZXMgPSByc01lc3NhZ2UuVG90YWxFcHMgPT09IDAgPyBgP2AgOiBgJHtyc01lc3NhZ2UuVG90YWxFcHN9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVwaXNvZGVzID0gYD9gO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChyc01lc3NhZ2UuU3RhdHVzKSB7XG4gICAgICAgIGNhc2UgXCJSRUxFQVNJTkdcIjpcbiAgICAgICAgICBuYW1lID0gYEVwaXNvZGUgKioqJHtyc01lc3NhZ2UuQ3VycmVudH0qKiovJHtlcGlzb2Rlc31gO1xuICAgICAgICAgIHZhbHVlID0gYFdpbGwgYWlyIGluIGFwcHJveGltYXRlbHkgKioke1xuICAgICAgICAgICAgcnNNZXNzYWdlLkNvdW50ZG93blxuICAgICAgICAgIH0qKlxcbkxhc3QgdXBkYXRlOiAqJHtyc01lc3NhZ2UuVXBkYXRlZEF0fSpgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiTk9UX1lFVF9SRUxFQVNFRFwiOlxuICAgICAgICAgIGlmIChyc01lc3NhZ2UuQ291bnRkb3duICE9PSBudWxsKSB7XG4gICAgICAgICAgICBuYW1lID0gYCpOb3QgWWV0IEFpcmVkKmA7XG4gICAgICAgICAgICB2YWx1ZSA9IGBXaWxsIGFpciBpbiBhcHByb3hpbWF0ZWx5ICoqJHtcbiAgICAgICAgICAgICAgcnNNZXNzYWdlLkNvdW50ZG93blxuICAgICAgICAgICAgfSoqXFxuU3RhcnRzIGFpcmluZyBhdDogKioke3JzTWVzc2FnZS5TdGFydERhdGV9KipcXG5MYXN0IHVwZGF0ZTogKiR7XG4gICAgICAgICAgICAgIHJzTWVzc2FnZS5VcGRhdGVkQXRcbiAgICAgICAgICAgIH0qYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJzTWVzc2FnZS5Db3VudGRvd24gPT09IG51bGwpIHtcbiAgICAgICAgICAgIG5hbWUgPSBgKk5vdCBZZXQgQWlyZWQqYDtcbiAgICAgICAgICAgIHZhbHVlID0gYFdpbGwgYmUgYWlyZWQgb24gKioke1xuICAgICAgICAgICAgICByc01lc3NhZ2UuU3RhcnREYXRlXG4gICAgICAgICAgICB9KipcXG5MYXN0IHVwZGF0ZTogKiR7cnNNZXNzYWdlLlVwZGF0ZWRBdH0qYDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJGSU5JU0hFRFwiOlxuICAgICAgICAgIG5hbWUgPSBgKkFscmVhZHkgQ29tcGxldGVkISpgO1xuICAgICAgICAgIHZhbHVlID0gYEFpcmVkOiBGcm9tICoqJHtyc01lc3NhZ2UuU3RhcnREYXRlfSoqICB0byAgKioke1xuICAgICAgICAgICAgcnNNZXNzYWdlLkVuZERhdGVcbiAgICAgICAgICB9KipgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogcnNNZXNzYWdlLkNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgdXJsOiByc01lc3NhZ2UuVGh1bWJuYWlsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCR7cnNNZXNzYWdlLlRpdGxlfWAsXG4gICAgICAgICAgdXJsOiBgJHtDb25maWcuTUFMX0FOSU1FX0JBU0V9LyR7cnNNZXNzYWdlLklkTWFsfS9gLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBMaW5rczpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oJHtDb25maWcuTUFMX0FOSU1FX0JBU0V9LyR7XG4gICAgICAgICAgICAgICAgcnNNZXNzYWdlLklkTWFsXG4gICAgICAgICAgICAgIH0vKSAgfCAgW0FuaUxpc3RdKCR7Q29uZmlnLkFOSV9BTklNRV9CQVNFfS8ke3JzTWVzc2FnZS5JZH0vKWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=