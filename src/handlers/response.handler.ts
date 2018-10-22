import "reflect-metadata";
import { BotCommand } from "./../command/bot.command";
import { Ping } from "../core/ping";
import { Config } from "../core/config";
import "class-transformer";
import { ICommand } from "../interfaces/command.interface";
import { Message } from "discord.js";
import { Container } from "../core/container";
import { CallbackCommand } from "../command/callback.command";
import { Color } from "../core/colors";

export class ResponseHandler {
  public Get(config: Config, message: Message, command: ICommand): void {
    const commands: CallbackCommand[] = Container.BotCommand.GetCommands;
    let iteration: number = 1;
    commands.forEach(callbackCommand => {
      if (callbackCommand.Name === command.Name) {
        const commandString: string = command.Name;
        const parameter: string = command.Parameter;
        if (callbackCommand.ParameterRequired && parameter.trim().length <= 0) {
          Container.MediaResult.SendInfo(
            message,
            {
              embed: {
                color: Color.Random,
                title: `**Rikimaru Rescue Center**`,
                description: `The command ***-${commandString}*** requires a *parameter*.`,
                fields: [
                  {
                    name: `Examples for ***-${commandString}*** : `,
                    // tslint:disable-next-line:max-line-length
                    value: Container.CommandExample.MediaExample(command, 5)
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: Container.ClientManager.GetClient().user.avatarURL,
                  text: "© Rikimaru"
                }
              }
            },
            callbackCommand.DMResponse
          );
        } else {
          callbackCommand.Callback(
            message,
            command,
            callbackCommand.DMResponse
          );
        }
        return;
      } else {
        if (iteration === commands.length) {
          Container.MediaResult.SendInfo(
            message,
            `The command ***${
              command.Name
            }*** doesn't exists. Type the command: ***-help***  to see all commands.`,
            false
          );
          return;
        }
      }
      iteration++;
    });
  }
}
