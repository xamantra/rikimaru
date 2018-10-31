import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { QueueData } from "./../../data/queue.data";
import { MediaData } from "./../../data/media.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { MalBindData } from "../../data/mal.sync.data";

export class LogAllFunction implements ICommandFunction {
  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    if (message.author.id === "442621672714010625") {
      UserData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      MediaData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      QueueData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      SubscriptionData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      MalBindData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
    }
  }
}
