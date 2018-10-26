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
      const client = ClientManager.GetClient;
      const list: any[] = [];
      const mediaSubs: IMedia[] = [];
      const mediaList = MediaData.GetMediaList;
      UserData.GetUser(discordId)
        .then(user => {
          SubscriptionData.GetUserSubs(user.Id).then(subs => {
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
                name: `\n***${title}***`,
                value: `\`Episode ${episode} : ${countdown}\` - [MAL Link](https://myanimelist.net/anime/${
                  media.idMal
                }/)\n-------------------------------------------------------------------`
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
            resolve(embed);
          });
        })
        .catch((reason: Error) => {
          MediaResult.SendInfo(
            message,
            `You haven't subscribe to anything yet!\nType the command \`-subscribe anime title or keyword here\` to subscribe.`,
            dm
          );
          console.log(reason.message);
        });
    });
  }
}
