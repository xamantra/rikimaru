import { ICommandFunction } from "../../interfaces/command.function.interface";
import { UserData } from "./../../data/user.data";
import { SubscriptionData } from "./../../data/subscription.data";
import { MediaData } from "./../../data/media.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { TitleHelper } from "../../helpers/title.helper";
import { TimeHelper } from "../../helpers/time.helper";
import { Color } from "../../core/colors";
import { ClientManager } from "../../core/client";
import { IMedia } from "../../interfaces/page.interface";

export class ViewSubsFunction implements ICommandFunction {
  constructor() {}

  public Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    dm
      ? message.author.send(this.Embed(message))
      : message.reply(this.Embed(message));
  }

  private Embed(message: Message) {
    let mentionId: string = null;
    if (message.mentions.members.size === 1) {
      mentionId = message.mentions.members.first().id;
    }
    const discordId: string =
      mentionId === null ? message.author.id : mentionId;
    console.log(discordId);
    const client = ClientManager.GetClient;
    const list: any[] = [];
    const userId = UserData.All.find(x => x.DiscordId === discordId).Id;
    const mediaSubs: IMedia[] = [];
    const mediaList = MediaData.GetMediaList;
    SubscriptionData.All.forEach(sub => {
      if (userId === sub.UserId) {
        mediaSubs.push(mediaList.find(x => x.idMal === sub.MediaId));
      }
    });
    mediaSubs.forEach(media => {
      const title = TitleHelper.Get(media.title);
      const episode = media.nextAiringEpisode.next;
      const countdown = TimeHelper.Countdown(
        media.nextAiringEpisode.timeUntilAiring
      );
      list.push({
        name: `\n***[${title}](https://myanimelist.net/anime/${
          media.idMal
        }/)***`,
        value: `*Episode ${episode} :* **${countdown}**\n|`
      });
    });
    const embed = {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: message.author.avatarURL
        },
        title: `***${message.author.username}***'s *Subscription List*`,
        description: `**${mediaSubs.length} Anime**`,
        fields: list,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Rikimaru"
        }
      }
    };
    return embed;
  }
}
