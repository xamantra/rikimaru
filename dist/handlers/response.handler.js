"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const container_1 = require("../core/container");
const rescue_center_1 = require("../core/rescue.center");
class ResponseHandler {
    constructor() {
        console.log(`Constructed: "${ResponseHandler.name}"`);
    }
    Get(message, command) {
        const commands = container_1.Container.CommandManager.Commands;
        let iteration = 1;
        commands.forEach(cmd => {
            if (cmd.Name === command.Name) {
                const parameter = command.Parameter;
                const paramRequired = cmd.ParameterRequired;
                if (paramRequired && parameter.length <= 0) {
                    this.SendRescue(message, cmd.DMResponse, command);
                }
                else if (!paramRequired && parameter.length >= 0) {
                    this.SendRescue(message, cmd.DMResponse, command);
                }
                else {
                    cmd.Function.Execute(message, command, cmd.DMResponse);
                }
                return;
            }
            else {
                if (iteration === commands.length) {
                    container_1.Container.MediaResult.SendInfo(message, `The command ***${command.Name}*** doesn't exists. Type the command: ***-help***  to see all commands.`, false);
                    return;
                }
            }
            iteration++;
        });
    }
    SendRescue(message, dm, command) {
        container_1.Container.MediaResult.SendInfo(message, rescue_center_1.RescueCenter.RequireParameter(command), dm);
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.js.map