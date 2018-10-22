"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const container_1 = require("../core/container");
class ResponseHandler {
    constructor() {
        this.Color = container_1.Container.Color;
        console.log(`Constructed: "${ResponseHandler.name}"`);
    }
    Get(config, message, command) {
        const color = this.Color;
        const commands = container_1.Container.BotCommand.GetCommands;
        let iteration = 1;
        commands.forEach(callbackCommand => {
            if (callbackCommand.Name === command.Name) {
                const commandString = command.Name;
                const parameter = command.Parameter;
                if (callbackCommand.ParameterRequired && parameter.trim().length <= 0) {
                    container_1.Container.MediaResult.SendInfo(message, {
                        embed: {
                            color: color.Random,
                            title: `**Rikimaru Rescue Center**`,
                            description: `The command ***-${commandString}*** requires a *parameter*.`,
                            fields: [
                                {
                                    name: `Examples for ***-${commandString}*** : `,
                                    // tslint:disable-next-line:max-line-length
                                    value: container_1.Container.CommandExample.MediaExample(command, 5)
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: container_1.Container.ClientManager.GetClient().user.avatarURL,
                                text: "© Rikimaru"
                            }
                        }
                    }, callbackCommand.DMResponse);
                }
                else {
                    callbackCommand.Callback(message, command, callbackCommand.DMResponse);
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
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.handler.js.map