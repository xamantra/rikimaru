"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot_1 = require("./core/bot");
const rikimaru_helper_1 = require("./helpers/rikimaru.helper");
const subscription_data_1 = require("./data/subscription.data");
const media_data_1 = require("./data/media.data");
const user_data_1 = require("./data/user.data");
const data_helper_1 = require("./helpers/data.helper");
const client_1 = require("./core/client");
const manager_command_1 = require("./command/manager.command");
const message_handler_1 = require("./handlers/message.handler");
const http = __importStar(require("http"));
// OpenShiftUptimer.Log(true);
// OpenShiftUptimer.AutoConfigure();
bot_1.Bot.Init();
client_1.ClientManager.Init(new discord_js_1.Client());
message_handler_1.MessageHandler.Init();
manager_command_1.CommandManager.Init();
rikimaru_helper_1.RikimaruHelper.Init();
data_helper_1.DataHelper.Init();
user_data_1.UserData.Init();
media_data_1.MediaData.Init();
subscription_data_1.SubscriptionData.Init();
http
    .createServer(function (req, res) {
    res.write("Hello! I am Rikimaru!");
    res.end();
})
    .listen(8080);
setTimeout(() => {
    media_data_1.MediaData.LoadFromApi();
}, 1000);
//# sourceMappingURL=index.js.map