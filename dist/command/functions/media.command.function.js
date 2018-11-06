"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_result_1 = require("../../core/media.result");
const media_handler_1 = require("../../handlers/media.handler");
const response_message_helper_1 = require("../../helpers/response.message.helper");
const sender_1 = require("../../core/sender");
const anime_cache_1 = require("../../core/anime.cache");
class MediaFunction {
    constructor() { }
    async Execute(message, command, dm) {
        await this.Handle(message, command, dm);
    }
    async Handle(message, command, isDM) {
        const color = message.member.highestRole.color;
        anime_cache_1.AnimeCache.Search(command.Parameter)
            .then(results => {
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(results);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(results);
            const unreleasedNoDate = media_handler_1.MediaHandler.UnreleasedNoDateMedia(results);
            const completed = media_handler_1.MediaHandler.CompletedMedia(results);
            const exactMedia = media_handler_1.MediaHandler.ExactMedia(results, command.Parameter);
            if (exactMedia.length > 0) {
                exactMedia.forEach(async (m) => {
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                });
            }
            else if (ongoing.length > 0) {
                if (ongoing.length === 1) {
                    const m = ongoing[0];
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                }
                else {
                    this.SendManyResult(message, command, isDM, ongoing.length, `currently ongoing. Please try to be more specific.`);
                }
            }
            else if (unreleased.length > 0) {
                if (unreleased.length === 1) {
                    const m = unreleased[0];
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                }
                else {
                    this.SendManyResult(message, command, isDM, unreleased.length, `not yet aired. Please try to be more specific.`);
                }
            }
            else if (unreleasedNoDate.length > 0) {
                if (unreleasedNoDate.length === 1) {
                    const m = unreleasedNoDate[0];
                    response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                        media_result_1.MediaResult.SendMessage(message, isDM, response);
                    });
                }
                else {
                    this.SendManyResult(message, command, isDM, unreleasedNoDate.length, `not yet aired. Please try to be more specific.`);
                }
            }
            else if (completed.length > 0) {
                if (completed.length === 1) {
                    completed.forEach(async (m) => {
                        response_message_helper_1.ResponseMessageHelper.CreateMessage(m, m.status, color).then(response => {
                            media_result_1.MediaResult.SendMessage(message, isDM, response);
                        });
                    });
                }
                else {
                    this.SendManyResult(message, command, isDM, completed.length, `already completed.`);
                }
            }
            else {
                sender_1.Sender.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            }
        })
            .catch(() => {
            sender_1.Sender.SendInfo(message, `Go me nasai!, I didn't find anime that matches your keyword ***"${command.Parameter}"***, try checking your spelling or another keyword.`, isDM);
            console.warn(`Error while searching : [MediaSearch.All(${command.Parameter})]`);
        });
    }
    SendManyResult(message, command, isDM, length, type) {
        sender_1.Sender.SendInfo(message, `I found ***${length}*** anime with your keyword ***${command.Parameter}*** and all of them is ${type}`, isDM);
    }
}
exports.MediaFunction = MediaFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy9tZWRpYS5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsMERBQXNEO0FBQ3RELGdFQUE0RDtBQUM1RCxtRkFBOEU7QUFFOUUsOENBQTJDO0FBQzNDLHdEQUFvRDtBQUVwRCxNQUFhLGFBQWE7SUFDeEIsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxPQUFpQixFQUFFLElBQWE7UUFDcEUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQy9DLHdCQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQUcsNEJBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsTUFBTSxVQUFVLEdBQUcsNEJBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsTUFBTSxnQkFBZ0IsR0FBRyw0QkFBWSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sU0FBUyxHQUFHLDRCQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sVUFBVSxHQUFHLDRCQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkUsSUFBSSxVQUFV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QUMsSUFBSSxDQUMxRCxRQUFRLENBQUMsRUFBRTs0QkFDVCwwQkFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDLENBQ0YsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsY0FBYyxDQUNqQixPQUFPLEVBQ1AsT0FBTyxFQUNQLElBQUksRUFDSixTQUFTLENBQUMsTUFBTSxFQUNoQixvQkFBb0IsQ0FDckIsQ0FBQztpQkFDSDthQUNGO2lCQUFNO2dCQUNMLGVBQU0sQ0FBQyxRQUFRLENBQ2IsT0FBTyxFQUNQLG1FQUNFLE9BQU8sQ0FBQyxTQUNWLHNEQUFzRCxFQUN0RCxJQUFJLENBQ0wsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLGVBQU0sQ0FBQyxRQUFRLENBQ2IsT0FBTyxFQUNQLG1FQUNFLE9BQU8sQ0FBQyxTQUNWLHNEQUFzRCxFQUN0RCxJQUFJLENBQ0wsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQ1YsNENBQTRDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FDbEUsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGNBQWMsQ0FDcEIsT0FBZ0IsRUFDaEIsT0FBaUIsRUFDakIsSUFBYSxFQUNiLE1BQWMsRUFDZCxJQUFZO1FBRVosZUFBTSxDQUFDLFFBQVEsQ0FDYixPQUFPLEVBQ1AsY0FBYyxNQUFNLGtDQUNsQixPQUFPLENBQUMsU0FDViwwQkFBMEIsSUFBSSxFQUFFLEVBQ2hDLElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBcklELHNDQXFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4vLi4vLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVkaWFSZXN1bHQgfSBmcm9tIFwiLi4vLi4vY29yZS9tZWRpYS5yZXN1bHRcIjtcclxuaW1wb3J0IHsgTWVkaWFIYW5kbGVyIH0gZnJvbSBcIi4uLy4uL2hhbmRsZXJzL21lZGlhLmhhbmRsZXJcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VNZXNzYWdlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvcmVzcG9uc2UubWVzc2FnZS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcclxuICAgIGF3YWl0IHRoaXMuSGFuZGxlKG1lc3NhZ2UsIGNvbW1hbmQsIGRtKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBIYW5kbGUobWVzc2FnZTogTWVzc2FnZSwgY29tbWFuZDogSUNvbW1hbmQsIGlzRE06IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGNvbG9yID0gbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3I7XHJcbiAgICBBbmltZUNhY2hlLlNlYXJjaChjb21tYW5kLlBhcmFtZXRlcilcclxuICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgY29uc3Qgb25nb2luZyA9IE1lZGlhSGFuZGxlci5PbmdvaW5nTWVkaWEocmVzdWx0cyk7XHJcbiAgICAgICAgY29uc3QgdW5yZWxlYXNlZCA9IE1lZGlhSGFuZGxlci5VbnJlbGVhc2VkTWVkaWEocmVzdWx0cyk7XHJcbiAgICAgICAgY29uc3QgdW5yZWxlYXNlZE5vRGF0ZSA9IE1lZGlhSGFuZGxlci5VbnJlbGVhc2VkTm9EYXRlTWVkaWEocmVzdWx0cyk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVkID0gTWVkaWFIYW5kbGVyLkNvbXBsZXRlZE1lZGlhKHJlc3VsdHMpO1xyXG4gICAgICAgIGNvbnN0IGV4YWN0TWVkaWEgPSBNZWRpYUhhbmRsZXIuRXhhY3RNZWRpYShyZXN1bHRzLCBjb21tYW5kLlBhcmFtZXRlcik7XHJcblxyXG4gICAgICAgIGlmIChleGFjdE1lZGlhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGV4YWN0TWVkaWEuZm9yRWFjaChhc3luYyBtID0+IHtcclxuICAgICAgICAgICAgUmVzcG9uc2VNZXNzYWdlSGVscGVyLkNyZWF0ZU1lc3NhZ2UobSwgbS5zdGF0dXMsIGNvbG9yKS50aGVuKFxyXG4gICAgICAgICAgICAgIHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIE1lZGlhUmVzdWx0LlNlbmRNZXNzYWdlKG1lc3NhZ2UsIGlzRE0sIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9uZ29pbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgaWYgKG9uZ29pbmcubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG0gPSBvbmdvaW5nWzBdO1xyXG4gICAgICAgICAgICBSZXNwb25zZU1lc3NhZ2VIZWxwZXIuQ3JlYXRlTWVzc2FnZShtLCBtLnN0YXR1cywgY29sb3IpLnRoZW4oXHJcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgTWVkaWFSZXN1bHQuU2VuZE1lc3NhZ2UobWVzc2FnZSwgaXNETSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VuZE1hbnlSZXN1bHQoXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBjb21tYW5kLFxyXG4gICAgICAgICAgICAgIGlzRE0sXHJcbiAgICAgICAgICAgICAgb25nb2luZy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgYGN1cnJlbnRseSBvbmdvaW5nLiBQbGVhc2UgdHJ5IHRvIGJlIG1vcmUgc3BlY2lmaWMuYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodW5yZWxlYXNlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAodW5yZWxlYXNlZC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgbSA9IHVucmVsZWFzZWRbMF07XHJcbiAgICAgICAgICAgIFJlc3BvbnNlTWVzc2FnZUhlbHBlci5DcmVhdGVNZXNzYWdlKG0sIG0uc3RhdHVzLCBjb2xvcikudGhlbihcclxuICAgICAgICAgICAgICByZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBNZWRpYVJlc3VsdC5TZW5kTWVzc2FnZShtZXNzYWdlLCBpc0RNLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5TZW5kTWFueVJlc3VsdChcclxuICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgIGNvbW1hbmQsXHJcbiAgICAgICAgICAgICAgaXNETSxcclxuICAgICAgICAgICAgICB1bnJlbGVhc2VkLmxlbmd0aCxcclxuICAgICAgICAgICAgICBgbm90IHlldCBhaXJlZC4gUGxlYXNlIHRyeSB0byBiZSBtb3JlIHNwZWNpZmljLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHVucmVsZWFzZWROb0RhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgaWYgKHVucmVsZWFzZWROb0RhdGUubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG0gPSB1bnJlbGVhc2VkTm9EYXRlWzBdO1xyXG4gICAgICAgICAgICBSZXNwb25zZU1lc3NhZ2VIZWxwZXIuQ3JlYXRlTWVzc2FnZShtLCBtLnN0YXR1cywgY29sb3IpLnRoZW4oXHJcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgTWVkaWFSZXN1bHQuU2VuZE1lc3NhZ2UobWVzc2FnZSwgaXNETSwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2VuZE1hbnlSZXN1bHQoXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBjb21tYW5kLFxyXG4gICAgICAgICAgICAgIGlzRE0sXHJcbiAgICAgICAgICAgICAgdW5yZWxlYXNlZE5vRGF0ZS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgYG5vdCB5ZXQgYWlyZWQuIFBsZWFzZSB0cnkgdG8gYmUgbW9yZSBzcGVjaWZpYy5gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb21wbGV0ZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgaWYgKGNvbXBsZXRlZC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgY29tcGxldGVkLmZvckVhY2goYXN5bmMgbSA9PiB7XHJcbiAgICAgICAgICAgICAgUmVzcG9uc2VNZXNzYWdlSGVscGVyLkNyZWF0ZU1lc3NhZ2UobSwgbS5zdGF0dXMsIGNvbG9yKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBNZWRpYVJlc3VsdC5TZW5kTWVzc2FnZShtZXNzYWdlLCBpc0RNLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlNlbmRNYW55UmVzdWx0KFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgY29tbWFuZCxcclxuICAgICAgICAgICAgICBpc0RNLFxyXG4gICAgICAgICAgICAgIGNvbXBsZXRlZC5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgYGFscmVhZHkgY29tcGxldGVkLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmRJbmZvKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBgR28gbWUgbmFzYWkhLCBJIGRpZG4ndCBmaW5kIGFuaW1lIHRoYXQgbWF0Y2hlcyB5b3VyIGtleXdvcmQgKioqXCIke1xyXG4gICAgICAgICAgICAgIGNvbW1hbmQuUGFyYW1ldGVyXHJcbiAgICAgICAgICAgIH1cIioqKiwgdHJ5IGNoZWNraW5nIHlvdXIgc3BlbGxpbmcgb3IgYW5vdGhlciBrZXl3b3JkLmAsXHJcbiAgICAgICAgICAgIGlzRE1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgIFNlbmRlci5TZW5kSW5mbyhcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBgR28gbWUgbmFzYWkhLCBJIGRpZG4ndCBmaW5kIGFuaW1lIHRoYXQgbWF0Y2hlcyB5b3VyIGtleXdvcmQgKioqXCIke1xyXG4gICAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxyXG4gICAgICAgICAgfVwiKioqLCB0cnkgY2hlY2tpbmcgeW91ciBzcGVsbGluZyBvciBhbm90aGVyIGtleXdvcmQuYCxcclxuICAgICAgICAgIGlzRE1cclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgIGBFcnJvciB3aGlsZSBzZWFyY2hpbmcgOiBbTWVkaWFTZWFyY2guQWxsKCR7Y29tbWFuZC5QYXJhbWV0ZXJ9KV1gXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNlbmRNYW55UmVzdWx0KFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ6IElDb21tYW5kLFxyXG4gICAgaXNETTogYm9vbGVhbixcclxuICAgIGxlbmd0aDogbnVtYmVyLFxyXG4gICAgdHlwZTogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBTZW5kZXIuU2VuZEluZm8oXHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGBJIGZvdW5kICoqKiR7bGVuZ3RofSoqKiBhbmltZSB3aXRoIHlvdXIga2V5d29yZCAqKioke1xyXG4gICAgICAgIGNvbW1hbmQuUGFyYW1ldGVyXHJcbiAgICAgIH0qKiogYW5kIGFsbCBvZiB0aGVtIGlzICR7dHlwZX1gLFxyXG4gICAgICBpc0RNXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=