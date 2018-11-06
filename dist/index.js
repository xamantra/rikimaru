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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBOEM7QUFDOUMsMkNBQW9DO0FBQ3BDLGdFQUE0RDtBQUM1RCxrREFBOEM7QUFDOUMsZ0RBQTRDO0FBQzVDLDBDQUE4QztBQUM5QywrREFBMkQ7QUFDM0QsZ0VBQTREO0FBQzVELGtEQUFzRDtBQUN0RCxnREFBNkM7QUFDN0MsOENBQThDO0FBQzlDLHdEQUFtRDtBQUNuRCxvREFBZ0Q7QUFFaEQsTUFBTSxHQUFHO0lBRUEsTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxvQkFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sMkJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sc0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sc0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILHdCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLHFCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxNQUFNLHNCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sc0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUVELDRCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQiw0QkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUVqQyxzQkFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLGdDQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdEIsZ0NBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBDb21tYW5kTWFuYWdlciB9IGZyb20gXCIuL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kXCI7XG5pbXBvcnQgeyBNZXNzYWdlSGFuZGxlciB9IGZyb20gXCIuL2hhbmRsZXJzL21lc3NhZ2UuaGFuZGxlclwiO1xuaW1wb3J0IHsgT3BlblNoaWZ0VXB0aW1lciB9IGZyb20gXCIuL290aGVycy9vcGVuc2hpZnRcIjtcbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCIuL2NvcmUvc2NoZWR1bGVyXCI7XG5pbXBvcnQgeyBCb3RQcmVzZW5jZSB9IGZyb20gXCIuL2NvcmUvcHJlc2VuY2VcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5jbGFzcyBBcHAge1xuICBzdGF0aWMgX2luc3RhbmNlOiBBcHA7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBSdW4oKSB7XG4gICAgYXdhaXQgVXNlckRhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIGF3YWl0IFF1ZXVlRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgYXdhaXQgTWFsQmluZERhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIGF3YWl0IE1lZGlhRGF0YS5Jbml0KCkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgYXdhaXQgQm90UHJlc2VuY2UuSW5pdCgpLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIEFuaW1lQ2FjaGUuVXBkYXRlKDApO1xuICAgIFNjaGVkdWxlci5Mb29wSm9iKDAsIDEwLCAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVmcmVzaGluZyBEYXRhLi4uLmApO1xuICAgICAgYXdhaXQgUXVldWVEYXRhLkluaXQoKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBNZWRpYURhdGEuSW5pdCgpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IEJvdFByZXNlbmNlLkluaXQoKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuT3BlblNoaWZ0VXB0aW1lci5Mb2codHJ1ZSk7XG5PcGVuU2hpZnRVcHRpbWVyLkF1dG9Db25maWd1cmUoKTtcblxuQ2xpZW50TWFuYWdlci5Jbml0KG5ldyBDbGllbnQoKSk7XG5NZXNzYWdlSGFuZGxlci5Jbml0KCk7XG5Db21tYW5kTWFuYWdlci5Jbml0KCk7XG5cbkFwcC5JbnN0YW5jZS5SdW4oKTtcbiJdfQ==