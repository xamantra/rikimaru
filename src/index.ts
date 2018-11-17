import { QueueData } from "./data/queue.data";
import { SubscriptionData } from "./data/subscription.data";
import { UserData } from "./data/user.data";
import { ClientManager } from "./core/client";
import { CommandManager } from "./command/manager.command";
import { MessageHandler } from "./handlers/message.handler";
import { OpenShiftUptimer } from "./others/openshift";
import { Scheduler } from "./core/scheduler";
import { BotPresence } from "./core/presence";
import { MalBindData } from "./data/mal.bind.data";
import { AnimeCache } from "./core/anime.cache";
import { Config } from "./core/config";

class App {
  static _instance: App;
  private RefreshRate = Config.QUEUE_REFRESH_RATE;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public async Run() {
    await UserData.Init();
    await QueueData.Init();
    await SubscriptionData.Init();
    await MalBindData.Init();
    await BotPresence.Init();
    await QueueData.Sync();
    AnimeCache.Update();
    Scheduler.LoopJob(0, this.RefreshRate, 0, async () => {
      console.log(`Refreshing Data (Runs every: ${this.RefreshRate} mins.)`);
      await QueueData.Init();
      await BotPresence.Init();
      await QueueData.Sync();
    });
  }
}

OpenShiftUptimer.Log(true);
OpenShiftUptimer.AutoConfigure();

ClientManager.Init();
MessageHandler.Init();
CommandManager.Init();

App.Instance.Run();
