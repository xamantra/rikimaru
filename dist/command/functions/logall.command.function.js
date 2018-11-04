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
