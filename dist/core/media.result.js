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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEucmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEucmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscUNBQWtDO0FBRWxDLE1BQWEsV0FBVztJQUNmLE1BQU0sQ0FBQyxXQUFXLENBQ3ZCLE9BQWdCLEVBQ2hCLE9BQWdCLEtBQUssRUFDckIsZUFBZ0M7UUFFaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0MsZUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBMEI7UUFDckQsT0FBTyxJQUFJLE9BQU8sQ0FBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsU0FBUyxDQUFDLEtBQUssTUFBTSxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUN6RSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUNuRSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckU7aUJBQU07Z0JBQ0wsUUFBUSxHQUFHLEdBQUcsQ0FBQzthQUNoQjtZQUNELFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsS0FBSyxXQUFXO29CQUNkLElBQUksR0FBRyxnQkFBZ0IsU0FBUyxDQUFDLE9BQU8sT0FBTyxRQUFRLEVBQUUsQ0FBQztvQkFDMUQsS0FBSyxHQUFHLCtCQUNOLFNBQVMsQ0FBQyxTQUNaLHFCQUFxQixTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1IsS0FBSyxrQkFBa0I7b0JBQ3JCLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ2hDLElBQUksR0FBRyxpQkFBaUIsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLCtCQUNOLFNBQVMsQ0FBQyxTQUNaLDJCQUEyQixTQUFTLENBQUMsU0FBUyxxQkFDNUMsU0FBUyxDQUFDLFNBQ1osR0FBRyxDQUFDO3FCQUNMO29CQUNELElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ2hDLElBQUksR0FBRyxpQkFBaUIsQ0FBQzt3QkFDekIsS0FBSyxHQUFHLHNCQUNOLFNBQVMsQ0FBQyxTQUNaLHFCQUFxQixTQUFTLENBQUMsU0FBUyxHQUFHLENBQUM7cUJBQzdDO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLElBQUksR0FBRyxzQkFBc0IsQ0FBQztvQkFDOUIsS0FBSyxHQUFHLGlCQUFpQixTQUFTLENBQUMsU0FBUyxhQUMxQyxTQUFTLENBQUMsT0FDWixJQUFJLENBQUM7b0JBQ0wsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFFRCxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSztvQkFDdEIsU0FBUyxFQUFFO3dCQUNULEdBQUcsRUFBRSxTQUFTLENBQUMsU0FBUztxQkFDekI7b0JBQ0QsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDLEtBQUssUUFBUTtvQkFDcEMsR0FBRyxFQUFFLGlDQUFpQyxTQUFTLENBQUMsRUFBRSxHQUFHO29CQUNyRCxNQUFNLEVBQUU7d0JBQ047NEJBQ0UsSUFBSSxFQUFFLElBQUk7NEJBQ1YsS0FBSyxFQUFFLEtBQUs7eUJBQ2I7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpFRCxrQ0F5RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBEaXNjb3JkQVBJRXJyb3IgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgUmVzcG9uc2VNZXNzYWdlIH0gZnJvbSBcIi4uL21vZGVscy9yZXNwb25zZS5tZXNzYWdlLm1vZGVsXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi9zZW5kZXJcIjtcblxuZXhwb3J0IGNsYXNzIE1lZGlhUmVzdWx0IHtcbiAgcHVibGljIHN0YXRpYyBTZW5kTWVzc2FnZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGlzRE06IGJvb2xlYW4gPSBmYWxzZSxcbiAgICByZXNwb25zZU1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZVxuICApIHtcbiAgICB0aGlzLkVtYmVkVGVtcGxhdGUocmVzcG9uc2VNZXNzYWdlKS50aGVuKGVtYmVkID0+IHtcbiAgICAgIFNlbmRlci5TZW5kKG1lc3NhZ2UsIGVtYmVkLCBpc0RNKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIEVtYmVkVGVtcGxhdGUocnNNZXNzYWdlOiBSZXNwb25zZU1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgbmFtZSA9IFwiXCI7XG4gICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgbGV0IGVwaXNvZGVzID0gXCJcIjtcbiAgICAgIGNvbnNvbGUubG9nKGBUb3RhbCBFcHMgZm9yICR7cnNNZXNzYWdlLlRpdGxlfTogXCIke3JzTWVzc2FnZS5Ub3RhbEVwc31cImApO1xuICAgICAgaWYgKHJzTWVzc2FnZS5Ub3RhbEVwcyAhPT0gbnVsbCAmJiByc01lc3NhZ2UuVG90YWxFcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcGlzb2RlcyA9IHJzTWVzc2FnZS5Ub3RhbEVwcyA9PT0gMCA/IGA/YCA6IGAke3JzTWVzc2FnZS5Ub3RhbEVwc31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXBpc29kZXMgPSBgP2A7XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHJzTWVzc2FnZS5TdGF0dXMpIHtcbiAgICAgICAgY2FzZSBcIlJFTEVBU0lOR1wiOlxuICAgICAgICAgIG5hbWUgPSBgKkVwaXNvZGUqICoqKiR7cnNNZXNzYWdlLkN1cnJlbnR9KioqLyR7ZXBpc29kZXN9YDtcbiAgICAgICAgICB2YWx1ZSA9IGBXaWxsIGFpciBpbiBhcHByb3hpbWF0ZWx5ICoqJHtcbiAgICAgICAgICAgIHJzTWVzc2FnZS5Db3VudGRvd25cbiAgICAgICAgICB9KipcXG5MYXN0IHVwZGF0ZTogKiR7cnNNZXNzYWdlLlVwZGF0ZWRBdH0qYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIk5PVF9ZRVRfUkVMRUFTRURcIjpcbiAgICAgICAgICBpZiAocnNNZXNzYWdlLkNvdW50ZG93biAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbmFtZSA9IGAqTm90IFlldCBBaXJlZCpgO1xuICAgICAgICAgICAgdmFsdWUgPSBgV2lsbCBhaXIgaW4gYXBwcm94aW1hdGVseSAqKiR7XG4gICAgICAgICAgICAgIHJzTWVzc2FnZS5Db3VudGRvd25cbiAgICAgICAgICAgIH0qKlxcblN0YXJ0cyBhaXJpbmcgYXQ6ICoqJHtyc01lc3NhZ2UuU3RhcnREYXRlfSoqXFxuTGFzdCB1cGRhdGU6ICoke1xuICAgICAgICAgICAgICByc01lc3NhZ2UuVXBkYXRlZEF0XG4gICAgICAgICAgICB9KmA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyc01lc3NhZ2UuQ291bnRkb3duID09PSBudWxsKSB7XG4gICAgICAgICAgICBuYW1lID0gYCpOb3QgWWV0IEFpcmVkKmA7XG4gICAgICAgICAgICB2YWx1ZSA9IGBXaWxsIGJlIGFpcmVkIG9uICoqJHtcbiAgICAgICAgICAgICAgcnNNZXNzYWdlLlN0YXJ0RGF0ZVxuICAgICAgICAgICAgfSoqXFxuTGFzdCB1cGRhdGU6ICoke3JzTWVzc2FnZS5VcGRhdGVkQXR9KmA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiRklOSVNIRURcIjpcbiAgICAgICAgICBuYW1lID0gYCpBbHJlYWR5IENvbXBsZXRlZCEqYDtcbiAgICAgICAgICB2YWx1ZSA9IGBBaXJlZDogRnJvbSAqKiR7cnNNZXNzYWdlLlN0YXJ0RGF0ZX0qKiAgdG8gICoqJHtcbiAgICAgICAgICAgIHJzTWVzc2FnZS5FbmREYXRlXG4gICAgICAgICAgfSoqYDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IHJzTWVzc2FnZS5Db2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogcnNNZXNzYWdlLlRodW1ibmFpbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IGAqKioke3JzTWVzc2FnZS5UaXRsZX0qKiogICBgLFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7cnNNZXNzYWdlLklkfS9gLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=