import { QueueData } from "./data/queue.data";
import { Client } from "discord.js";
import { SubscriptionData } from "./data/subscription.data";
import { MediaData } from "./data/media.data";
import { UserData } from "./data/user.data";
import { DataHelper } from "./helpers/data.helper";
import { ClientManager } from "./core/client";
import { CommandManager } from "./command/manager.command";
import { MessageHandler } from "./handlers/message.handler";
import { OpenShiftUptimer } from "./others/openshift";
import { Scheduler } from "./core/scheduler";

class App {
  static _instance: App;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public Run() {
    DataHelper.Instance.Init().then(() => {
      UserData.Init()
        .then(() => {
          QueueData.Init()
            .then(() => {
              MediaData.Init()
                .then(() => {
                  SubscriptionData.Init()
                    .then(() => {
                      Scheduler.LoopJob(0, 15, 0, () => {
                        MediaData.LoadFromApi();
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
        })
        .catch((err: Error) => {
          console.log(err.message);
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
