"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./data/queue.data");
const subscription_data_1 = require("./data/subscription.data");
const user_data_1 = require("./data/user.data");
const client_1 = require("./core/client");
const manager_command_1 = require("./command/manager.command");
const message_handler_1 = require("./handlers/message.handler");
const openshift_1 = require("./others/openshift");
const scheduler_1 = require("./core/scheduler");
const presence_1 = require("./core/presence");
const mal_bind_data_1 = require("./data/mal.bind.data");
const anime_cache_1 = require("./core/anime.cache");
const config_1 = require("./core/config");
class App {
    constructor() {
        this.RefreshRate = config_1.Config.QUEUE_REFRESH_RATE;
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    async Run() {
        await user_data_1.UserData.Init();
        await queue_data_1.QueueData.Init();
        await subscription_data_1.SubscriptionData.Init();
        await mal_bind_data_1.MalBindData.Init();
        await presence_1.BotPresence.Init();
        await queue_data_1.QueueData.Sync();
        anime_cache_1.AnimeCache.Update();
        scheduler_1.Scheduler.LoopJob(0, this.RefreshRate, 0, async () => {
            console.log(`Refreshing Data (Runs every: ${this.RefreshRate} mins.)`);
            await queue_data_1.QueueData.Init();
            await presence_1.BotPresence.Init();
            await queue_data_1.QueueData.Sync();
        });
    }
}
openshift_1.OpenShiftUptimer.Log(true);
openshift_1.OpenShiftUptimer.AutoConfigure();
client_1.ClientManager.Init();
message_handler_1.MessageHandler.Init();
manager_command_1.CommandManager.Init();
App.Instance.Run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBOEM7QUFDOUMsZ0VBQTREO0FBQzVELGdEQUE0QztBQUM1QywwQ0FBOEM7QUFDOUMsK0RBQTJEO0FBQzNELGdFQUE0RDtBQUM1RCxrREFBc0Q7QUFDdEQsZ0RBQTZDO0FBQzdDLDhDQUE4QztBQUM5Qyx3REFBbUQ7QUFDbkQsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUV2QyxNQUFNLEdBQUc7SUFBVDtRQUVVLGdCQUFXLEdBQUcsZUFBTSxDQUFDLGtCQUFrQixDQUFDO0lBb0JsRCxDQUFDO0lBbkJRLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRztRQUNkLE1BQU0sb0JBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixNQUFNLDJCQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxzQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2Qix3QkFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxJQUFJLENBQUMsV0FBVyxTQUFTLENBQUMsQ0FBQztZQUN2RSxNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsTUFBTSxzQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELDRCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQiw0QkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUVqQyxzQkFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLGdDQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEIsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBDb21tYW5kTWFuYWdlciB9IGZyb20gXCIuL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kXCI7XG5pbXBvcnQgeyBNZXNzYWdlSGFuZGxlciB9IGZyb20gXCIuL2hhbmRsZXJzL21lc3NhZ2UuaGFuZGxlclwiO1xuaW1wb3J0IHsgT3BlblNoaWZ0VXB0aW1lciB9IGZyb20gXCIuL290aGVycy9vcGVuc2hpZnRcIjtcbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCIuL2NvcmUvc2NoZWR1bGVyXCI7XG5pbXBvcnQgeyBCb3RQcmVzZW5jZSB9IGZyb20gXCIuL2NvcmUvcHJlc2VuY2VcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29yZS9jb25maWdcIjtcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIF9pbnN0YW5jZTogQXBwO1xuICBwcml2YXRlIFJlZnJlc2hSYXRlID0gQ29uZmlnLlFVRVVFX1JFRlJFU0hfUkFURTtcbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIFJ1bigpIHtcbiAgICBhd2FpdCBVc2VyRGF0YS5Jbml0KCk7XG4gICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKTtcbiAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluaXQoKTtcbiAgICBhd2FpdCBNYWxCaW5kRGF0YS5Jbml0KCk7XG4gICAgYXdhaXQgQm90UHJlc2VuY2UuSW5pdCgpO1xuICAgIGF3YWl0IFF1ZXVlRGF0YS5TeW5jKCk7XG4gICAgQW5pbWVDYWNoZS5VcGRhdGUoKTtcbiAgICBTY2hlZHVsZXIuTG9vcEpvYigwLCB0aGlzLlJlZnJlc2hSYXRlLCAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVmcmVzaGluZyBEYXRhIChSdW5zIGV2ZXJ5OiAke3RoaXMuUmVmcmVzaFJhdGV9IG1pbnMuKWApO1xuICAgICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKTtcbiAgICAgIGF3YWl0IEJvdFByZXNlbmNlLkluaXQoKTtcbiAgICAgIGF3YWl0IFF1ZXVlRGF0YS5TeW5jKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuT3BlblNoaWZ0VXB0aW1lci5Mb2codHJ1ZSk7XG5PcGVuU2hpZnRVcHRpbWVyLkF1dG9Db25maWd1cmUoKTtcblxuQ2xpZW50TWFuYWdlci5Jbml0KCk7XG5NZXNzYWdlSGFuZGxlci5Jbml0KCk7XG5Db21tYW5kTWFuYWdlci5Jbml0KCk7XG5cbkFwcC5JbnN0YW5jZS5SdW4oKTtcbiJdfQ==