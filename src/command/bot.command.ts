import { ICommandFunction } from "../interfaces/command.function.interface";
import { Response } from "./../core/enums";

export class BotCommand {
  public Name: string;
  public Description: string;
  public ParameterRequired: boolean;
  public Function: ICommandFunction;
  public DMResponse: boolean;

  constructor(
    name: string,
    description: string,
    requireParameter: boolean,
    private responseType: Response,
    commandFunction: ICommandFunction
  ) {
    this.Name = name;
    this.Description = description;
    this.ParameterRequired = requireParameter;
    this.Function = commandFunction;

    switch (this.responseType) {
      case Response.ChannelReply:
        this.DMResponse = false;
        break;
      case Response.DirectMessage:
        this.DMResponse = true;
        break;
      default:
        break;
    }

    if (this.DMResponse) {
      this.Description += "\nIt DMs you with the response.";
    }
    if (!this.ParameterRequired) {
      this.Description += "\nNo Parameters.";
    } else {
      this.Description += "\nParameter is required.";
    }
    this.Description += "\n.";
    console.log(`Constructed: "${this.Name}"`);
  }
}
