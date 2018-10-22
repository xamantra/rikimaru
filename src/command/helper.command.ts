import { Command } from "./../models/command.model";
export class Helper {
  public static IsCommandValid(
    hasParameter: boolean,
    command: Command
  ): boolean {
    return hasParameter
      ? command.Parameter.length > 0
      : command.Parameter.length === 0;
  }
}
