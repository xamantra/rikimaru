import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { QueueData } from "./../../data/queue.data";
import { MediaData } from "./../../data/media.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";

export class LogAllFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    if (message.author.id === "442621672714010625") {
      UserData.Instance.LogAll()
        .then(() => {
          MediaData.Instance.LogAll()
            .then(() => {
              QueueData.Instance.LogAll()
                .then(() => {
                  SubscriptionData.Instance.LogAll().catch((reason: Error) => {
                    console.log(reason.message);
                  });
                })
                .catch((reason: Error) => {
                  console.log(reason.message);
                });
            })
            .catch((reason: Error) => {
              console.log(reason.message);
            });
        })
        .catch((reason: Error) => {
          console.log(reason.message);
        });
    }
  }
}
