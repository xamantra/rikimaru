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
            responseMessage = new response_message_model_1.ResponseMessage(media.id, media.idMal, color, media.coverImage.large, title_helper_1.TitleHelper.Get(media.title), media.type, status, media.episodes, next, countdown, lastUpdate, time_helper_1.TimeHelper.YearMonthDay(start.year, start.month, start.day), time_helper_1.TimeHelper.YearMonthDay(end.year, end.month, end.day));
            resolve(responseMessage);
        });
    }
}
exports.ResponseMessageHelper = ResponseMessageHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UubWVzc2FnZS5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9yZXNwb25zZS5tZXNzYWdlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLDZFQUFtRTtBQUNuRSxpREFBNkM7QUFDN0MsK0NBQTJDO0FBRTNDLE1BQWEscUJBQXFCO0lBQ3pCLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFhO1FBQ3RFLE9BQU8sSUFBSSxPQUFPLENBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RELElBQUksZUFBZ0MsQ0FBQztZQUNyQyxJQUFJLGlCQUFxQyxDQUFDO1lBQzFDLElBQUksSUFBWSxDQUFDO1lBQ2pCLElBQUksS0FBWSxDQUFDO1lBQ2pCLElBQUksR0FBVSxDQUFDO1lBQ2YsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDO1lBQzdCLE1BQU0sVUFBVSxHQUFHLHdCQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN6QjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQzFCLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO2dCQUNwQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVDLElBQUksaUJBQWlCLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDbkMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxlQUFlLEtBQUssSUFBSSxFQUFFO29CQUM5QyxTQUFTLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JFO2FBQ0Y7WUFDRCxlQUFlLEdBQUcsSUFBSSx3Q0FBZSxDQUNuQyxLQUFLLENBQUMsRUFBRSxFQUNSLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxFQUNMLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUN0QiwwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQzVCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsTUFBTSxFQUNOLEtBQUssQ0FBQyxRQUFRLEVBQ2QsSUFBSSxFQUNKLFNBQVMsRUFDVCxVQUFVLEVBQ1Ysd0JBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDM0Qsd0JBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDdEQsQ0FBQztZQUNGLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNDRCxzREEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJTWVkaWEsXG4gIElEYXRlLFxuICBJTmV4dEFpcmluZ0VwaXNvZGVcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFJlc3BvbnNlTWVzc2FnZSB9IGZyb20gXCIuLi9tb2RlbHMvcmVzcG9uc2UubWVzc2FnZS5tb2RlbFwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IFRpbWVIZWxwZXIgfSBmcm9tIFwiLi90aW1lLmhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VNZXNzYWdlSGVscGVyIHtcbiAgcHVibGljIHN0YXRpYyBDcmVhdGVNZXNzYWdlKG1lZGlhOiBJTWVkaWEsIHN0YXR1czogc3RyaW5nLCBjb2xvcjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlc3BvbnNlTWVzc2FnZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlTWVzc2FnZTogUmVzcG9uc2VNZXNzYWdlO1xuICAgICAgbGV0IG5leHRBaXJpbmdFcGlzb2RlOiBJTmV4dEFpcmluZ0VwaXNvZGU7XG4gICAgICBsZXQgbmV4dDogbnVtYmVyO1xuICAgICAgbGV0IHN0YXJ0OiBJRGF0ZTtcbiAgICAgIGxldCBlbmQ6IElEYXRlO1xuICAgICAgbGV0IGNvdW50ZG93bjogc3RyaW5nID0gbnVsbDtcbiAgICAgIGNvbnN0IGxhc3RVcGRhdGUgPSBUaW1lSGVscGVyLkVsYXBzZWQobWVkaWEudXBkYXRlZEF0KTtcbiAgICAgIGlmIChtZWRpYS5zdGFydERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgc3RhcnQgPSBtZWRpYS5zdGFydERhdGU7XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEuZW5kRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICBlbmQgPSBtZWRpYS5lbmREYXRlO1xuICAgICAgfVxuICAgICAgaWYgKG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlICE9PSBudWxsKSB7XG4gICAgICAgIG5leHRBaXJpbmdFcGlzb2RlID0gbWVkaWEubmV4dEFpcmluZ0VwaXNvZGU7XG4gICAgICAgIGlmIChuZXh0QWlyaW5nRXBpc29kZS5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgbmV4dCA9IG5leHRBaXJpbmdFcGlzb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZyAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvdW50ZG93biA9IFRpbWVIZWxwZXIuQ291bnRkb3duKG5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoXG4gICAgICAgIG1lZGlhLmlkLFxuICAgICAgICBtZWRpYS5pZE1hbCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG1lZGlhLmNvdmVySW1hZ2UubGFyZ2UsXG4gICAgICAgIFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSksXG4gICAgICAgIG1lZGlhLnR5cGUsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgbWVkaWEuZXBpc29kZXMsXG4gICAgICAgIG5leHQsXG4gICAgICAgIGNvdW50ZG93bixcbiAgICAgICAgbGFzdFVwZGF0ZSxcbiAgICAgICAgVGltZUhlbHBlci5ZZWFyTW9udGhEYXkoc3RhcnQueWVhciwgc3RhcnQubW9udGgsIHN0YXJ0LmRheSksXG4gICAgICAgIFRpbWVIZWxwZXIuWWVhck1vbnRoRGF5KGVuZC55ZWFyLCBlbmQubW9udGgsIGVuZC5kYXkpXG4gICAgICApO1xuICAgICAgcmVzb2x2ZShyZXNwb25zZU1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=