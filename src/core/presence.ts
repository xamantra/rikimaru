import { MediaData } from "../data/media.data";
import { TitleHelper } from "../helpers/title.helper";
import { ClientManager } from "./client";
import { Game, DiscordAPIError } from "discord.js";
import { Random } from "../helpers/random.helper";
export class BotPresence {
  private static MusicType = ["Ending Song of", "Opening Song of"];

  public static Set() {
    return new Promise(async (resolve, reject) => {
      const media = await MediaData.GetRandom();
      const title = TitleHelper.Get(media.title);
      const action = Random.Range(2, 3);
      let musicType = "";
      if (action === 2) {
        musicType = this.MusicType[Random.Range(0, 1)];
      }
      const client = await ClientManager.GetClient();
      client.user
        .setActivity(`${musicType} ${title}`, { type: action })
        .then(presence => {
          resolve();
        })
        .catch((err: DiscordAPIError) => {
          console.log(err.name);
        });
    });
  }
}
