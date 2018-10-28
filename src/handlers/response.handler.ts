import "reflect-metadata";
import { BotCommand } from "./../command/bot.command";
import "class-transformer";
import { ICommand } from "../interfaces/command.interface";
import { Message } from "discord.js";
import { RescueCenter } from "../core/rescue.center";
import { CommandManager } from "../command/manager.command";
import { Sender } from "./../core/sender";

export class ResponseHandler {
  public static Get(message: Message, command: ICommand) {
    const commands = CommandManager.Commands;
    let iteration = 1;
    commands.forEach(async cmd => {
      if (cmd.Name === command.Name) {
        const parameter = command.Parameter;
        const paramRequired = cmd.ParameterRequired;
        if (
          cmd.MentionRequired &&
          message.mentions !== null &&
          message.mentions !== undefined
        ) {
          cmd.Function.Execute(message, command, cmd.DMResponse);
          return;
        } else if (parameter.length === 0 && paramRequired) {
          this.SendRescue(message, cmd.DMResponse, cmd, command);
        } else if (parameter.length > 0 && !paramRequired) {
          this.SendRescue(message, cmd.DMResponse, cmd, command);
        } else {
          if (cmd.Function !== null) {
            if (
              cmd.DevOnly === true &&
              message.author.id === "442621672714010625"
            ) {
              cmd.Function.Execute(message, command, cmd.DMResponse);
              return;
            }
            cmd.Function.Execute(message, command, cmd.DMResponse);
            return;
          }
        }
        return;
      } else {
        if (iteration === commands.length) {
          Sender.SendInfo(
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

  private static SendRescue(
    message: Message,
    dm: boolean,
    botCommand: BotCommand,
    command: ICommand
  ) {
    RescueCenter.RequireParameter(botCommand, command).then(embed => {
      Sender.SendInfo(message, embed, dm);
    });
  }
}
