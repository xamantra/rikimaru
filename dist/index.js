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
const ani_bind_data_1 = require("./data/ani.bind.data");
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
        await ani_bind_data_1.AniBindData.Init();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBOEM7QUFDOUMsZ0VBQTREO0FBQzVELGdEQUE0QztBQUM1QywwQ0FBOEM7QUFDOUMsK0RBQTJEO0FBQzNELGdFQUE0RDtBQUM1RCxrREFBc0Q7QUFDdEQsZ0RBQTZDO0FBQzdDLDhDQUE4QztBQUM5Qyx3REFBbUQ7QUFDbkQsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUN2Qyx3REFBbUQ7QUFFbkQsTUFBTSxHQUFHO0lBQVQ7UUFFVSxnQkFBVyxHQUFHLGVBQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQXFCbEQsQ0FBQztJQXBCUSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUc7UUFDZCxNQUFNLG9CQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sb0NBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsTUFBTSwyQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sMkJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixNQUFNLHNCQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLHdCQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLElBQUksQ0FBQyxXQUFXLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixNQUFNLHNCQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsNEJBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLDRCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDO0FBRWpDLHNCQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckIsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QixnQ0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IENvbW1hbmRNYW5hZ2VyIH0gZnJvbSBcIi4vY29tbWFuZC9tYW5hZ2VyLmNvbW1hbmRcIjtcbmltcG9ydCB7IE1lc3NhZ2VIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvbWVzc2FnZS5oYW5kbGVyXCI7XG5pbXBvcnQgeyBPcGVuU2hpZnRVcHRpbWVyIH0gZnJvbSBcIi4vb3RoZXJzL29wZW5zaGlmdFwiO1xuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSBcIi4vY29yZS9zY2hlZHVsZXJcIjtcbmltcG9ydCB7IEJvdFByZXNlbmNlIH0gZnJvbSBcIi4vY29yZS9wcmVzZW5jZVwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb3JlL2NvbmZpZ1wiO1xuaW1wb3J0IHsgQW5pQmluZERhdGEgfSBmcm9tIFwiLi9kYXRhL2FuaS5iaW5kLmRhdGFcIjtcblxuY2xhc3MgQXBwIHtcbiAgc3RhdGljIF9pbnN0YW5jZTogQXBwO1xuICBwcml2YXRlIFJlZnJlc2hSYXRlID0gQ29uZmlnLlFVRVVFX1JFRlJFU0hfUkFURTtcbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIFJ1bigpIHtcbiAgICBhd2FpdCBVc2VyRGF0YS5Jbml0KCk7XG4gICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKTtcbiAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluaXQoKTtcbiAgICBhd2FpdCBNYWxCaW5kRGF0YS5Jbml0KCk7XG4gICAgYXdhaXQgQW5pQmluZERhdGEuSW5pdCgpO1xuICAgIGF3YWl0IEJvdFByZXNlbmNlLkluaXQoKTtcbiAgICBhd2FpdCBRdWV1ZURhdGEuU3luYygpO1xuICAgIEFuaW1lQ2FjaGUuVXBkYXRlKCk7XG4gICAgU2NoZWR1bGVyLkxvb3BKb2IoMCwgdGhpcy5SZWZyZXNoUmF0ZSwgMCwgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlZnJlc2hpbmcgRGF0YSAoUnVucyBldmVyeTogJHt0aGlzLlJlZnJlc2hSYXRlfSBtaW5zLilgKTtcbiAgICAgIGF3YWl0IFF1ZXVlRGF0YS5Jbml0KCk7XG4gICAgICBhd2FpdCBCb3RQcmVzZW5jZS5Jbml0KCk7XG4gICAgICBhd2FpdCBRdWV1ZURhdGEuU3luYygpO1xuICAgIH0pO1xuICB9XG59XG5cbk9wZW5TaGlmdFVwdGltZXIuTG9nKHRydWUpO1xuT3BlblNoaWZ0VXB0aW1lci5BdXRvQ29uZmlndXJlKCk7XG5cbkNsaWVudE1hbmFnZXIuSW5pdCgpO1xuTWVzc2FnZUhhbmRsZXIuSW5pdCgpO1xuQ29tbWFuZE1hbmFnZXIuSW5pdCgpO1xuXG5BcHAuSW5zdGFuY2UuUnVuKCk7XG4iXX0=