import { Anilist } from "../../core/anilist";
import { ICommandFunction } from "../../interfaces/command.function.interface";
import { JsonHelper } from "../../helpers/json.helper";
import { ICommand } from "../../interfaces/command.interface";
import { Container } from "../../core/container";
import { MediaResult } from "../../core/media.result";
import { MediaHandler } from "../../handlers/media.handler";
import { Color } from "../../core/colors";
import { ResponseMessageHelper } from "../../helpers/response.message.helper";
import { Root } from "../../models/root.model";
import { Message } from "discord.js";
import { IMedia } from "../../interfaces/page.interface";

export class MediaFunction implements ICommandFunction {
  private Color: Color;
  private MediaHandler: MediaHandler;
  private MediaResult: MediaResult;
  private ResponseMessageHelper: ResponseMessageHelper;
  private Anilist: Anilist;

  constructor(private type: string) {
    this.Color = Container.Color;
    this.MediaHandler = Container.MediaHandler;
    this.MediaResult = Container.MediaResult;
    this.ResponseMessageHelper = Container.ResponseMessageHelper;
    this.Anilist = Container.Anilist;
    type = type.toUpperCase();
    console.log(`Constructed: "${MediaFunction.name}: Type = ${type}"`);
  }

  public get Type() {
    return this.type;
  }

  public Execute(message?: Message, command?: ICommand, dm?: boolean) {
    this.Handle(this.Anilist, message, command, dm);
  }

  public Handle(
    aniList: Anilist,
    message: Message,
    command: ICommand,
    isDM: boolean
  ) {
    const mediaHandler = this.MediaHandler;
    const color = this.Color;
    const mediaResult = this.MediaResult;
    const responseHelper = this.ResponseMessageHelper;
    const result = aniList.MediaSearch(command.Parameter, this.type);
    let media: IMedia[] = [];
    result.then(async root => {
      media = await (JsonHelper.Converter.deserialize(root, Root) as Root).Data
        .Page.media;

      const ongoing = mediaHandler.OngoingMedia(media);
      const unreleased = mediaHandler.UnreleasedMedia(media);
      const unreleasedNoDate = mediaHandler.UnreleasedNoDateMedia(media);
      const exactMedia = mediaHandler.ExactMedia(media, command.Parameter);
      const completed = mediaHandler.CompletedMedia(media);

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
            `I found ***${
              completed.length
            }*** ${this.type.toLowerCase()} with your keyword ***${
              command.Parameter
            }*** and all of them is already completed.`,
            isDM
          );
        }
      } else {
        mediaResult.SendInfo(
          message,
          `Go me nasai!, I didn't find ${this.type.toLowerCase()} that matches your keyword ***"${
            command.Parameter
          }"***, try checking your spelling or another keyword.`,
          isDM
        );
      }
    });
  }
}
