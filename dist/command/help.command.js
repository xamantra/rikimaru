"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../core/container");
const colors_1 = require("../core/colors");
class HelpCommand {
    static ShowHelp(message) {
        const isDM = container_1.Container.MessageHelper.IsDMChannel(message);
        if (isDM) {
            message.member.send(this.Embed(message));
        }
        else {
            message.reply(this.Embed(message));
        }
    }
    static Embed(message) {
        const commands = container_1.Container.BotCommand.GetCommands;
        const list = [];
        commands.forEach(command => {
            list.push({
                name: `\n***-${command.Name}***`,
                value: `*${command.Description}*`
            });
        });
        const embed = {
            embed: {
                color: colors_1.Color.Random,
                thumbnail: {
                    url: container_1.Container.ClientManager.GetClient().user.avatarURL
                },
                title: `***Rikimaru Help Center***`,
                description: `Hey **${message.member.user.username}**! This are my command list:`,
                fields: list,
                timestamp: new Date(),
                footer: {
                    icon_url: container_1.Container.ClientManager.GetClient().user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.command.js.map