import { Anilist } from "../../core/anilist";
import { MediaSearch } from "./../../core/media.search";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { JsonHelper } from "../../helpers/json.helper";
import { ICommand } from "../../interfaces/command.interface";
import { MediaResult } from "../../core/media.result";
import { MediaHandler } from "../../handlers/media.handler";
import { ResponseMessageHelper } from "../../helpers/response.message.helper";
import { RootPage } from "../../models/root.model";
import { Message } from "discord.js";
import { IMedia } from "../../interfaces/page.interface";
import { Color } from "../../core/colors";
import { Sender } from "../../core/sender";

export class MediaFunction implements ICommandFunction {
  constructor() {
    console.log(`Constructed: "${MediaFunction.name}"`);
  }

  public async Execute(message?: Message, command?: ICommand, dm?: boolean) {
    await this.Handle(message, command, dm);
  }

  public async Handle(message: Message, command: ICommand, isDM: boolean) {
    MediaSearch.All(command.Parameter)
      .then(res => {
        const ongoing = MediaHandler.OngoingMedia(res);
        const unreleased = MediaHandler.UnreleasedMedia(res);
        const unreleasedNoDate = MediaHandler.UnreleasedNoDateMedia(res);
        const completed = MediaHandler.CompletedMedia(res);
        const exactMedia = MediaHandler.ExactMedia(res, command.Parameter);

        if (exactMedia.length > 0) {
          exactMedia.forEach(async m => {
            MediaResult.SendMessage(
              message,
              isDM,
              ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
            );
          });
        } else if (ongoing.length > 0) {
          ongoing.forEach(async m => {
            MediaResult.SendMessage(
              message,
              isDM,
              ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
            );
          });
        } else if (unreleased.length > 0) {
          unreleased.forEach(async m => {
            MediaResult.SendMessage(
              message,
              isDM,
              ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
            );
          });
        } else if (unreleasedNoDate.length > 0) {
          unreleasedNoDate.forEach(async m => {
            MediaResult.SendMessage(
              message,
              isDM,
              ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
            );
          });
        } else if (completed.length > 0) {
          if (completed.length === 1) {
            completed.forEach(async m => {
              MediaResult.SendMessage(
                message,
                isDM,
                ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
              );
            });
          } else {
            Sender.SendInfo(
              message,
              `I found ***${completed.length}*** anime with your keyword ***${
                command.Parameter
              }*** and all of them is already completed.`,
              isDM
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
      .catch(error => {
        console.warn(
          `Error while searching : [MediaSearch.All(${command.Parameter})]`
        );
      });
  }
}
