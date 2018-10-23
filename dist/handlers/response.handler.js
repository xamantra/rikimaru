"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const rescue_center_1 = require("../core/rescue.center");
const media_result_1 = require("../core/media.result");
const manager_command_1 = require("../command/manager.command");
const bot_1 = require("../core/bot");
class ResponseHandler {
    static Get(message, command) {
        const commands = manager_command_1.CommandManager.Commands;
        let iteration = 1;
        commands.forEach(cmd => {
            if (cmd.Name === command.Name) {
                const parameter = command.Parameter;
                const paramRequired = cmd.ParameterRequired;
                if (parameter.length === 0 && paramRequired) {
                    this.SendRescue(message, cmd.DMResponse, cmd, command);
                }
                else if (parameter.length > 0 && !paramRequired) {
                    this.SendRescue(message, cmd.DMResponse, cmd, command);
                }
                else {
                    if (cmd.Function !== null) {
                        if (cmd.DevOnly === true &&
                            message.author.id === "442621672714010625") {
                            cmd.Function.Execute(message, command, cmd.DMResponse);
                            return;
                        }
                        if (bot_1.Bot.IsActive === true)
                            cmd.Function.Execute(message, command, cmd.DMResponse);
                    }
                }
                return;
            }
            else {
                if (iteration === commands.length) {
                    media_result_1.MediaResult.SendInfo(message, `The command ***${command.Name}*** doesn't exists. Type the command: ***-help***  to see all commands.`, false);
                    return;
                }
            }
            iteration++;
        });
    }
    static SendRescue(message, dm, botCommand, command) {
        media_result_1.MediaResult.SendInfo(message, rescue_center_1.RescueCenter.RequireParameter(botCommand, command), dm);
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.js.map