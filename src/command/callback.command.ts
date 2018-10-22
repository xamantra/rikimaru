import { Message } from "discord.js";
import { Command } from "../models/command.model";

export class CallbackCommand {
  public Name: string;
  public Description: string;
  public ParameterRequired: boolean;
  public DMResponse: boolean;
  public Callback: (message: Message, command: Command, dm: boolean) => void;

  constructor(
    name: string,
    description: string,
    requireParameter: boolean,
    dmResponse: boolean,
    callBack: (message: Message, command: Command, dm: boolean) => void
  ) {
    this.Name = name;
    this.Description = description;
    this.DMResponse = dmResponse;
    this.ParameterRequired = requireParameter;
    this.Callback = callBack;
    if (this.DMResponse) {
      this.Description += "\nIt DMs you with the result.";
    }
    if (!this.ParameterRequired) {
      this.Description += "\nNo Parameters.";
    } else {
      this.Description += "\nParameter is required.";
    }

    this.Description += "\n.";
  }
}
