"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./data/queue.data");
const discord_js_1 = require("discord.js");
const subscription_data_1 = require("./data/subscription.data");
const media_data_1 = require("./data/media.data");
const user_data_1 = require("./data/user.data");
const data_helper_1 = require("./helpers/data.helper");
const client_1 = require("./core/client");
const manager_command_1 = require("./command/manager.command");
const message_handler_1 = require("./handlers/message.handler");
const openshift_1 = require("./others/openshift");
const scheduler_1 = require("./core/scheduler");
class App {
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    Run() {
        data_helper_1.DataHelper.Instance.Init().then(() => {
            user_data_1.UserData.Init()
                .then(() => {
                queue_data_1.QueueData.Init()
                    .then(() => {
                    subscription_data_1.SubscriptionData.Init()
                        .then(() => {
                        media_data_1.MediaData.Init()
                            .then(() => {
                            scheduler_1.Scheduler.LoopJob(0, 1, 0, () => {
                                console.log(`Refreshing Data....`);
                                queue_data_1.QueueData.Init().then(() => {
                                    media_data_1.MediaData.Init();
                                });
                            });
                        })
                            .catch((err) => {
                            console.log(err.message);
                        });
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                })
                    .catch((err) => {
                    console.log(err.message);
                });
            })
                .catch((err) => {
                console.log(err.message);
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
//# sourceMappingURL=index.js.map