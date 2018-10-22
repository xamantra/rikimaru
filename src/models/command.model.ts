import { ICommand } from "../interfaces/command.interface";

export class Command implements ICommand {
  public Name: string;
  public Parameter: string;
  constructor(name: string, parameter: string) {
    this.Name = name;
    this.Parameter = parameter;
  }
}
