import { ICommandFunction } from "../interfaces/command.function.interface";

export class BotCommand {
  public Name: string;
  public Description: string;
  public ParameterRequired: boolean;
  public DMResponse: boolean = false;
  public Function: ICommandFunction;

  constructor(
    name: string,
    description: string,
    requireParameter: boolean,
    commandFunction: ICommandFunction
  ) {
    this.Name = name;
    this.Description = description;
    this.ParameterRequired = requireParameter;
    this.Function = commandFunction;
    if (this.DMResponse) {
      this.Description += "\nIt DMs you with the response.";
    }
    if (!this.ParameterRequired) {
      this.Description += "\nNo Parameters.";
    } else {
      this.Description += "\nParameter is required.";
    }

    if (name.substr(0, 2).toLowerCase() === "dm") {
      this.DMResponse = true;
    }
    this.Description += "\n.";
    console.log(`Constructed: "${this.Name}"`);
  }
}
