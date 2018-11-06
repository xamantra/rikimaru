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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UubWVzc2FnZS5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9yZXNwb25zZS5tZXNzYWdlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDZFQUFtRTtBQUNuRSxpREFBNkM7QUFDN0MsK0NBQTJDO0FBRTNDLE1BQWEscUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFhO1FBQ3RFLE9BQU8sSUFBSSxPQUFPLENBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RELElBQUksZUFBZ0MsQ0FBQztZQUNyQyxJQUFJLGlCQUFxQyxDQUFDO1lBQzFDLElBQUksSUFBWSxDQUFDO1lBQ2pCLElBQUksS0FBWSxDQUFDO1lBQ2pCLElBQUksR0FBVSxDQUFDO1lBQ2YsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sVUFBVSxHQUFHLHdCQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN6QjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQzFCLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVDLElBQUksaUJBQWlCLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDbkMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO29CQUM5QyxTQUFTLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JFO2FBQ0Y7WUFDRCxlQUFlLEdBQUcsSUFBSSx3Q0FBZSxDQUNuQyxLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssRUFDTCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFDdEIsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUM1QixLQUFLLENBQUMsSUFBSSxFQUNWLE1BQU0sRUFDTixLQUFLLENBQUMsUUFBUSxFQUNkLElBQUksRUFDSixTQUFTLEVBQ1QsVUFBVSxFQUNWLHdCQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzNELHdCQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQ3RELENBQUM7WUFDRixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQ0Qsc0RBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSU1lZGlhLFxuICBJRGF0ZSxcbiAgSU5leHRBaXJpbmdFcGlzb2RlXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBSZXNwb25zZU1lc3NhZ2UgfSBmcm9tIFwiLi4vbW9kZWxzL3Jlc3BvbnNlLm1lc3NhZ2UubW9kZWxcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4vdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4vdGltZS5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIFJlc3BvbnNlTWVzc2FnZUhlbHBlciB7XG4gIHB1YmxpYyBzdGF0aWMgQ3JlYXRlTWVzc2FnZShtZWRpYTogSU1lZGlhLCBzdGF0dXM6IHN0cmluZywgY29sb3I6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZXNwb25zZU1lc3NhZ2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCByZXNwb25zZU1lc3NhZ2U6IFJlc3BvbnNlTWVzc2FnZTtcbiAgICAgIGxldCBuZXh0QWlyaW5nRXBpc29kZTogSU5leHRBaXJpbmdFcGlzb2RlO1xuICAgICAgbGV0IG5leHQ6IG51bWJlcjtcbiAgICAgIGxldCBzdGFydDogSURhdGU7XG4gICAgICBsZXQgZW5kOiBJRGF0ZTtcbiAgICAgIGxldCBjb3VudGRvd246IHN0cmluZyA9IG51bGw7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlID0gVGltZUhlbHBlci5FbGFwc2VkKG1lZGlhLnVwZGF0ZWRBdCk7XG4gICAgICBpZiAobWVkaWEuc3RhcnREYXRlICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXJ0ID0gbWVkaWEuc3RhcnREYXRlO1xuICAgICAgfVxuICAgICAgaWYgKG1lZGlhLmVuZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgZW5kID0gbWVkaWEuZW5kRGF0ZTtcbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZSAhPT0gbnVsbCkge1xuICAgICAgICBuZXh0QWlyaW5nRXBpc29kZSA9IG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlO1xuICAgICAgICBpZiAobmV4dEFpcmluZ0VwaXNvZGUubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgIG5leHQgPSBuZXh0QWlyaW5nRXBpc29kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICBjb3VudGRvd24gPSBUaW1lSGVscGVyLkNvdW50ZG93bihuZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKFxuICAgICAgICBtZWRpYS5pZE1hbCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG1lZGlhLmNvdmVySW1hZ2UubGFyZ2UsXG4gICAgICAgIFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSksXG4gICAgICAgIG1lZGlhLnR5cGUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgbWVkaWEuZXBpc29kZXMsXG4gICAgICAgIG5leHQsXG4gICAgICAgIGNvdW50ZG93bixcbiAgICAgICAgbGFzdFVwZGF0ZSxcbiAgICAgICAgVGltZUhlbHBlci5ZZWFyTW9udGhEYXkoc3RhcnQueWVhciwgc3RhcnQubW9udGgsIHN0YXJ0LmRheSksXG4gICAgICAgIFRpbWVIZWxwZXIuWWVhck1vbnRoRGF5KGVuZC55ZWFyLCBlbmQubW9udGgsIGVuZC5kYXkpXG4gICAgICApO1xuICAgICAgcmVzb2x2ZShyZXNwb25zZU1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=