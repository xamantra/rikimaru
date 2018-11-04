"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const user_data_1 = require("../../data/user.data");
const media_list_handler_1 = require("../../handlers/media.list.handler");
const search_list_1 = require("../../core/search.list");
const title_helper_1 = require("../../helpers/title.helper");
const sender_1 = require("./../../core/sender");
const subscription_model_1 = require("../../models/subscription.model");
class UnsubFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        const title = command.Parameter;
        let media = [];
        const discordId = message.author.id;
        const userMedia = [];
        const filteredMedia = [];
        const formattedResults = [];
        const user = await user_data_1.UserData.GetUser(discordId).catch((reason) => {
            console.log(reason.message);
            sender_1.Sender.Send(message, `System Error!, I couldn't apprehend, please try again later.`, dm);
        });
        if (user instanceof subscription_model_1.User === false)
            return;
        media_search_1.MediaSearch.All(command.Parameter)
            .then(async (res) => {
            media = res;
            await subscription_data_1.SubscriptionData.All.forEach(async (sub) => {
                if (sub.UserId === user.Id) {
                    await userMedia.push(sub.MediaId);
                }
            });
            await media.forEach(async (m) => {
                if (userMedia.includes(m.idMal)) {
                    await filteredMedia.push(m);
                    await formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
                }
            });
            if (filteredMedia.length === 0) {
                sender_1.Sender.SendInfo(message, `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`, dm);
            }
            else if (filteredMedia.length === 1) {
                await subscription_data_1.SubscriptionData.Delete(filteredMedia[0].idMal, discordId);
                sender_1.Sender.SendInfo(message, `You are now unsubscribed from  ***${title_helper_1.TitleHelper.Get(filteredMedia[0].title)}***`, dm);
            }
            else {
                const embed = await search_list_1.SearchList.Embed(message, command, formattedResults);
                sender_1.Sender.SendInfo(message, embed, dm);
            }
        })
            .catch(() => {
            sender_1.Sender.Send(message, `Ge mo nasai! I didn't find anime that matches your keyword \`${command.Parameter}\``, dm);
            console.warn(`Error while searching : [MediaSearch.All(${command.Parameter})]`);
        });
    }
}
exports.UnsubFunction = UnsubFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zdWIuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy91bnN1Yi5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNERBQXdEO0FBQ3hELHNFQUFrRTtBQUlsRSxvREFBZ0Q7QUFDaEQsMEVBQXVFO0FBQ3ZFLHdEQUFvRDtBQUNwRCw2REFBeUQ7QUFDekQsZ0RBQTZDO0FBQzdDLHdFQUF1RDtBQUV2RCxNQUFhLGFBQWE7SUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FDbEIsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixNQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7UUFDbkMsTUFBTSxnQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFDbkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtZQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixlQUFNLENBQUMsSUFBSSxDQUNULE9BQU8sRUFDUCw4REFBOEQsRUFDOUQsRUFBRSxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxZQUFZLHlCQUFJLEtBQUssS0FBSztZQUFFLE9BQU87UUFDM0MsMEJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUMvQixJQUFJLENBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ2hCLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDWixNQUFNLG9DQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUM3QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQU0sSUFBYSxDQUFDLEVBQUUsRUFBRTtvQkFDcEMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUU7Z0JBQzVCLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsdUNBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixlQUFNLENBQUMsUUFBUSxDQUNiLE9BQU8sRUFDUCx1RkFBdUYsS0FBSyxNQUFNLEVBQ2xHLEVBQUUsQ0FDSCxDQUFDO2FBQ0g7aUJBQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckMsTUFBTSxvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDakUsZUFBTSxDQUFDLFFBQVEsQ0FDYixPQUFPLEVBQ1AscUNBQXFDLDBCQUFXLENBQUMsR0FBRyxDQUNsRCxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUN2QixLQUFLLEVBQ04sRUFBRSxDQUNILENBQUM7YUFDSDtpQkFBTTtnQkFDTCxNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFVLENBQUMsS0FBSyxDQUNsQyxPQUFPLEVBQ1AsT0FBTyxFQUNQLGdCQUFnQixDQUNqQixDQUFDO2dCQUNGLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDVixlQUFNLENBQUMsSUFBSSxDQUNULE9BQU8sRUFDUCxnRUFDRSxPQUFPLENBQUMsU0FDVixJQUFJLEVBQ0osRUFBRSxDQUNILENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUNWLDRDQUE0QyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQ2xFLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQTVFRCxzQ0E0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi8uLi8uLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xyXG5pbXBvcnQgeyBNZWRpYUZvcm1hdEhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vaGFuZGxlcnMvbWVkaWEubGlzdC5oYW5kbGVyXCI7XHJcbmltcG9ydCB7IFNlYXJjaExpc3QgfSBmcm9tIFwiLi4vLi4vY29yZS9zZWFyY2gubGlzdFwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi8uLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbnN1YkZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUoXHJcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcclxuICAgIGRtPzogYm9vbGVhblxyXG4gICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5TZWFyY2gobWVzc2FnZSwgY29tbWFuZCwgZG0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBTZWFyY2gobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCB0aXRsZSA9IGNvbW1hbmQuUGFyYW1ldGVyO1xyXG4gICAgbGV0IG1lZGlhOiBJTWVkaWFbXSA9IFtdO1xyXG4gICAgY29uc3QgZGlzY29yZElkID0gbWVzc2FnZS5hdXRob3IuaWQ7XHJcbiAgICBjb25zdCB1c2VyTWVkaWE6IG51bWJlcltdID0gW107XHJcbiAgICBjb25zdCBmaWx0ZXJlZE1lZGlhOiBJTWVkaWFbXSA9IFtdO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkUmVzdWx0czogYW55W10gPSBbXTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xyXG4gICAgICBTZW5kZXIuU2VuZChcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIGBTeXN0ZW0gRXJyb3IhLCBJIGNvdWxkbid0IGFwcHJlaGVuZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5gLFxyXG4gICAgICAgIGRtXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcclxuICAgIE1lZGlhU2VhcmNoLkFsbChjb21tYW5kLlBhcmFtZXRlcilcclxuICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcclxuICAgICAgICBtZWRpYSA9IHJlcztcclxuICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkFsbC5mb3JFYWNoKGFzeW5jIHN1YiA9PiB7XHJcbiAgICAgICAgICBpZiAoc3ViLlVzZXJJZCA9PT0gKHVzZXIgYXMgVXNlcikuSWQpIHtcclxuICAgICAgICAgICAgYXdhaXQgdXNlck1lZGlhLnB1c2goc3ViLk1lZGlhSWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IG1lZGlhLmZvckVhY2goYXN5bmMgbSA9PiB7XHJcbiAgICAgICAgICBpZiAodXNlck1lZGlhLmluY2x1ZGVzKG0uaWRNYWwpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGZpbHRlcmVkTWVkaWEucHVzaChtKTtcclxuICAgICAgICAgICAgYXdhaXQgZm9ybWF0dGVkUmVzdWx0cy5wdXNoKE1lZGlhRm9ybWF0SGFuZGxlci5HZXQobSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChmaWx0ZXJlZE1lZGlhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgU2VuZGVyLlNlbmRJbmZvKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBgSG1tLi5JdCBzZWVtcyB0aGF0IHlvdSBhcmUgbm90IHN1YnNjcmliZSB0byBhbnkgYW5pbWUgdGhhdCBtYXRjaGVzIHlvdXIga2V5d29yZCAgKioqJHt0aXRsZX0qKiouYCxcclxuICAgICAgICAgICAgZG1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXJlZE1lZGlhLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5EZWxldGUoZmlsdGVyZWRNZWRpYVswXS5pZE1hbCwgZGlzY29yZElkKTtcclxuICAgICAgICAgIFNlbmRlci5TZW5kSW5mbyhcclxuICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgYFlvdSBhcmUgbm93IHVuc3Vic2NyaWJlZCBmcm9tICAqKioke1RpdGxlSGVscGVyLkdldChcclxuICAgICAgICAgICAgICBmaWx0ZXJlZE1lZGlhWzBdLnRpdGxlXHJcbiAgICAgICAgICAgICl9KioqYCxcclxuICAgICAgICAgICAgZG1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgU2VhcmNoTGlzdC5FbWJlZChcclxuICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgY29tbWFuZCxcclxuICAgICAgICAgICAgZm9ybWF0dGVkUmVzdWx0c1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIFNlbmRlci5TZW5kSW5mbyhtZXNzYWdlLCBlbWJlZCwgZG0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICBTZW5kZXIuU2VuZChcclxuICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICBgR2UgbW8gbmFzYWkhIEkgZGlkbid0IGZpbmQgYW5pbWUgdGhhdCBtYXRjaGVzIHlvdXIga2V5d29yZCBcXGAke1xyXG4gICAgICAgICAgICBjb21tYW5kLlBhcmFtZXRlclxyXG4gICAgICAgICAgfVxcYGAsXHJcbiAgICAgICAgICBkbVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgYEVycm9yIHdoaWxlIHNlYXJjaGluZyA6IFtNZWRpYVNlYXJjaC5BbGwoJHtjb21tYW5kLlBhcmFtZXRlcn0pXWBcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19