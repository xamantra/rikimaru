import { QueueData } from "./data/queue.data";
import { Client } from "discord.js";
import { SubscriptionData } from "./data/subscription.data";
import { MediaData } from "./data/media.data";
import { UserData } from "./data/user.data";
import { ClientManager } from "./core/client";
import { CommandManager } from "./command/manager.command";
import { MessageHandler } from "./handlers/message.handler";
import { OpenShiftUptimer } from "./others/openshift";
import { Scheduler } from "./core/scheduler";
import { BotPresence } from "./core/presence";
import { MalBindData } from "./data/mal.bind.data";

class App {
  static _instance: App;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async Run() {
    await UserData.Init().catch(err => {
      console.log(err);
    });
    await QueueData.Init().catch(err => {
      console.log(err);
    });
    await SubscriptionData.Init().catch(err => {
      console.log(err);
    });
    await MalBindData.Init().catch(err => {
      console.log(err);
    });
    await MediaData.Init().catch(err => {
      console.log(err);
    });
    await BotPresence.Set().catch(err => {
      console.log(err);
    });
    Scheduler.LoopJob(0, 10, 0, async () => {
      console.log(`Refreshing Data....`);
      await QueueData.Init().catch(err => {
        console.log(err);
      });
      await MediaData.Init().catch(err => {
        console.log(err);
      });
      await BotPresence.Set().catch(err => {
        console.log(err);
      });
    });
  }
}

OpenShiftUptimer.Log(true);
OpenShiftUptimer.AutoConfigure();

ClientManager.Init(new Client());
MessageHandler.Init();
CommandManager.Init();

App.Instance.Run();
