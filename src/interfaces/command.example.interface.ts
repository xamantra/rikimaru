import { ICommand } from "./command.interface";

export interface ICommandExample {
  Count: number;
  Get(command: ICommand, count: number): string;
}
