"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callback_command_1 = require("./callback.command");
const container_1 = require("../core/container");
const media_helper_1 = require("../helpers/media.helper");
const ping_1 = require("../core/ping");
const help_command_1 = require("./help.command");
class BotCommand {
    constructor() {
        this.CallbackCommands = [];
        this.Anilist = container_1.Container.Anilist;
        console.log(`Response is ready...`);
    }
    Init() {
        const aniList = this.Anilist;
        this.CallbackCommands.push(new callback_command_1.CallbackCommand("help", "Show all my command list.", false, false, (message, command, dm) => {
            help_command_1.HelpCommand.ShowHelp(message);
        }));
        this.CallbackCommands.push(new callback_command_1.CallbackCommand("when", "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.", true, false, async (message, command, dm) => {
            media_helper_1.MediaHelper.Handle(aniList, message, command, dm);
        }));
        this.CallbackCommands.push(new callback_command_1.CallbackCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, true, async (message, command, dm) => {
            media_helper_1.MediaHelper.Handle(aniList, message, command, dm);
        }));
        this.CallbackCommands.push(new callback_command_1.CallbackCommand("ping", "Just check your ping and the API's ping.", false, false, async (message, command, dm) => {
            ping_1.Ping.Get(message, dm);
        }));
        this.CallbackCommands.push(new callback_command_1.CallbackCommand("dmping", "Just similar with* ***-ping*** *command.", false, true, async (message, command, dm) => {
            ping_1.Ping.Get(message, dm);
        }));
    }
    get GetCommands() {
        return this.CallbackCommands;
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=bot.command.js.map