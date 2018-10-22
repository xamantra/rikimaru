"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_model_1 = require("../models/command.model");
const container_1 = require("../core/container");
class MessageHandler {
    constructor() {
        this.Config = container_1.Container.Config;
        this.Helper = container_1.Container.MessageHelper;
        this.ClientManager = container_1.Container.ClientManager;
        console.log(`Constructed: "${MessageHandler.name}"`);
    }
    Init() {
        const config = this.Config;
        const helper = this.Helper;
        const client = this.ClientManager;
        client.GetClient().on("message", message => {
            console.log({
                Message: {
                    Server: message.guild !== null ? message.guild.name : "Direct Message",
                    Channel: message.channel.id,
                    Message: message.content
                }
            });
            const isDMChannel = helper.IsDMChannel(message);
            if (isDMChannel) {
                container_1.Container.MediaResult.SendInfo(message, `Go me nasai! ***${message.author.username}***, I don't talk to strangers.`, true);
                return;
            }
            const isCommand = helper.IsCommand(config, message);
            const cmdName = isCommand
                ? helper.GetCommand(config, message).trim()
                : "";
            const parameter = helper.GetParameter(config, message).trim();
            if (isCommand) {
                const command = new command_model_1.Command(cmdName, parameter);
                console.log(command);
                const response = container_1.Container.ResponseHandler;
                response.Get(message, command);
            }
        });
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=message.handler.js.map