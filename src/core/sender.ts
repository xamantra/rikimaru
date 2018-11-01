import { Message, DiscordAPIError } from "discord.js";

export class Sender {
  public static Send(
    message: Message,
    content: any,
    isDM: boolean = false,
    callback?: () => void
  ) {
    if (isDM) {
      message.author
        .send(content)
        .then(($m: Message) => {
          if (callback !== null && callback !== undefined) {
            callback();
          }
          console.log(
            `Message <${$m.id}> was sent to "${message.author.username}".`
          );
        })
        .catch((err: DiscordAPIError) => {
          message.reply(`Oh!, it seems that I can't dm you.`);
          if (callback !== null && callback !== undefined) {
            callback();
          }
          console.log(`Sender.ts: "${err.message}"`);
        });
    } else {
      message
        .reply(content)
        .then(($m: Message) => {
          if (callback !== null && callback !== undefined) {
            callback();
          }
          console.log(
            `Message <${$m.id}> was sent in <${message.channel.id}>.`
          );
        })
        .catch((err: DiscordAPIError) => {
          if (callback !== null && callback !== undefined) {
            callback();
          }
          console.log(`Sender.ts: "${err.message}"`);
        });
    }
  }

  public static SendInfo(
    message: Message,
    content: any,
    isDM: boolean = false
  ) {
    this.Send(message, content, isDM);
  }
}
