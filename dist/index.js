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
        await presence_1.BotPresence.Set().catch(err => {
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
            await presence_1.BotPresence.Set().catch(err => {
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
