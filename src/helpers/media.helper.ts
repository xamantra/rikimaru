import { Anilist } from "../core/anilist";
import { MediaResult } from "../core/media.result";
import { ResponseMessageHelper } from "./response.message.helper";
import { Command } from "../models/command.model";
import { Media } from "../models/media.model";
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import { Root } from "../models/root.model";
import { Message } from "discord.js";
import { MediaHandler } from "../handlers/media.handler";
import { Container } from "../core/container";
import { Color } from "../core/colors";

export class MediaHelper {
  public static Handle(
    aniList: Anilist,
    message: Message,
    command: Command,
    isDM: boolean,
    subscribe?: boolean
  ): void {
    const mediaResult: MediaResult = Container.MediaResult;
    const result: Promise<object> = aniList.MediaSearch(
      command.Parameter,
      "ANIME"
    );
    let media: Media[] = [];
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    result.then(async root => {
      media = await (jsonConvert.deserialize(root, Root) as Root).Data.Page
        .media;

      const ongoing: Media[] = MediaHandler.OngoingMedia(media);
      const unreleased: Media[] = MediaHandler.UnreleasedMedia(media);
      const unreleasedNoDate: Media[] = MediaHandler.UnreleasedNoDateMedia(
        media
      );
      const exactMedia: Media[] = MediaHandler.ExactMedia(
        media,
        command.Parameter
      );
      const completed: Media[] = MediaHandler.CompletedMedia(media);

      if (exactMedia.length > 0) {
        exactMedia.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
          );
        });
      } else if (ongoing.length > 0) {
        ongoing.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
          );
        });
      } else if (unreleased.length > 0) {
        unreleased.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
          );
        });
      } else if (unreleasedNoDate.length > 0) {
        unreleasedNoDate.forEach(m => {
          mediaResult.SendMessage(
            message,
            isDM,
            ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
          );
        });
      } else if (completed.length > 0) {
        if (completed.length === 1) {
          completed.forEach(m => {
            mediaResult.SendMessage(
              message,
              isDM,
              ResponseMessageHelper.CreateMessage(m, m.status, Color.Random)
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
