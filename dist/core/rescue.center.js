"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
class RescueCenter {
    // private static Color: Color = Container.Color;
    static RequireParameter(cmd, command) {
        const color = container_1.Container.Color;
        const msg = cmd.ParameterRequired
            ? {
                embed: {
                    color: color.Random,
                    title: `**Rikimaru Rescue Center**`,
                    description: `The command ***-${command.Name}*** requires a parameter.`,
                    fields: [
                        {
                            name: `Example|s for ***-${command.Name}*** : `,
                            // tslint:disable-next-line:max-line-length
                            value: cmd.Example.Get(command, cmd.Example.Count)
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: container_1.Container.ClientManager.GetClient().user.avatarURL,
                        text: "© Rikimaru"
                    }
                }
            }
            : `The command ***-${command.Name}*** doesn't need a parameter.`;
        return msg;
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=rescue.center.js.map