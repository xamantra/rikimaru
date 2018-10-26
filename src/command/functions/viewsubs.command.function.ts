import { ICommandFunction } from "../../interfaces/command.function.interface";
import { UserData } from "./../../data/user.data";
import { SubscriptionData } from "./../../data/subscription.data";
import { MediaData } from "./../../data/media.data";
import { Message, User } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { TitleHelper } from "../../helpers/title.helper";
import { TimeHelper } from "../../helpers/time.helper";
import { Color } from "../../core/colors";
import { ClientManager } from "../../core/client";
import { IMedia } from "../../interfaces/page.interface";
import { MediaResult } from "../../core/media.result";

export class ViewSubsFunction implements ICommandFunction {
  constructor() {}

  public Execute(message?: Message, command?: ICommand, dm?: boolean) {
    this.Embed(message, dm).then(async embed => {
      if (dm === true) {
        message.author.send(embed);
      } else {
        message.reply(embed);
      }
    });
  }

  private async Embed(message: Message, dm: boolean) {
    return new Promise<any>((resolve, reject) => {
      let mentionId: string = null;
      if (message.mentions.members.size === 1) {
        mentionId = message.mentions.members.first().id;
      }
      const discordId: string =
        mentionId === null ? message.author.id : mentionId;
      const list: any[] = [];
      const mediaSubs: IMedia[] = [];
      const mediaList = MediaData.GetMediaList;
      ClientManager.GetUser(discordId).then(user => {
        UserData.GetUser(discordId)
          .then(u => {
            SubscriptionData.GetUserSubs(u.Id).then(subs => {
              subs.forEach(sub => {
                const media = mediaList.find(x => x.idMal === sub.MediaId);
                mediaSubs.push(media);
              });
              mediaSubs.forEach(async media => {
                const title = TitleHelper.Get(media.title);
                const episode = media.nextAiringEpisode.next;
                const countdown = await TimeHelper.Countdown(
                  media.nextAiringEpisode.timeUntilAiring
                );
                await list.push({
                  name: `\n${title}\nhttps://myanimelist.net/anime/${
                    media.idMal
                  }/`,
                  value: `*Episode ${episode} :* ***${countdown}***\n-------------------------------------------------------------------`
                });
              });
              resolve(this.EmbedTemplate(user, mediaSubs, list));
            });
          })
          .catch((reason: Error) => {
            resolve(this.EmbedTemplate(user, mediaSubs, list));
            console.log(reason.message);
          });
      });
    });
  }

  private EmbedTemplate(user: User, mediaSubs: IMedia[], list: any[]) {
    const client = ClientManager.GetClient;
    return {
      embed: {
        color: Color.Random,
        thumbnail: {
          url: user.avatarURL
        },
        title: `***${user.username}***'s *Subscription List*`,
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
  }
}
