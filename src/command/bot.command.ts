import { ICommandFunction } from "../interfaces/command.function.interface";
import { ICommandExample } from "./../interfaces/command.example.interface";
import { Response } from "./../core/enums";

export class BotCommand {
  public Name: string;
  public Description: string;
  public ParameterRequired: boolean;
  public MentionRequired: boolean;
  public DevOnly = false;
  public DMResponse = false;
  public Function: ICommandFunction;
  public Example: ICommandExample;

  constructor(
    name: string,
    description: string,
    requireParameter: boolean,
    requireMention: boolean,
    private responseType: Response,
    commandFunction: ICommandFunction,
    example?: ICommandExample,
    devOnly: boolean = false
  ) {
    this.Name = name;
    this.Description = description;
    this.ParameterRequired = requireParameter;
    this.MentionRequired = requireMention;
    this.Function = commandFunction;
    this.Example = example;
    this.DevOnly = devOnly;

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
