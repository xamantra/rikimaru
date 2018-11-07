"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const media_data_1 = require("./../../data/media.data");
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
            anime_cache_1.AnimeCache.Log();
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9mdW5jdGlvbnMvbG9nYWxsLmNvbW1hbmQuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3REFBb0Q7QUFDcEQsd0RBQW9EO0FBR3BELG9EQUFnRDtBQUNoRCxvRUFBZ0U7QUFDaEUsNERBQXVEO0FBQ3ZELHdEQUFvRDtBQUVwRCxNQUFhLGNBQWM7SUFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFpQixFQUFFLE9BQWtCLEVBQUUsRUFBWTtRQUN0RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLG9CQUFvQixFQUFFO1lBQzlDLE1BQU0sb0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTtnQkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLHNCQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxzQkFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sb0NBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBYSxFQUFFLEVBQUU7Z0JBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSwyQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO2dCQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUNILHdCQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDO0NBQ0Y7QUFyQkQsd0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLy4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2dBbGxGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBpZiAobWVzc2FnZS5hdXRob3IuaWQgPT09IFwiNDQyNjIxNjcyNzE0MDEwNjI1XCIpIHtcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkxvZ0FsbCgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgTWVkaWFEYXRhLkxvZ0FsbCgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUXVldWVEYXRhLkxvZ0FsbCgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5Mb2dBbGwoKS5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IE1hbEJpbmREYXRhLkxvZ0FsbCgpLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgQW5pbWVDYWNoZS5Mb2coKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==