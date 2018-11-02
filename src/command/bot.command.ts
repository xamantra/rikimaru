import { ICommandFunction } from "../interfaces/command.function.interface";
import { ICommandExample } from "./../interfaces/command.example.interface";
import { Response } from "./../core/enums";

export class BotCommand {
  public DirectMessage = false;

  constructor(
    public Name: string,
    public Description: string,
    public ParameterRequired: boolean,
    public CanHaveMention: boolean,
    private ResponseType: Response,
    public Cooldown: number,
    public Function: ICommandFunction,
    public Example?: ICommandExample,
    public DevOnly: boolean = false
  ) {
    switch (this.ResponseType) {
      case Response.ChannelReply:
        this.DirectMessage = false;
        break;
      case Response.DirectMessage:
        this.DirectMessage = true;
        break;
      default:
        break;
    }

    if (this.DirectMessage) {
      this.Description += "\nIt DMs you with the response.";
    }
    if (!this.ParameterRequired) {
      this.Description += "\nNo Parameters.";
    } else {
      this.Description += "\nParameter is required.";
    }
    this.Description += "\n.";
  }
}
