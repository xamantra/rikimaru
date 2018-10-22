import { Anilist } from "../core/anilist";
import { ICommand } from "./../interfaces/command.interface";
import { Container } from "./../core/container";
import { MediaResult } from "./../core/media.result";
import { MediaHandler } from "./../handlers/media.handler";
import { Color } from "./../core/colors";
import { ResponseMessageHelper } from "./response.message.helper";
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import { Root } from "../models/root.model";
import { Message } from "discord.js";
import { IMedia } from "../interfaces/page.interface";

export class MediaHelper {
  private Color: Color;
  private MediaHandler: MediaHandler;
  private MediaResult: MediaResult;
  private ResponseMessageHelper: ResponseMessageHelper;

  constructor() {
    this.Color = Container.Color;
    this.MediaHandler = Container.MediaHandler;
    this.MediaResult = Container.MediaResult;
    this.ResponseMessageHelper = Container.ResponseMessageHelper;
    console.log(`Constructed: "${MediaHelper.name}"`);
  }
  public Handle(
    aniList: Anilist,
    message: Message,
    command: ICommand,
    isDM: boolean
  ): void {
    const mediaHandler: MediaHandler = this.MediaHandler;
    const color: Color = this.Color;
    const mediaResult: MediaResult = this.MediaResult;
    const responseHelper: ResponseMessageHelper = this.ResponseMessageHelper;
    const result: Promise<object> = aniList.MediaSearch(
      command.Parameter,
      "ANIME"
    );
    let media: IMedia[] = [];
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    result.then(async root => {
      media = await (jsonConvert.deserialize(root, Root) as Root).Data.Page
        .media;

      const ongoing: IMedia[] = mediaHandler.OngoingMedia(media);
      const unreleased: IMedia[] = mediaHandler.UnreleasedMedia(media);
      const unreleasedNoDate: IMedia[] = mediaHandler.UnreleasedNoDateMedia(
        media
      );
      const exactMedia: IMedia[] = mediaHandler.ExactMedia(
        media,
        command.Parameter
      );
      const completed: IMedia[] = mediaHandler.CompletedMedia(media);

      if (exactMedia.length > 0) {
        exactMedia.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            responseHelper.CreateMessage(m, m.status, color.Random)
          );
        });
      } else if (ongoing.length > 0) {
        ongoing.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            responseHelper.CreateMessage(m, m.status, color.Random)
          );
        });
      } else if (unreleased.length > 0) {
        unreleased.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            responseHelper.CreateMessage(m, m.status, color.Random)
          );
        });
      } else if (unreleasedNoDate.length > 0) {
        unreleasedNoDate.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            responseHelper.CreateMessage(m, m.status, color.Random)
          );
        });
      } else if (completed.length > 0) {
        if (completed.length === 1) {
          completed.forEach(m => {
            mediaResult.SendMessage(
              message,
              isDM,
              responseHelper.CreateMessage(m, m.status, color.Random)
            );
          });
        } else {
          mediaResult.SendInfo(
            message,
            `I found ***${completed.length}*** anime with your keyword ***${
              command.Parameter
            }*** and all of them is already completed.`,
            isDM
          );
        }
      } else {
        mediaResult.SendInfo(
          message,
          `Go me nasai!, I didn't find anime that matches your keyword ***"${
            command.Parameter
          }"***, try checking your spelling or another keyword.`,
          isDM
        );
      }
    });
  }
}
