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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvbG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBb0Q7QUFJcEQsb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw0REFBdUQ7QUFDdkQsd0RBQW9EO0FBRXBELE1BQWEsY0FBYztJQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7WUFDOUMsTUFBTSxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sc0JBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLG9DQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sMkJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCx3QkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGO0FBbEJELHdDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi8uLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5leHBvcnQgY2xhc3MgTG9nQWxsRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XG4gICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBcIjQ0MjYyMTY3MjcxNDAxMDYyNVwiKSB7XG4gICAgICBhd2FpdCBVc2VyRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFF1ZXVlRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuTG9nQWxsKCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBNYWxCaW5kRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIEFuaW1lQ2FjaGUuTG9nKCk7XG4gICAgfVxuICB9XG59XG4iXX0=