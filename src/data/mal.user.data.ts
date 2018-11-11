import { MAL } from "../core/mal";
import { MalAnime } from "../models/mal.anime.model";
import { MalBindData } from "./mal.bind.data";
import { Message } from "discord.js";
import { Subscription } from "../models/subscription.model";
import { malbind } from "../command/commands";

export class MalUserData {
  public static GetUser(message: Message) {
    return new Promise<MalAnime[]>(async (resolve, reject) => {
      const malBind = await MalBindData.Get(message.author.id);
      if (malbind === null) {
        resolve(null);
      }
      const list = await MAL.GetCWList(malBind.MalUsername);
      if (list === null) {
        resolve(null);
      }
      resolve(list);
    });
  }

  public static Exists(message: Message, sub: Subscription) {
    return new Promise<boolean>((resolve, reject) => {
      this.GetUser(message)
        .then(list => {
          const malAnime = list.find(ma => ma.anime_id === sub.MediaId);
          if (malAnime === null || malAnime === undefined) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
