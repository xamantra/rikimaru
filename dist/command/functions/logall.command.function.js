"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const mal_bind_data_1 = require("../../data/mal.bind.data");
class LogAllFunction {
    async Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            await user_data_1.UserData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            await media_data_1.MediaData.LogAll().catch((reason) => {
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
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvbG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBb0Q7QUFDcEQsd0RBQW9EO0FBR3BELG9EQUFnRDtBQUNoRCxvRUFBZ0U7QUFDaEUsNERBQXVEO0FBRXZELE1BQWEsY0FBYztJQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7WUFDOUMsTUFBTSxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sc0JBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLHNCQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxvQ0FBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLDJCQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0Y7QUFwQkQsd0NBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLy4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xuXG5leHBvcnQgY2xhc3MgTG9nQWxsRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XG4gICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkID09PSBcIjQ0MjYyMTY3MjcxNDAxMDYyNVwiKSB7XG4gICAgICBhd2FpdCBVc2VyRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IE1lZGlhRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFF1ZXVlRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuTG9nQWxsKCkuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBNYWxCaW5kRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==