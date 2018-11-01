import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";
import { Sender } from "../../core/sender";
import { Random } from "../../helpers/random.helper";
import { MalBindData } from "../../data/mal.sync.data";
import cheerio from "cheerio";
import rp from "request-promise";
import { Config } from "../../core/config";
import { MalSync } from "../../models/mal.model";
import { ClientManager } from "../../core/client";
import { UserData } from "../../data/user.data";
import { Awaiter } from "../awaiter";
import { MessageHelper } from "../../helpers/message.helper";

export class MalBindFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    UserData.Insert(message.author.id)
      .then(insertId => {
        this.CheckBind(message, command, dm);
      })
      .catch(err => {
        this.CheckBind(message, command, dm);
      });
  }

  private CheckBind(message?: Message, command?: ICommand, dm?: boolean) {
    this.SetCode(message, command).then(c => {
      this.ProcessCode(message, command, dm, c);
    });
  }

  private ProcessCode(
    message: Message,
    command: ICommand,
    dm: boolean,
    c: string
  ) {
    Awaiter.Send(message, 2000, (m: Message) => {
      const code = MalSync.CodeFormat(c);
      MalBindData.Get(message.author.id)
        .then(mal => {
          MessageHelper.Delete(m);
          console.log(`checking verification...`);
          if (mal.Verified === true) {
            console.log(`verified!!`);
            Sender.Send(
              message,
              `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`,
              dm
            );
          } else {
            this.CheckProfile(message, command, dm, code);
          }
        })
        .catch(e => {
          console.log(`checking profile...`);
          this.CheckProfile(message, command, dm, code);
          MessageHelper.Delete(m);
        });
    });
  }

  private CheckProfile(
    message: Message,
    command: ICommand,
    dm: boolean,
    code: string
  ) {
    this.GetProfile(message, command, dm).then(about => {
      console.log(`checking code...`);
      if (about.includes(code)) {
        console.log(`verifying code...`);
        MalBindData.Verify(message.author.id)
          .then(msync => {
            Sender.Send(
              message,
              `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`,
              dm
            );
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log(`1 replying to user...`);
        this.EmbedTemplate(message, command, code).then(embed => {
          Sender.Send(message, embed, dm);
        });
      }
    });
  }

  private GetProfile(message: Message, command: ICommand, dm: boolean) {
    return new Promise<string>((resolve, reject) => {
      const url = `${Config.MAL_PROFILE_BASE}${command.Parameter}`;
      const options = {
        uri: url,
        transform: function(body: string) {
          return cheerio.load(body);
        }
      };

      rp(options)
        .then(($: CheerioStatic) => {
          resolve(
            $(".profile-about-user")
              .find(".word-break")
              .text()
          );
        })
        .catch(err => {
          reject(
            new Error(
              `Go me nasai! I couldn't find mal user **${
                command.Parameter
              }**. Check your spelling or try again later.`
            )
          );
        });
    });
  }

  private EmbedTemplate(message: Message, command: ICommand, code: string) {
    return new Promise<any>((resolve, reject) => {
      ClientManager.GetClient().then(client => {
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
    });
  }

  private SetCode(message: Message, command: ICommand) {
    return new Promise<string>((resolve, reject) => {
      const code = Random.Range(10000000, 99999999).toString();
      MalBindData.Insert(message.author.id, command.Parameter, code)
        .then(() => {
          console.log(`resolved code`);
          resolve(code);
        })
        .catch((m: MalSync) => {
          console.log(`resolved code`);
          resolve(m.Code);
        });
    });
  }
}
