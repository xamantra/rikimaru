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

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.Embed(message).then(async embed => {
      if (dm === true) {
        await message.author.send(embed);
      } else {
        await message.reply(embed);
      }
    });
  }

  private async Embed(message: Message) {
    const mediaData = MediaData.Instance;
    const userData = UserData.Instance;
    const subsData = SubscriptionData.Instance;
    let mentionId: string = null;
    if (message.mentions.members.size === 1) {
      mentionId = message.mentions.members.first().id;
    }
    const discordId: string =
      mentionId === null ? message.author.id : mentionId;
    const client = ClientManager.GetClient;
    const list: any[] = [];
    const mediaSubs: IMedia[] = [];
    const mediaList = mediaData.GetMediaList;
    userData
      .GetUser(discordId)
      .then(user => {
        subsData.All.forEach(async sub => {
          if (user.Id === sub.UserId) {
            await mediaSubs.push(mediaList.find(x => x.idMal === sub.MediaId));
          }
        });
      })
      .catch((reason: Error) => {
        console.log(reason.message);
      });

    await mediaSubs.forEach(async media => {
      const title = TitleHelper.Get(media.title);
      const episode = media.nextAiringEpisode.next;
      const countdown = await TimeHelper.Countdown(
        media.nextAiringEpisode.timeUntilAiring
      );
      await list.push({
        name: `\n:tv:  ***${title}***`,
        value: `:alarm_clock:  \`Episode ${episode} : ${countdown}\` - [MAL Link](https://myanimelist.net/anime/${
          media.idMal
        }/)\n  -`
      });
    });
    const embed = {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: message.author.avatarURL
        },
        title: `***${message.author.username}***'s *Subscription List*`,
        description: `**${
          mediaSubs.length
        } Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
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
