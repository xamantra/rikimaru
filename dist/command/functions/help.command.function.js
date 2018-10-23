"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../core/client");
const manager_command_1 = require("../manager.command");
const colors_1 = require("../../core/colors");
class HelpFunction {
    constructor() {
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
        const commands = manager_command_1.CommandManager.Commands;
        const client = client_1.ClientManager.GetClient;
        const list = [];
        commands.forEach(command => {
            if (command.DevOnly === false) {
                list.push({
                    name: `\n***-${command.Name}***`,
                    value: `*${command.Description}*`
                });
            }
        });
        const embed = {
            embed: {
                color: colors_1.Color.Random,
                thumbnail: {
                    url: client.user.avatarURL
                },
                title: `***Rikimaru Help Center***`,
                description: `Hey **${message.member.user.username}**! This are my command list:`,
                fields: list,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.HelpFunction = HelpFunction;
//# sourceMappingURL=help.command.function.js.map