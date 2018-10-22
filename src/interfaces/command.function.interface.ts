import { Message } from "discord.js";
import { ICommand } from "./command.interface";

export interface ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void;
}
