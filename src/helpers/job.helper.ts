import { Scheduler } from "../core/scheduler";
import { ClientManager } from "./../core/client";
import { TitleHelper } from "./title.helper";
import { UserData } from "../data/user.data";
import { SubscriptionData } from "../data/subscription.data";
import { IMedia } from "../interfaces/page.interface";
import { Queue } from "../models/subscription.model";

export class JobHelper {
  public static async Run(media: IMedia, queue: Queue) {
    const users = ClientManager.GetClient.users;
    const title = await TitleHelper.Get(media.title);
    await users.forEach(async x => {
      await UserData.All.forEach(u => {
        SubscriptionData.Exists(media.idMal, u.Id, e => {
          if (e === true) {
            x.send(
              `***${title}***  \`Episode ${
                queue.NextEpisode
              }\` has been aired!!`
            );
          }
        });
      });
    });
  }
}
