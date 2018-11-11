import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { QueueData } from "./../../data/queue.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { UserData } from "../../data/user.data";
import { SubscriptionData } from "../../data/subscription.data";
import { MalBindData } from "../../data/mal.bind.data";
import { AnimeCache } from "../../core/anime.cache";

export class LogAllFunction implements ICommandFunction {
  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    if (message.author.id === "442621672714010625") {
      await UserData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      await QueueData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      await SubscriptionData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      await MalBindData.LogAll().catch((reason: Error) => {
        console.log(reason.message);
      });
      AnimeCache.Log();
    }
  }
}
