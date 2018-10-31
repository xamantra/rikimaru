"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const mal_sync_data_1 = require("../../data/mal.sync.data");
class LogAllFunction {
    async Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            user_data_1.UserData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            media_data_1.MediaData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            queue_data_1.QueueData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            subscription_data_1.SubscriptionData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
            mal_sync_data_1.MalBindData.LogAll().catch((reason) => {
                console.log(reason.message);
            });
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=logall.command.function.js.map