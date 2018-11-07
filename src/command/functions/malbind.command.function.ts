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

export class MalBindFunction implements ICommandFunction {
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
    const c = await this.SetCode(message, command);
    this.ProcessCode(message, command, dm, c);
  }

  private async ProcessCode(
    message: Message,
    command: ICommand,
    dm: boolean,
    c: string
  ) {
    const code = MalBind.CodeFormat(c);
    const mal = await MalBindData.Get(message.author.id).catch(err => {
      console.log(err);
    });
    if (mal instanceof MalBind) {
      if (mal.Verified === true) {
        Sender.Send(
          message,
          `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`,
          dm
        );
      } else {
        this.CheckProfile(message, command, dm, MalBind.CodeFormat(mal.Code));
      }
    } else {
      this.CheckProfile(message, command, dm, code);
    }
  }

  private async CheckProfile(
    message: Message,
    command: ICommand,
    dm: boolean,
    code: string
  ) {
    const embed = await this.EmbedTemplate(message, command, code);
    const about = await MAL.GetProfileAbout(command.Parameter);
    if (about === null) {
      Sender.Send(message, embed, dm);
      return;
    } else {
      if (about.includes(code)) {
        await MalBindData.Verify(message.author.id).catch(err => {
          console.log(err);
        });
        Sender.Send(
          message,
          `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`,
          dm
        );
      } else {
        Sender.Send(message, embed, dm);
      }
    }
  }

  private EmbedTemplate(message: Message, command: ICommand, code: string) {
    return new Promise<any>(async (resolve, reject) => {
      const client = await ClientManager.GetClient();
      const embed = {
        embed: {
          title: `Rikimaru MAL Sync Center`,
          description: `**Rikimaru Code not found** on your profile. You first need to verify your ownership.`,
          color: message.member.highestRole.color,
          thumbnail: { url: message.author.avatarURL },
          image: { url: `https://i.imgur.com/9h3vere.png` },
          fields: [
            {
              name: `Instruction`,
              value: `*Copy and paste* the verification code below in your *MAL about section.*. You can place it anywhere.\n[Edit Profile](https://myanimelist.net/editprofile.php)`
            },
            { name: `Code`, value: `***${code}***\n\nExample:` }
          ],
          timestamp: new Date(),
          footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
        }
      };
      resolve(embed);
    });
  }

  private SetCode(message: Message, command: ICommand) {
    return new Promise<string>((resolve, reject) => {
      const code = Random.Range(10000000, 99999999).toString();
      MalBindData.Insert(message.author.id, command.Parameter, code)
        .then(() => {
          resolve(code);
        })
        .catch((m: MalBind) => {
          resolve(m.Code);
        });
    });
  }
}
