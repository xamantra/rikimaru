import { ICommandFunction } from "./../../interfaces/command.function.interface";
import { MediaData } from "./../../data/media.data";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";

export class LogAllFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    if (message.author.id === "442621672714010625") {
      console.log(MediaData.LogAll());
    }
  }
}
