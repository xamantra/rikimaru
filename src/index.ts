import { Client } from "discord.js";
import { RikimaruHelper } from "./helpers/rikimaru.helper";
import { SubscriptionData } from "./data/subscription.data";
import { MediaData } from "./data/media.data";
import { UserData } from "./data/user.data";
import { DataHelper } from "./helpers/data.helper";
import { ClientManager } from "./core/client";
import { OpenShiftUptimer } from "./others/openshift";
import { CommandManager } from "./command/manager.command";
import { MessageHandler } from "./handlers/message.handler";

// OpenShiftUptimer.Log(true);
// OpenShiftUptimer.AutoConfigure();

ClientManager.Init(new Client());
MessageHandler.Init();
CommandManager.Init();
RikimaruHelper.Init();
DataHelper.Init();
UserData.Init();
MediaData.Init();
SubscriptionData.Init();

setTimeout(() => {
  MediaData.LoadFromApi();
}, 1000);
