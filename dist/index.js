"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./data/queue.data");
const discord_js_1 = require("discord.js");
const subscription_data_1 = require("./data/subscription.data");
const media_data_1 = require("./data/media.data");
const user_data_1 = require("./data/user.data");
const client_1 = require("./core/client");
const manager_command_1 = require("./command/manager.command");
const message_handler_1 = require("./handlers/message.handler");
const openshift_1 = require("./others/openshift");
const scheduler_1 = require("./core/scheduler");
const presence_1 = require("./core/presence");
const mal_bind_data_1 = require("./data/mal.bind.data");
const anime_cache_1 = require("./core/anime.cache");
class App {
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    async Run() {
        await user_data_1.UserData.Init().catch(err => {
            console.log(err);
        });
        await queue_data_1.QueueData.Init().catch(err => {
            console.log(err);
        });
        await subscription_data_1.SubscriptionData.Init().catch(err => {
            console.log(err);
        });
        await mal_bind_data_1.MalBindData.Init().catch(err => {
            console.log(err);
        });
        await media_data_1.MediaData.Init().catch(err => {
            console.log(err);
        });
        await presence_1.BotPresence.Init().catch(err => {
            console.log(err);
        });
        anime_cache_1.AnimeCache.Update(0);
        scheduler_1.Scheduler.LoopJob(0, 10, 0, async () => {
            console.log(`Refreshing Data....`);
            await queue_data_1.QueueData.Init().catch(err => {
                console.log(err);
            });
            await media_data_1.MediaData.Init().catch(err => {
                console.log(err);
            });
            await presence_1.BotPresence.Init().catch(err => {
                console.log(err);
            });
        });
    }
}
openshift_1.OpenShiftUptimer.Log(true);
openshift_1.OpenShiftUptimer.AutoConfigure();
client_1.ClientManager.Init(new discord_js_1.Client());
message_handler_1.MessageHandler.Init();
manager_command_1.CommandManager.Init();
App.Instance.Run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBOEM7QUFDOUMsMkNBQW9DO0FBQ3BDLGdFQUE0RDtBQUM1RCxrREFBOEM7QUFDOUMsZ0RBQTRDO0FBQzVDLDBDQUE4QztBQUM5QywrREFBMkQ7QUFDM0QsZ0VBQTREO0FBQzVELGtEQUFzRDtBQUN0RCxnREFBNkM7QUFDN0MsOENBQThDO0FBQzlDLHdEQUFtRDtBQUNuRCxvREFBZ0Q7QUFFaEQsTUFBTSxHQUFHO0lBRUEsTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxvQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sMkJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sc0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILHdCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sc0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELDRCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQiw0QkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUVqQyxzQkFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLGdDQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEIsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vZGF0YS9xdWV1ZS5kYXRhXCI7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XHJcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuL2RhdGEvbWVkaWEuZGF0YVwiO1xyXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDb21tYW5kTWFuYWdlciB9IGZyb20gXCIuL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvbWVzc2FnZS5oYW5kbGVyXCI7XHJcbmltcG9ydCB7IE9wZW5TaGlmdFVwdGltZXIgfSBmcm9tIFwiLi9vdGhlcnMvb3BlbnNoaWZ0XCI7XHJcbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCIuL2NvcmUvc2NoZWR1bGVyXCI7XHJcbmltcG9ydCB7IEJvdFByZXNlbmNlIH0gZnJvbSBcIi4vY29yZS9wcmVzZW5jZVwiO1xyXG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuL2RhdGEvbWFsLmJpbmQuZGF0YVwiO1xyXG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4vY29yZS9hbmltZS5jYWNoZVwiO1xyXG5cclxuY2xhc3MgQXBwIHtcclxuICBzdGF0aWMgX2luc3RhbmNlOiBBcHA7XHJcbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgUnVuKCkge1xyXG4gICAgYXdhaXQgVXNlckRhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFF1ZXVlRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgTWFsQmluZERhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IE1lZGlhRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgQm90UHJlc2VuY2UuSW5pdCgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9KTtcclxuICAgIEFuaW1lQ2FjaGUuVXBkYXRlKDApO1xyXG4gICAgU2NoZWR1bGVyLkxvb3BKb2IoMCwgMTAsIDAsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYFJlZnJlc2hpbmcgRGF0YS4uLi5gKTtcclxuICAgICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBNZWRpYURhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IEJvdFByZXNlbmNlLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5PcGVuU2hpZnRVcHRpbWVyLkxvZyh0cnVlKTtcclxuT3BlblNoaWZ0VXB0aW1lci5BdXRvQ29uZmlndXJlKCk7XHJcblxyXG5DbGllbnRNYW5hZ2VyLkluaXQobmV3IENsaWVudCgpKTtcclxuTWVzc2FnZUhhbmRsZXIuSW5pdCgpO1xyXG5Db21tYW5kTWFuYWdlci5Jbml0KCk7XHJcblxyXG5BcHAuSW5zdGFuY2UuUnVuKCk7XHJcbiJdfQ==