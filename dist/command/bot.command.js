"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./../core/container");
const callback_command_1 = require("./callback.command");
class BotCommand {
    constructor() {
        this.CallbackCommands = [];
        this.Anilist = container_1.Container.Anilist;
        this.HelpCommand = container_1.Container.HelpCommand;
        this.Ping = container_1.Container.Ping;
        this.MediaHelper = container_1.Container.MediaHelper;
        console.log(`Constructed: "${BotCommand.name}"`);
    }
    Init() {
        const aniList = this.Anilist;
        const commands = this.CallbackCommands;
        const help = this.HelpCommand;
        const ping = this.Ping;
        const helper = this.MediaHelper;
        commands.push(new callback_command_1.CallbackCommand("help", "Show all my command list.", false, false, (message, command, dm) => {
            help.ShowHelp(message);
        }));
        commands.push(new callback_command_1.CallbackCommand("when", "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.", true, false, async (message, command, dm) => {
            helper.Handle(aniList, message, command, dm);
        }));
        commands.push(new callback_command_1.CallbackCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, true, async (message, command, dm) => {
            helper.Handle(aniList, message, command, dm);
        }));
        commands.push(new callback_command_1.CallbackCommand("ping", "Just check your ping and the API's ping.", false, false, async (message, command, dm) => {
            ping.Get(message, dm);
        }));
        commands.push(new callback_command_1.CallbackCommand("dmping", "Just similar with* ***-ping*** *command.", false, true, async (message, command, dm) => {
            ping.Get(message, dm);
        }));
    }
    get GetCommands() {
        return this.CallbackCommands;
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map