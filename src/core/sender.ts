import { Message, DiscordAPIError } from "discord.js";

export class Sender {
  public static Send(message: Message, content: any, isDM: boolean = false) {
    if (isDM) {
      message.author
        .send(content)
        .then(($m: Message) => {
          console.log(
            `Message <${$m.id}> was sent to "${message.author.username}".`
          );
        })
        .catch((err: DiscordAPIError) => {
          message.reply(`Oh!, it seems that I can't dm you.`);
          console.log(err.message);
        });
    } else {
      message
        .reply(content)
        .then(($m: Message) => {
          console.log(
            `Message <${$m.id}> was sent in <${message.channel.id}>.`
          );
        })
        .catch((err: DiscordAPIError) => {
          console.log(err.message);
        });
    }
  }

  public static async SendInfo(
    message: Message,
    content: any,
    isDM: boolean = false
  ) {
    this.Send(message, content, isDM);
  }
}
