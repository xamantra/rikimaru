"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("./sender");
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
                    name = `*Episode* ***${rsMessage.Current}***/${episodes}`;
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
exports.MediaResult = MediaResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEucmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEucmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscUNBQWtDO0FBRWxDLE1BQWEsV0FBVztJQUNmLE1BQU0sQ0FBQyxXQUFXLENBQ3ZCLE9BQWdCLEVBQ2hCLE9BQWdCLEtBQUssRUFDckIsZUFBZ0M7UUFFaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0MsZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBMEI7UUFDckQsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsU0FBUyxDQUFDLEtBQUssTUFBTSxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUN6RSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUNuRSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckU7aUJBQU07Z0JBQ0wsUUFBUSxHQUFHLEdBQUcsQ0FBQzthQUNoQjtZQUNELFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsS0FBSyxXQUFXO29CQUNkLElBQUksR0FBRyxnQkFBZ0IsU0FBUyxDQUFDLE9BQU8sT0FBTyxRQUFRLEVBQUUsQ0FBQztvQkFDMUQsS0FBSyxHQUFHLCtCQUNOLFNBQVMsQ0FBQyxTQUNaLHFCQUFxQixTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1IsS0FBSyxrQkFBa0I7b0JBQ3JCLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ2hDLElBQUksR0FBRyxpQkFBaUIsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLCtCQUNOLFNBQVMsQ0FBQyxTQUNaLDJCQUEyQixTQUFTLENBQUMsU0FBUyxxQkFDNUMsU0FBUyxDQUFDLFNBQ1osR0FBRyxDQUFDO3FCQUNMO29CQUNELElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ2hDLElBQUksR0FBRyxpQkFBaUIsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLHNCQUNOLFNBQVMsQ0FBQyxTQUNaLHFCQUFxQixTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7cUJBQzdDO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLElBQUksR0FBRyxzQkFBc0IsQ0FBQztvQkFDOUIsS0FBSyxHQUFHLGlCQUFpQixTQUFTLENBQUMsU0FBUyxhQUMxQyxTQUFTLENBQUMsT0FDWixJQUFJLENBQUM7b0JBQ0wsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFFRCxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztvQkFDdEIsU0FBUyxFQUFFO3dCQUNULEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUztxQkFDekI7b0JBQ0QsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssUUFBUTtvQkFDcEMsR0FBRyxFQUFFLGlDQUFpQyxTQUFTLENBQUMsRUFBRSxHQUFHO29CQUNyRCxNQUFNLEVBQUU7d0JBQ047NEJBQ0UsSUFBSSxFQUFFLElBQUk7NEJBQ1YsS0FBSyxFQUFFLEtBQUs7eUJBQ2I7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpFRCxrQ0F5RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBEaXNjb3JkQVBJRXJyb3IgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZU1lc3NhZ2UgfSBmcm9tIFwiLi4vbW9kZWxzL3Jlc3BvbnNlLm1lc3NhZ2UubW9kZWxcIjtcclxuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4vc2VuZGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWFSZXN1bHQge1xyXG4gIHB1YmxpYyBzdGF0aWMgU2VuZE1lc3NhZ2UoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgaXNETTogYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgcmVzcG9uc2VNZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2VcclxuICApIHtcclxuICAgIHRoaXMuRW1iZWRUZW1wbGF0ZShyZXNwb25zZU1lc3NhZ2UpLnRoZW4oZW1iZWQgPT4ge1xyXG4gICAgICBTZW5kZXIuU2VuZChtZXNzYWdlLCBlbWJlZCwgaXNETSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIEVtYmVkVGVtcGxhdGUocnNNZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICBsZXQgdmFsdWUgPSBcIlwiO1xyXG4gICAgICBsZXQgZXBpc29kZXMgPSBcIlwiO1xyXG4gICAgICBjb25zb2xlLmxvZyhgVG90YWwgRXBzIGZvciAke3JzTWVzc2FnZS5UaXRsZX06IFwiJHtyc01lc3NhZ2UuVG90YWxFcHN9XCJgKTtcclxuICAgICAgaWYgKHJzTWVzc2FnZS5Ub3RhbEVwcyAhPT0gbnVsbCAmJiByc01lc3NhZ2UuVG90YWxFcHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGVwaXNvZGVzID0gcnNNZXNzYWdlLlRvdGFsRXBzID09PSAwID8gYD9gIDogYCR7cnNNZXNzYWdlLlRvdGFsRXBzfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXBpc29kZXMgPSBgP2A7XHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChyc01lc3NhZ2UuU3RhdHVzKSB7XHJcbiAgICAgICAgY2FzZSBcIlJFTEVBU0lOR1wiOlxyXG4gICAgICAgICAgbmFtZSA9IGAqRXBpc29kZSogKioqJHtyc01lc3NhZ2UuQ3VycmVudH0qKiovJHtlcGlzb2Rlc31gO1xyXG4gICAgICAgICAgdmFsdWUgPSBgV2lsbCBhaXIgaW4gYXBwcm94aW1hdGVseSAqKiR7XHJcbiAgICAgICAgICAgIHJzTWVzc2FnZS5Db3VudGRvd25cclxuICAgICAgICAgIH0qKlxcbkxhc3QgdXBkYXRlOiAqJHtyc01lc3NhZ2UuVXBkYXRlZEF0fSpgO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIk5PVF9ZRVRfUkVMRUFTRURcIjpcclxuICAgICAgICAgIGlmIChyc01lc3NhZ2UuQ291bnRkb3duICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBgKk5vdCBZZXQgQWlyZWQqYDtcclxuICAgICAgICAgICAgdmFsdWUgPSBgV2lsbCBhaXIgaW4gYXBwcm94aW1hdGVseSAqKiR7XHJcbiAgICAgICAgICAgICAgcnNNZXNzYWdlLkNvdW50ZG93blxyXG4gICAgICAgICAgICB9KipcXG5TdGFydHMgYWlyaW5nIGF0OiAqKiR7cnNNZXNzYWdlLlN0YXJ0RGF0ZX0qKlxcbkxhc3QgdXBkYXRlOiAqJHtcclxuICAgICAgICAgICAgICByc01lc3NhZ2UuVXBkYXRlZEF0XHJcbiAgICAgICAgICAgIH0qYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChyc01lc3NhZ2UuQ291bnRkb3duID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBgKk5vdCBZZXQgQWlyZWQqYDtcclxuICAgICAgICAgICAgdmFsdWUgPSBgV2lsbCBiZSBhaXJlZCBvbiAqKiR7XHJcbiAgICAgICAgICAgICAgcnNNZXNzYWdlLlN0YXJ0RGF0ZVxyXG4gICAgICAgICAgICB9KipcXG5MYXN0IHVwZGF0ZTogKiR7cnNNZXNzYWdlLlVwZGF0ZWRBdH0qYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJGSU5JU0hFRFwiOlxyXG4gICAgICAgICAgbmFtZSA9IGAqQWxyZWFkeSBDb21wbGV0ZWQhKmA7XHJcbiAgICAgICAgICB2YWx1ZSA9IGBBaXJlZDogRnJvbSAqKiR7cnNNZXNzYWdlLlN0YXJ0RGF0ZX0qKiAgdG8gICoqJHtcclxuICAgICAgICAgICAgcnNNZXNzYWdlLkVuZERhdGVcclxuICAgICAgICAgIH0qKmA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogcnNNZXNzYWdlLkNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XHJcbiAgICAgICAgICAgIHVybDogcnNNZXNzYWdlLlRodW1ibmFpbFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHRpdGxlOiBgKioqJHtyc01lc3NhZ2UuVGl0bGV9KioqICAgYCxcclxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7cnNNZXNzYWdlLklkfS9gLFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=