"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../core/client");
const manager_command_1 = require("../manager.command");
const colors_1 = require("../../core/colors");
class HelpFunction {
    constructor() {
        console.log(`Constructed: "${HelpFunction.name}"`);
    }
    async Execute(message, command, dm) {
        await this.ShowHelp(message, dm);
    }
    async ShowHelp(message, dm) {
        this.Embed(message).then(async (embed) => {
            if (dm) {
                await message.member.send(embed);
                return;
            }
            await message.reply(embed);
        });
    }
    async Embed(message) {
        const commands = manager_command_1.CommandManager.Commands;
        const client = await client_1.ClientManager.GetClient;
        const list = [];
        await commands.forEach(async (command) => {
            if (command.DevOnly === false) {
                await list.push({
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