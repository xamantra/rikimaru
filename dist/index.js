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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBOEM7QUFDOUMsMkNBQW9DO0FBQ3BDLGdFQUE0RDtBQUM1RCxrREFBOEM7QUFDOUMsZ0RBQTRDO0FBQzVDLDBDQUE4QztBQUM5QywrREFBMkQ7QUFDM0QsZ0VBQTREO0FBQzVELGtEQUFzRDtBQUN0RCxnREFBNkM7QUFDN0MsOENBQThDO0FBQzlDLHdEQUFtRDtBQUVuRCxNQUFNLEdBQUc7SUFFQSxNQUFNLEtBQUssUUFBUTtRQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUc7UUFDZCxNQUFNLG9CQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLG9DQUFnQixDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSwyQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxzQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gscUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxzQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsNEJBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLDRCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDO0FBRWpDLHNCQUFhLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQU0sRUFBRSxDQUFDLENBQUM7QUFDakMsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QixnQ0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi9kYXRhL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vZGF0YS9tZWRpYS5kYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4vZGF0YS91c2VyLmRhdGFcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IENvbW1hbmRNYW5hZ2VyIH0gZnJvbSBcIi4vY29tbWFuZC9tYW5hZ2VyLmNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTWVzc2FnZUhhbmRsZXIgfSBmcm9tIFwiLi9oYW5kbGVycy9tZXNzYWdlLmhhbmRsZXJcIjtcclxuaW1wb3J0IHsgT3BlblNoaWZ0VXB0aW1lciB9IGZyb20gXCIuL290aGVycy9vcGVuc2hpZnRcIjtcclxuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSBcIi4vY29yZS9zY2hlZHVsZXJcIjtcclxuaW1wb3J0IHsgQm90UHJlc2VuY2UgfSBmcm9tIFwiLi9jb3JlL3ByZXNlbmNlXCI7XHJcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gIHN0YXRpYyBfaW5zdGFuY2U6IEFwcDtcclxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBSdW4oKSB7XHJcbiAgICBhd2FpdCBVc2VyRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBNYWxCaW5kRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgTWVkaWFEYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBCb3RQcmVzZW5jZS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgU2NoZWR1bGVyLkxvb3BKb2IoMCwgMTAsIDAsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coYFJlZnJlc2hpbmcgRGF0YS4uLi5gKTtcclxuICAgICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBNZWRpYURhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IEJvdFByZXNlbmNlLkluaXQoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5PcGVuU2hpZnRVcHRpbWVyLkxvZyh0cnVlKTtcclxuT3BlblNoaWZ0VXB0aW1lci5BdXRvQ29uZmlndXJlKCk7XHJcblxyXG5DbGllbnRNYW5hZ2VyLkluaXQobmV3IENsaWVudCgpKTtcclxuTWVzc2FnZUhhbmRsZXIuSW5pdCgpO1xyXG5Db21tYW5kTWFuYWdlci5Jbml0KCk7XHJcblxyXG5BcHAuSW5zdGFuY2UuUnVuKCk7XHJcbiJdfQ==