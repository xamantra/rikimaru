import { ICommandFunction } from "../../interfaces/command.function.interface";
import { Bot } from "./../../core/bot";
import { Message } from "discord.js";
import { ICommand } from "../../interfaces/command.interface";

export class TweakFunction implements ICommandFunction {
  Execute(message?: Message, command?: ICommand, dm?: boolean): void {
    if (message.author.id === "442621672714010625") {
      Bot.SetActive(false, status => {
        if (status === false)
          message.author.send("Hello my creator! I am now in **tweak mode**.");
        else
          message.author.send("Hello my creator! I am now in **alive mode**.");
      });
    }
  }
}
