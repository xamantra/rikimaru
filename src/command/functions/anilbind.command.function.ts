import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { Sender } from "../../core/sender";
import { Random } from "../../helpers/random.helper";
import { ClientManager } from "../../core/client";
import { UserData } from "../../data/user.data";
import { Config } from "../../core/config";
import { AniBind } from "../../models/ani.bind.model";
import { AniBindData } from "../../data/ani.bind.data";
import { AniList } from "../../core/anilist";
import { JsonHelper } from "../../helpers/json.helper";
import { Root, User } from "../../models/anilist.user.model";
import { NullCheck } from "../../helpers/null.checker.helper";

export class AniBindFunction implements ICommandFunction {
  async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await UserData.Insert(message.author.id).catch(err => {
      console.log(err);
    });
    this.CheckBind(message, command, dm);
  }

  private async CheckBind(message?: Message, command?: ICommand, dm?: boolean) {
    const anilistUserResult = await AniList.UserQuery(command.Parameter);
    const anilistRoot = await JsonHelper.Convert<Root>(anilistUserResult, Root);
    const user = anilistRoot.data.User;
    const c = await this.SetCode(message, command, user);
    this.ProcessCode(message, command, dm, c, user);
  }

  private async ProcessCode(
    message: Message,
    command: ICommand,
    dm: boolean,
    c: string,
    user: User
  ) {
    const code = AniBind.CodeFormat(c);
    const ani = await AniBindData.Get(message.author.id);
    if (ani !== null) {
      if (ani.Verified === true) {
        Sender.Send(
          message,
          `Cool! Your AniList account is **binded** with ${
            Config.BOT_NAME
          }, You can **remove** the code in your **anilist about section**.`,
          dm
        );
      } else {
        this.CheckProfile(
          message,
          command,
          dm,
          AniBind.CodeFormat(ani.Code),
          user
        );
      }
    } else {
      this.CheckProfile(message, command, dm, code, user);
    }
  }

  private async CheckProfile(
    message: Message,
    command: ICommand,
    dm: boolean,
    code: string,
    user: User
  ) {
    const embed = await this.EmbedTemplate(message, command, code);
    if (!NullCheck.Fine(user)) {
      message.channel.send(
        `:regional_indicator_x: Go me nasai! I wasn't able to find anilist user: **${
          command.Parameter
        }**`
      );
      return;
    } else {
      if (NullCheck.Fine(user.about) && user.about.includes(code)) {
        const v = await AniBindData.Verify(message.author.id);
        if (v === null) {
          Sender.Send(message, embed, dm);
        } else {
          if (v.Verified) {
            Sender.Send(
              message,
              `Cool! Your AniList account is **binded** with ${
                Config.BOT_NAME
              }, You can **remove** the code in your **anilist about section**.`,
              dm
            );
          }
        }
      } else {
        Sender.Send(message, embed, dm);
      }
    }
  }

  private EmbedTemplate(message: Message, command: ICommand, code: string) {
    return new Promise<any>(async (resolve, reject) => {
      const client = ClientManager.Client;
      const embed = {
        embed: {
          title: `${Config.BOT_NAME} AniList Sync Center`,
          description: `**${
            Config.BOT_NAME
          } Code not found** on your profile. You first need to verify your ownership.`,
          color: message.member.highestRole.color,
          thumbnail: { url: message.author.avatarURL },
          image: { url: `https://i.imgur.com/SwKmEzo.png` },
          fields: [
            {
              name: `Instruction`,
              value: `*Copy and paste* the verification code below in your *AniList about section.*. You can place it anywhere.\n[Edit Profile](https://anilist.co/settings)`
            },
            { name: `Code`, value: `***${code}***\n\nExample:` }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: `© ${Config.BOT_NAME}`
          }
        }
      };
      resolve(embed);
    });
  }

  private SetCode(message: Message, command: ICommand, user: User) {
    return new Promise<string>((resolve, reject) => {
      const code = Random.Range(10000000, 99999999).toString();
      if (NullCheck.Fine(user)) {
        AniBindData.Insert(
          message.author.id,
          user.id,
          command.Parameter,
          code
        ).then(() => {
          resolve(code);
        });
      } else {
        resolve(code);
      }
    });
  }
}
