"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const rescue_center_1 = require("../core/rescue.center");
const manager_command_1 = require("../command/manager.command");
const sender_1 = require("./../core/sender");
const cooldown_model_1 = require("../models/cooldown.model");
class ResponseHandler {
    static Get(message, command) {
        manager_command_1.CommandManager.Validate(command)
            .then(cmd => {
            cooldown_model_1.Cooldown.Get(cmd, message.member.user).then(cooldown => {
                cooldown
                    .Register(message)
                    .then(() => {
                    const parameter = command.Parameter;
                    const paramRequired = cmd.ParameterRequired;
                    if (cmd.CanHaveMention &&
                        message.mentions !== null &&
                        message.mentions !== undefined) {
                        cmd.Function.Execute(message, command, cmd.DirectMessage);
                        return;
                    }
                    else if (parameter.length === 0 && paramRequired) {
                        this.SendRescue(message, cmd.DirectMessage, cmd, command);
                        return;
                    }
                    else if (parameter.length > 0 && !paramRequired) {
                        this.SendRescue(message, cmd.DirectMessage, cmd, command);
                        return;
                    }
                    else {
                        if (cmd.Function !== null) {
                            if (cmd.DevOnly === true &&
                                message.author.id === "442621672714010625") {
                                cmd.Function.Execute(message, command, cmd.DirectMessage);
                                return;
                            }
                            cmd.Function.Execute(message, command, cmd.DirectMessage);
                            return;
                        }
                    }
                    return;
                })
                    .catch((response) => {
                    message.channel.send(response.content).then(($m) => {
                        cooldown.Respond($m).then(() => {
                            if (message.deletable) {
                                message.delete();
                            }
                            setTimeout(() => {
                                $m.delete();
                            }, response.timeout);
                        });
                    });
                });
            });
        })
            .catch((err) => {
            message.reply(err.message);
        });
    }
    static SendRescue(message, dm, botCommand, command) {
        rescue_center_1.RescueCenter.RequireParameter(message, botCommand, command).then(embed => {
            sender_1.Sender.SendInfo(message, embed, dm);
        });
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.js.map