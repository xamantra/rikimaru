"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const rescue_center_1 = require("../core/rescue.center");
const manager_command_1 = require("../command/manager.command");
const sender_1 = require("./../core/sender");
class ResponseHandler {
    static Get(message, command) {
        const commands = manager_command_1.CommandManager.Commands;
        let iteration = 1;
        commands.forEach(async (cmd) => {
            if (cmd.Name === command.Name) {
                const parameter = command.Parameter;
                const paramRequired = cmd.ParameterRequired;
                if (cmd.MentionRequired &&
                    message.mentions !== null &&
                    message.mentions !== undefined) {
                    cmd.Function.Execute(message, command, cmd.DMResponse);
                    return;
                }
                else if (parameter.length === 0 && paramRequired) {
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
                        cmd.Function.Execute(message, command, cmd.DMResponse);
                        return;
                    }
                }
                return;
            }
            else {
                if (iteration === commands.length) {
                    sender_1.Sender.SendInfo(message, `The command ***${command.Name}*** doesn't exists. Type the command: ***-help***  to see all commands.`, false);
                    return;
                }
            }
            iteration++;
        });
    }
    static SendRescue(message, dm, botCommand, command) {
        rescue_center_1.RescueCenter.RequireParameter(botCommand, command).then(embed => {
            sender_1.Sender.SendInfo(message, embed, dm);
        });
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.js.map