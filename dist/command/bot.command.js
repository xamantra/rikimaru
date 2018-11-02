"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./../core/enums");
class BotCommand {
    constructor(Name, Description, ParameterRequired, CanHaveMention, ResponseType, Cooldown, Function, Example, DevOnly = false) {
        this.Name = Name;
        this.Description = Description;
        this.ParameterRequired = ParameterRequired;
        this.CanHaveMention = CanHaveMention;
        this.ResponseType = ResponseType;
        this.Cooldown = Cooldown;
        this.Function = Function;
        this.Example = Example;
        this.DevOnly = DevOnly;
        this.DirectMessage = false;
        switch (this.ResponseType) {
            case enums_1.Response.ChannelReply:
                this.DirectMessage = false;
                break;
            case enums_1.Response.DirectMessage:
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
        }
        else {
            this.Description += "\nParameter is required.";
        }
        this.Description += "\n.";
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map