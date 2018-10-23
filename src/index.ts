import { Client } from "discord.js";
import { Bot } from "./core/bot";
import { RikimaruHelper } from "./helpers/rikimaru.helper";
import { SubscriptionData } from "./data/subscription.data";
import { MediaData } from "./data/media.data";
import { UserData } from "./data/user.data";
import { DataHelper } from "./helpers/data.helper";
import { ClientManager } from "./core/client";
import { CommandManager } from "./command/manager.command";
import { MessageHandler } from "./handlers/message.handler";
import { OpenShiftUptimer } from "./others/openshift";
import * as http from "http";

// OpenShiftUptimer.Log(true);
// OpenShiftUptimer.AutoConfigure();

Bot.Init();
ClientManager.Init(new Client());
MessageHandler.Init();
CommandManager.Init();
RikimaruHelper.Init();
DataHelper.Init();
UserData.Init();
MediaData.Init();
SubscriptionData.Init();

http
  .createServer(function(req, res) {
    res.write("Hello! I am Rikimaru!");
    res.end();
  })
  .listen(process.env.PORT || 8080);

setTimeout(() => {
  MediaData.LoadFromApi();
}, 1000);
