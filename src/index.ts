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
import { MalBindData } from "./data/mal.sync.data";

class App {
  static _instance: App;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public Run() {
    UserData.Init()
      .then(() => {
        QueueData.Init()
          .then(() => {
            SubscriptionData.Init()
              .then(() => {
                MalBindData.Init().then(() => {
                  MediaData.Init()
                    .then(() => {
                      Scheduler.LoopJob(0, 10, 0, () => {
                        console.log(`Refreshing Data....`);
                        QueueData.Init().then(() => {
                          MediaData.Init().then(() => {
                            BotPresence.Set();
                          });
                        });
                      });
                    })
                    .catch((err: Error) => {
                      console.log(err.message);
                    });
                });
              })
              .catch((err: Error) => {
                console.log(err.message);
              });
          })
          .catch((err: Error) => {
            console.log(err.message);
          });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }
}

OpenShiftUptimer.Log(true);
OpenShiftUptimer.AutoConfigure();

ClientManager.Init(new Client()).catch(err => {
  console.log(err);
});
MessageHandler.Init();
CommandManager.Init();

App.Instance.Run();
