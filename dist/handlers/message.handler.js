"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_helper_1 = require("../helpers/message.helper");
const command_model_1 = require("../models/command.model");
const client_1 = require("../core/client");
const config_1 = require("../core/config");
const response_handler_1 = require("./response.handler");
class MessageHandler {
    static async Init() {
        const client = await client_1.ClientManager.GetClient();
        client.on("message", message => {
            if (message.author.id !== client.user.id) {
                console.log({
                    Message: {
                        Server: message.guild !== null ? message.guild.name : "Direct Message",
                        Channel: message.channel.id,
                        Message: message.content
                    }
                });
                // const isDMChannel = MessageHelper.IsDMChannel(message);
                // if (isDMChannel) {
                //   Sender.SendInfo(
                //     message,
                //     `Go me nasai! ***${
                //       message.author.username
                //     }***, I don't talk to strangers.`,
                //     true
                //   );
                //   return;
                // }
                const isCommand = message_helper_1.MessageHelper.IsCommand(config_1.Config, message);
                const cmdName = isCommand
                    ? message_helper_1.MessageHelper.GetCommand(config_1.Config, message).trim()
                    : "";
                const parameter = message_helper_1.MessageHelper.GetParameter(config_1.Config, message).trim();
                if (isCommand) {
                    const command = new command_model_1.Command(cmdName, parameter);
                    console.log(command);
                    response_handler_1.ResponseHandler.Get(message, command);
                }
            }
        });
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=message.handler.js.map