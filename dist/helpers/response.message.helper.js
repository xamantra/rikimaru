"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_message_model_1 = require("../models/response.message.model");
const title_helper_1 = require("./title.helper");
const time_helper_1 = require("./time.helper");
class ResponseMessageHelper {
    static CreateMessage(media, status, color) {
        return new Promise((resolve, reject) => {
            let responseMessage;
            let nextAiringEpisode;
            let next;
            let start;
            let end;
            let countdown = null;
            const lastUpdate = time_helper_1.TimeHelper.Elapsed(media.updatedAt);
            if (media.startDate !== null) {
                start = media.startDate;
            }
            if (media.endDate !== null) {
                end = media.endDate;
            }
            if (media.nextAiringEpisode !== null) {
                nextAiringEpisode = media.nextAiringEpisode;
                if (nextAiringEpisode.next !== null) {
                    next = nextAiringEpisode.next;
                }
                if (nextAiringEpisode.timeUntilAiring !== null) {
                    countdown = time_helper_1.TimeHelper.Countdown(nextAiringEpisode.timeUntilAiring);
                }
            }
            responseMessage = new response_message_model_1.ResponseMessage(media.idMal, color, media.coverImage.large, title_helper_1.TitleHelper.Get(media.title), media.type, status, media.episodes, next, countdown, lastUpdate, time_helper_1.TimeHelper.YearMonthDay(start.year, start.month, start.day), time_helper_1.TimeHelper.YearMonthDay(end.year, end.month, end.day));
            resolve(responseMessage);
        });
    }
}
exports.ResponseMessageHelper = ResponseMessageHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UubWVzc2FnZS5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9yZXNwb25zZS5tZXNzYWdlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDZFQUFtRTtBQUNuRSxpREFBNkM7QUFDN0MsK0NBQTJDO0FBRTNDLE1BQWEscUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFhO1FBQ3RFLE9BQU8sSUFBSSxPQUFPLENBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RELElBQUksZUFBZ0MsQ0FBQztZQUNyQyxJQUFJLGlCQUFxQyxDQUFDO1lBQzFDLElBQUksSUFBWSxDQUFDO1lBQ2pCLElBQUksS0FBWSxDQUFDO1lBQ2pCLElBQUksR0FBVSxDQUFDO1lBQ2YsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sVUFBVSxHQUFHLHdCQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN6QjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQzFCLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVDLElBQUksaUJBQWlCLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDbkMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO29CQUM5QyxTQUFTLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JFO2FBQ0Y7WUFDRCxlQUFlLEdBQUcsSUFBSSx3Q0FBZSxDQUNuQyxLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssRUFDTCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDdEIsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUM1QixLQUFLLENBQUMsSUFBSSxFQUNWLE1BQU0sRUFDTixLQUFLLENBQUMsUUFBUSxFQUNkLElBQUksRUFDSixTQUFTLEVBQ1QsVUFBVSxFQUNWLHdCQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzNELHdCQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQ3RELENBQUM7WUFDRixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQ0Qsc0RBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJTWVkaWEsXHJcbiAgSURhdGUsXHJcbiAgSU5leHRBaXJpbmdFcGlzb2RlXHJcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VNZXNzYWdlIH0gZnJvbSBcIi4uL21vZGVscy9yZXNwb25zZS5tZXNzYWdlLm1vZGVsXCI7XHJcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4vdGl0bGUuaGVscGVyXCI7XHJcbmltcG9ydCB7IFRpbWVIZWxwZXIgfSBmcm9tIFwiLi90aW1lLmhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3BvbnNlTWVzc2FnZUhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyBDcmVhdGVNZXNzYWdlKG1lZGlhOiBJTWVkaWEsIHN0YXR1czogc3RyaW5nLCBjb2xvcjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UmVzcG9uc2VNZXNzYWdlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCByZXNwb25zZU1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZTtcclxuICAgICAgbGV0IG5leHRBaXJpbmdFcGlzb2RlOiBJTmV4dEFpcmluZ0VwaXNvZGU7XHJcbiAgICAgIGxldCBuZXh0OiBudW1iZXI7XHJcbiAgICAgIGxldCBzdGFydDogSURhdGU7XHJcbiAgICAgIGxldCBlbmQ6IElEYXRlO1xyXG4gICAgICBsZXQgY291bnRkb3duOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICBjb25zdCBsYXN0VXBkYXRlID0gVGltZUhlbHBlci5FbGFwc2VkKG1lZGlhLnVwZGF0ZWRBdCk7XHJcbiAgICAgIGlmIChtZWRpYS5zdGFydERhdGUgIT09IG51bGwpIHtcclxuICAgICAgICBzdGFydCA9IG1lZGlhLnN0YXJ0RGF0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWVkaWEuZW5kRGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVuZCA9IG1lZGlhLmVuZERhdGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgbmV4dEFpcmluZ0VwaXNvZGUgPSBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZTtcclxuICAgICAgICBpZiAobmV4dEFpcmluZ0VwaXNvZGUubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgbmV4dCA9IG5leHRBaXJpbmdFcGlzb2RlLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgIGNvdW50ZG93biA9IFRpbWVIZWxwZXIuQ291bnRkb3duKG5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoXHJcbiAgICAgICAgbWVkaWEuaWRNYWwsXHJcbiAgICAgICAgY29sb3IsXHJcbiAgICAgICAgbWVkaWEuY292ZXJJbWFnZS5sYXJnZSxcclxuICAgICAgICBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpLFxyXG4gICAgICAgIG1lZGlhLnR5cGUsXHJcbiAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgIG1lZGlhLmVwaXNvZGVzLFxyXG4gICAgICAgIG5leHQsXHJcbiAgICAgICAgY291bnRkb3duLFxyXG4gICAgICAgIGxhc3RVcGRhdGUsXHJcbiAgICAgICAgVGltZUhlbHBlci5ZZWFyTW9udGhEYXkoc3RhcnQueWVhciwgc3RhcnQubW9udGgsIHN0YXJ0LmRheSksXHJcbiAgICAgICAgVGltZUhlbHBlci5ZZWFyTW9udGhEYXkoZW5kLnllYXIsIGVuZC5tb250aCwgZW5kLmRheSlcclxuICAgICAgKTtcclxuICAgICAgcmVzb2x2ZShyZXNwb25zZU1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==