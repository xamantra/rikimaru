import { MAL } from "../core/mal";
import { MalAnime } from "../models/mal.anime.model";
import { MalBindData } from "./mal.bind.data";
import { Message } from "discord.js";
import { Subscription } from "../models/subscription.model";

export class MalUserData {
  public static GetUser(message: Message) {
    return new Promise<MalAnime[]>((resolve, reject) => {
      MalBindData.Get(message.author.id)
        .then(malBind => {
          MAL.GetCWList(malBind.MalUsername)
            .then(list => {
              resolve(list);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
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
