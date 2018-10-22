import "reflect-metadata";
import "class-transformer";
import { ICommand } from "../interfaces/command.interface";
import { Message } from "discord.js";
import { Container } from "../core/container";
import { RescueCenter } from "../core/rescue.center";

export class ResponseHandler {
  constructor() {
    console.log(`Constructed: "${ResponseHandler.name}"`);
  }

  public Get(message: Message, command: ICommand) {
    const commands = Container.CommandManager.Commands;
    let iteration = 1;
    commands.forEach(cmd => {
      if (cmd.Name === command.Name) {
        const parameter = command.Parameter;
        const paramRequired = cmd.ParameterRequired;
        if (paramRequired && parameter.length <= 0) {
          this.SendRescue(message, cmd.DMResponse, command);
        } else if (!paramRequired && parameter.length >= 0) {
          this.SendRescue(message, cmd.DMResponse, command);
        } else {
          cmd.Function.Execute(message, command, cmd.DMResponse);
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

  private SendRescue(message: Message, dm: boolean, command: ICommand) {
    Container.MediaResult.SendInfo(
      message,
      RescueCenter.RequireParameter(command),
      dm
    );
  }
}
