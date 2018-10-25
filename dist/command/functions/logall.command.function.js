"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
class LogAllFunction {
    Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            user_data_1.UserData.Instance.LogAll()
                .then(() => {
                media_data_1.MediaData.Instance.LogAll()
                    .then(() => {
                    queue_data_1.QueueData.Instance.LogAll()
                        .then(() => {
                        subscription_data_1.SubscriptionData.Instance.LogAll().catch((reason) => {
                            console.log(reason.message);
                        });
                    })
                        .catch((reason) => {
                        console.log(reason.message);
                    });
                })
                    .catch((reason) => {
                    console.log(reason.message);
                });
            })
                .catch((reason) => {
                console.log(reason.message);
            });
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=logall.command.function.js.map