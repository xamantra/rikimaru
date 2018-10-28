"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const client_1 = require("./client");
class RescueCenter {
    static async RequireParameter(cmd, command) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
                let example = cmd.Example;
                if (example === undefined) {
                    example = "";
                }
                else {
                    example = cmd.Example.Get(command, cmd.Example.Count);
                }
                const msg = cmd.ParameterRequired && command.Parameter.length === 0
                    ? {
                        embed: {
                            color: colors_1.Color.Random,
                            title: `**Rikimaru Rescue Center**`,
                            description: `The command ***-${command.Name}*** requires a parameter.`,
                            fields: [
                                {
                                    name: `Example|s for ***-${command.Name}*** : `,
                                    // tslint:disable-next-line:max-line-length
                                    value: example
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: client.user.avatarURL,
                                text: "© Rikimaru"
                            }
                        }
                    }
                    : `The command ***-${command.Name}*** doesn't need a parameter.`;
                resolve(msg);
            });
        });
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=rescue.center.js.map