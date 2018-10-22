"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../../core/container");
class HelpFunction {
    constructor() {
        this.ClientManager = container_1.Container.ClientManager;
        this.Color = container_1.Container.Color;
        console.log(`Constructed: "${HelpFunction.name}"`);
    }
    Execute(message, command, dm) {
        this.ShowHelp(message, dm);
    }
    ShowHelp(message, dm) {
        if (dm) {
            message.member.send(this.Embed(message));
        }
        else {
            message.reply(this.Embed(message));
        }
    }
    Embed(message) {
        const commands = container_1.Container.CommandManager.Commands;
        const client = this.ClientManager;
        const list = [];
        const color = this.Color;
        commands.forEach(command => {
            list.push({
                name: `\n***-${command.Name}***`,
                value: `*${command.Description}*`
            });
        });
        const embed = {
            embed: {
                color: color.Random,
                thumbnail: {
                    url: client.GetClient().user.avatarURL
                },
                title: `***Rikimaru Help Center***`,
                description: `Hey **${message.member.user.username}**! This are my command list:`,
                fields: list,
                timestamp: new Date(),
                footer: {
                    icon_url: client.GetClient().user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.HelpFunction = HelpFunction;
//# sourceMappingURL=help.command.function.js.map