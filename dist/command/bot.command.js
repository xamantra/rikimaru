"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./../core/enums");
class BotCommand {
    constructor(name, description, requireParameter, requireMention, responseType, commandFunction, example, devOnly = false) {
        this.responseType = responseType;
        this.DevOnly = false;
        this.DMResponse = false;
        this.Name = name;
        this.Description = description;
        this.ParameterRequired = requireParameter;
        this.MentionRequired = requireMention;
        this.Function = commandFunction;
        this.Example = example;
        this.DevOnly = devOnly;
        switch (this.responseType) {
            case enums_1.Response.ChannelReply:
                this.DMResponse = false;
                break;
            case enums_1.Response.DirectMessage:
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
        }
        else {
            this.Description += "\nParameter is required.";
        }
        this.Description += "\n.";
        console.log(`Constructed: "${this.Name}"`);
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map