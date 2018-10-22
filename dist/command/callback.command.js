"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CallbackCommand {
    constructor(name, description, requireParameter, dmResponse, callBack) {
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
        }
        else {
            this.Description += "\nParameter is required.";
        }
        this.Description += "\n.";
        console.log(`Constructed: "${CallbackCommand.name}", Name: "${this.Name}"`);
    }
}
exports.CallbackCommand = CallbackCommand;
//# sourceMappingURL=callback.command.js.map