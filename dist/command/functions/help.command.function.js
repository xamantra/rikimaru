"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../core/client");
const manager_command_1 = require("../manager.command");
const awaiter_1 = require("../awaiter");
const message_helper_1 = require("../../helpers/message.helper");
class HelpFunction {
    constructor() {
        console.log(`Constructed: "${HelpFunction.name}"`);
    }
    async Execute(message, command, dm) {
        await this.ShowHelp(message, dm);
    }
    ShowHelp(message, dm) {
        awaiter_1.Awaiter.Send(message, 1000, (m) => {
            this.Embed(message).then(embed => {
                message_helper_1.MessageHelper.Delete(m);
                process.on("unhandledRejection", console.log);
                if (dm) {
                    message.member
                        .send(embed)
                        .then(($m) => {
                        console.log(`Message <${$m.id}> was sent to "${message.author.username}".`);
                    })
                        .catch((err) => {
                        console.log(err.name);
                    });
                }
                else {
                    message
                        .reply(embed)
                        .then(($m) => {
                        console.log(`Message <${$m.id}> was sent in "<${message.channel.id}>".`);
                    })
                        .catch((err) => {
                        console.log(err.name);
                    });
                }
            });
        });
    }
    Embed(message) {
        return new Promise((resolve, reject) => {
            const commands = manager_command_1.CommandManager.Commands;
            client_1.ClientManager.GetClient().then(client => {
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
                        color: message.member.highestRole.color,
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
                resolve(embed);
            });
        });
    }
}
exports.HelpFunction = HelpFunction;
//# sourceMappingURL=help.command.function.js.map