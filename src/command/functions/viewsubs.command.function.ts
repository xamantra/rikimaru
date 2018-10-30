import { ICommandFunction } from "../../interfaces/command.function.interface";
import { UserData } from "./../../data/user.data";
import { SubscriptionData } from "./../../data/subscription.data";
import { MediaData } from "./../../data/media.data";
import { Message, User, DiscordAPIError } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { TitleHelper } from "../../helpers/title.helper";
import { TimeHelper } from "../../helpers/time.helper";
import { Color } from "../../core/colors";
import { ClientManager } from "../../core/client";

export class ViewSubsFunction implements ICommandFunction {
  constructor() {}

  public Execute(message?: Message, command?: ICommand, dm?: boolean) {
    this.Embed(message, dm).then(async embed => {
      if (dm === true) {
        message.author
          .send(embed)
          .then(($m: Message) => {
            console.log(
              `Message <${$m.id}> was sent to <${message.author.username}>.`
            );
          })
          .catch((err: DiscordAPIError) => {
            message.reply(`Oh! it seems that I can't DM you.`);
            console.log(err.name);
          });
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
      ClientManager.GetUser(discordId).then(user => {
        UserData.GetUser(discordId)
          .then(u => {
            SubscriptionData.GetUserSubs(u.Id).then(subs => {
              let iteration = 0;
              subs.forEach(async sub => {
                iteration++;
                MediaData.GetMedia(sub.MediaId)
                  .then($m => {
                    const title = TitleHelper.Get($m.title);
                    const episode = $m.nextAiringEpisode.next;
                    const countdown = TimeHelper.Countdown(
                      $m.nextAiringEpisode.timeUntilAiring
                    );
                    list.push({
                      name: `\n${title}\nhttps://myanimelist.net/anime/${
                        $m.idMal
                      }/`,
                      value: `*Episode ${episode} :* ***${countdown}***\n▬▬▬▬▬▬▬▬▬▬  :small_orange_diamond: :small_orange_diamond: :small_orange_diamond: ▬▬▬▬▬▬▬▬▬▬`
                    });
                    if (iteration === subs.length) {
                      this.EmbedTemplate(message, user, subs.length, list).then(
                        template => {
                          resolve(template);
                        }
                      );
                    }
                  })
                  .catch((err: Error) => {
                    console.log(err.message);
                  });
              });
            });
          })
          .catch((reason: Error) => {
            this.EmbedTemplate(message, user, 0, list).then(template => {
              resolve(template);
            });
            console.log(reason.message);
          });
      });
    });
  }

  private async EmbedTemplate(
    message: Message,
    user: User,
    count: number,
    list: any[]
  ) {
    return new Promise<any>((resolve, reject) => {
      const member = message.guild.members.get(user.id);
      ClientManager.GetClient().then(client => {
        resolve({
          embed: {
            color: member.highestRole.color,
            thumbnail: {
              url: user.avatarURL
            },
            title: `***${user.username}***'s *Subscription List*`,
            description: `**${count} Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
            fields: list,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Rikimaru"
            }
          }
        });
      });
    });
  }
}
