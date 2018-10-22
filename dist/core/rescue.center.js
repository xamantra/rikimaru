"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
class RescueCenter {
    // private static Color: Color = Container.Color;
    static Embed(command) {
        const color = container_1.Container.Color;
        return {
            embed: {
                color: color.Random,
                title: `**Rikimaru Rescue Center**`,
                description: `The command ***-${command.Name}*** requires a *parameter*.`,
                fields: [
                    {
                        name: `Examples for ***-${command.Name}*** : `,
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
        };
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=rescue.center.js.map