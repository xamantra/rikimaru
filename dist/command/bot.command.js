"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotCommand {
    constructor(name, description, requireParameter, dmResponse, commandFunction) {
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
        }
        else {
            this.Description += "\nParameter is required.";
        }
        this.Description += "\n.";
        console.log(`Constructed: "${BotCommand.name}", Name: "${this.Name}"`);
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map