"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const mal_bind_data_1 = require("../../data/mal.bind.data");
const anime_cache_1 = require("../../core/anime.cache");
class LogAllFunction {
    async Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            await user_data_1.UserData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            await queue_data_1.QueueData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            await subscription_data_1.SubscriptionData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            await mal_bind_data_1.MalBindData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            anime_cache_1.AnimeCache.Log();
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvbG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBb0Q7QUFHcEQsb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw0REFBdUQ7QUFDdkQsd0RBQW9EO0FBRXBELE1BQWEsY0FBYztJQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7WUFDOUMsTUFBTSxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sc0JBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLG9DQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sMkJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCx3QkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGO0FBbEJELHdDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcblxuZXhwb3J0IGNsYXNzIExvZ0FsbEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIHB1YmxpYyBhc3luYyBFeGVjdXRlKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGlmIChtZXNzYWdlLmF1dGhvci5pZCA9PT0gXCI0NDI2MjE2NzI3MTQwMTA2MjVcIikge1xuICAgICAgYXdhaXQgVXNlckRhdGEuTG9nQWxsKCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBRdWV1ZURhdGEuTG9nQWxsKCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkxvZ0FsbCgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgTWFsQmluZERhdGEuTG9nQWxsKCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICBBbmltZUNhY2hlLkxvZygpO1xuICAgIH1cbiAgfVxufVxuIl19