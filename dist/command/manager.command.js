"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_command_function_1 = require("./functions/help.command.function");
const media_command_function_1 = require("./functions/media.command.function");
const bot_command_1 = require("./bot.command");
const ping_command_function_1 = require("./functions/ping.command.function");
class CommandManager {
    constructor() {
        this.BotCommands = [];
        console.log(`Constructed: "${CommandManager.name}"`);
    }
    Init() {
        const commands = this.BotCommands;
        const help = new bot_command_1.BotCommand("help", "Show all my command list.", false, false, new help_command_function_1.HelpFunction());
        const when = new bot_command_1.BotCommand("when", "Search for an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.", true, false, new media_command_function_1.MediaFunction());
        const dmwhen = new bot_command_1.BotCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, true, new media_command_function_1.MediaFunction());
        const subscribe = new bot_command_1.BotCommand("subcribe", "", true, true, null);
        const mysubs = new bot_command_1.BotCommand("viewsubs", "", true, true, null);
        const ping = new bot_command_1.BotCommand("ping", "Just check your ping and the API's ping.", false, false, new ping_command_function_1.PingFunction());
        const dmping = new bot_command_1.BotCommand("dmping", "Just similar with* ***-ping*** *command.", false, true, new ping_command_function_1.PingFunction());
        commands.push(help);
        commands.push(when);
        commands.push(dmwhen);
        commands.push(subscribe);
        commands.push(mysubs);
        commands.push(ping);
        commands.push(dmping);
    }
    get Commands() {
        return this.BotCommands;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.command.js.map