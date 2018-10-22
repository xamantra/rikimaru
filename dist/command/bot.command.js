"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotCommand {
    constructor(name, description, requireParameter, commandFunction) {
        this.DMResponse = false;
        this.Name = name;
        this.Description = description;
        this.ParameterRequired = requireParameter;
        this.Function = commandFunction;
        if (this.DMResponse) {
            this.Description += "\nIt DMs you with the response.";
        }
        if (!this.ParameterRequired) {
            this.Description += "\nNo Parameters.";
        }
        else {
            this.Description += "\nParameter is required.";
        }
        if (name.substr(0, 2).toLowerCase() === "dm") {
            this.DMResponse = true;
        }
        this.Description += "\n.";
        console.log(`Constructed: "${this.Name}"`);
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map