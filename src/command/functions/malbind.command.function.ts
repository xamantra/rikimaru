import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { Sender } from "../../core/sender";
import { Random } from "../../helpers/random.helper";
import { MalBindData } from "../../data/mal.bind.data";
import { MalBind } from "../../models/mal.bind.model";
import { ClientManager } from "../../core/client";
import { UserData } from "../../data/user.data";
import { MAL } from "../../core/mal";
import { Config } from "../../core/config";
import { NullCheck } from "../../helpers/null.checker.helper";

export class MalBindFunction implements ICommandFunction {
  async Execute(
    message?: Message,
    command?: ICommand,
    dm?: boolean
  ): Promise<void> {
    await UserData.Insert(message.author.id).catch((err: Error) => {
      console.log(`Internal error: ${err.message}`);
    });
    this.CheckBind(message, command, dm);
  }

  private async CheckBind(message?: Message, command?: ICommand, dm?: boolean) {
    const about = await MAL.GetProfileAbout(command.Parameter);
    if (!NullCheck.Fine(about)) {
      this.NotFindError(message, command);
      return;
    }
    const c = await this.SetCode(message, command, about);
    this.ProcessCode(message, command, dm, c, about);
  }

  private async ProcessCode(
    message: Message,
    command: ICommand,
    dm: boolean,
    c: string,
    about: string
  ) {
    const code = MalBind.CodeFormat(c);
    const mal = await MalBindData.Get(message.author.id);
    if (mal !== null) {
      if (mal.Verified === true) {
        this.SendOK(message, command);
        return;
      } else {
        this.CheckProfile(
          message,
          command,
          dm,
          MalBind.CodeFormat(mal.Code),
          about
        );
      }
    } else {
      this.CheckProfile(message, command, dm, code, about);
    }
  }

  private async CheckProfile(
    message: Message,
    command: ICommand,
    dm: boolean,
    code: string,
    about: string
  ) {
    const embed = await this.EmbedTemplate(message, command, code);
    if (!NullCheck.Fine(about)) {
      this.NotFindError(message, command);
      return;
    } else {
      if (about.includes(code)) {
        const v = await MalBindData.Verify(message.author.id);
        if (v === null) {
          Sender.Send(message, embed, dm);
        } else {
          if (v.Verified) {
            this.SendOK(message, command);
            return;
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
          title: `${Config.BOT_NAME} MAL Sync Center`,
          description: `**${
            Config.BOT_NAME
          } Code not found** on your profile. You first need to verify your ownership.`,
          color: message.member.highestRole.color,
          thumbnail: { url: message.author.avatarURL },
          image: { url: `https://i.imgur.com/UFL2LDu.png` },
          fields: [
            {
              name: `Instruction`,
              value: `*Copy and paste* the verification code below in your *MAL about section.*. You can place it anywhere.\n[Edit Profile](https://myanimelist.net/editprofile.php)`
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

  private SetCode(message: Message, command: ICommand, about: string) {
    return new Promise<string>((resolve, reject) => {
      const code = Random.Range(10000000, 99999999).toString();
      if (NullCheck.Fine(about)) {
        MalBindData.Insert(message.author.id, command.Parameter, code).then(
          () => {
            resolve(code);
          }
        );
      } else {
        resolve(code);
      }
    });
  }

  private NotFindError(message: Message, command: ICommand) {
    message.channel.send(
      `:regional_indicator_x: Go me nasai! I wasn't able to find mal user: **${
        command.Parameter
      }**`
    );
  }

  private SendOK(message: Message, command: ICommand) {
    message.channel.send(
      `:white_check_mark: Cool! MAL account **"${
        command.Parameter
      }"** is **binded** with ${
        Config.BOT_NAME
      }, The code can be remove in **mal about section**.`
    );
  }
}
