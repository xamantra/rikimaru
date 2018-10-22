import { ICommandFunction } from "../interfaces/command.function.interface";

export class BotCommand {
  public Name: string;
  public Description: string;
  public ParameterRequired: boolean;
  public DMResponse: boolean;
  public Function: ICommandFunction;

  constructor(
    name: string,
    description: string,
    requireParameter: boolean,
    dmResponse: boolean,
    commandFunction: ICommandFunction
  ) {
    this.Name = name;
    this.Description = description;
    this.DMResponse = dmResponse;
    this.ParameterRequired = requireParameter;
    this.Function = commandFunction;
    if (this.DMResponse) {
      this.Description += "\nIt DMs you with the result.";
    }
    if (!this.ParameterRequired) {
      this.Description += "\nNo Parameters.";
    } else {
      this.Description += "\nParameter is required.";
    }

    this.Description += "\n.";
    console.log(`Constructed: "${BotCommand.name}", Name: "${this.Name}"`);
  }
}
