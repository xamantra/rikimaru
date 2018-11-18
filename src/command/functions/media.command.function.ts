import { ICommandFunction } from "../../interfaces/command.function.interface";
import { ICommand } from "../../interfaces/command.interface";
import { MediaResult } from "../../core/media.result";
import { MediaHandler } from "../../handlers/media.handler";
import { ResponseMessageHelper } from "../../helpers/response.message.helper";
import { Message } from "discord.js";
import { Sender } from "../../core/sender";
import { AnimeCache } from "../../core/anime.cache";

export class MediaFunction implements ICommandFunction {
  constructor() {}

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.Handle(message, command, dm);
  }

  public async Handle(message: Message, command: ICommand, isDM: boolean) {
    const color = message.member.highestRole.color;
    AnimeCache.Search(command.Parameter)
      .then(results => {
        const ongoing = MediaHandler.OngoingMedia(results);
        const unreleased = MediaHandler.UnreleasedMedia(results);
        const unreleasedNoDate = MediaHandler.UnreleasedNoDateMedia(results);
        const completed = MediaHandler.CompletedMedia(results);
        const exactMedia = MediaHandler.ExactMedia(results, command.Parameter);

        if (exactMedia.length > 0) {
          exactMedia.forEach(async m => {
            ResponseMessageHelper.CreateMessage(m, m.status, color).then(
              response => {
                MediaResult.SendMessage(message, isDM, response);
              }
            );
          });
        } else if (ongoing.length > 0) {
          if (ongoing.length === 1) {
            const m = ongoing[0];
            ResponseMessageHelper.CreateMessage(m, m.status, color).then(
              response => {
                MediaResult.SendMessage(message, isDM, response);
              }
            );
          } else {
            this.SendManyResult(
              message,
              command,
              isDM,
              ongoing.length,
              `currently ongoing. Please try to be more specific.`
            );
          }
        } else if (unreleased.length > 0) {
          if (unreleased.length === 1) {
            const m = unreleased[0];
            ResponseMessageHelper.CreateMessage(m, m.status, color).then(
              response => {
                MediaResult.SendMessage(message, isDM, response);
              }
            );
          } else {
            this.SendManyResult(
              message,
              command,
              isDM,
              unreleased.length,
              `not yet aired. Please try to be more specific.`
            );
          }
        } else if (unreleasedNoDate.length > 0) {
          if (unreleasedNoDate.length === 1) {
            const m = unreleasedNoDate[0];
            ResponseMessageHelper.CreateMessage(m, m.status, color).then(
              response => {
                MediaResult.SendMessage(message, isDM, response);
              }
            );
          } else {
            this.SendManyResult(
              message,
              command,
              isDM,
              unreleasedNoDate.length,
              `not yet aired. Please try to be more specific.`
            );
          }
        } else if (completed.length > 0) {
          if (completed.length === 1) {
            completed.forEach(async m => {
              ResponseMessageHelper.CreateMessage(m, m.status, color).then(
                response => {
                  MediaResult.SendMessage(message, isDM, response);
                }
              );
            });
          } else {
            this.SendManyResult(
              message,
              command,
              isDM,
              completed.length,
              `already completed.`
            );
          }
        } else {
          Sender.SendInfo(
            message,
            `Go me nasai!, I didn't find anime that matches your keyword ***"${
              command.Parameter
            }"***, try checking your spelling or another keyword.`,
            isDM
          );
        }
      })
      .catch(() => {
        Sender.SendInfo(
          message,
          `Go me nasai!, I didn't find anime that matches your keyword ***"${
            command.Parameter
          }"***, try checking your spelling or another keyword.`,
          isDM
        );
        console.warn(
          `Error while searching : [MediaSearch.All(${command.Parameter})]`
        );
      });
  }

  private SendManyResult(
    message: Message,
    command: ICommand,
    isDM: boolean,
    length: number,
    type: string
  ) {
    Sender.SendInfo(
      message,
      `I found ***${length}*** anime with your keyword ***${
        command.Parameter
      }*** and all of them is ${type}`,
      isDM
    );
  }
}
