"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_command_function_1 = require("./functions/help.command.function");
const enums_1 = require("./../core/enums");
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
        const helpFunction = new help_command_function_1.HelpFunction();
        const whenAnimeFunction = new media_command_function_1.MediaFunction("anime");
        const whenMangaFunction = new media_command_function_1.MediaFunction("manga");
        const pingFunction = new ping_command_function_1.PingFunction();
        const help = new bot_command_1.BotCommand("help", "Show all my command list.", false, enums_1.Response.ChannelReply, helpFunction);
        const dmhelp = new bot_command_1.BotCommand("dmhelp", "Just similar with the* ***-help*** *command.", false, enums_1.Response.DirectMessage, helpFunction);
        const when = new bot_command_1.BotCommand("when", `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`, true, enums_1.Response.ChannelReply, whenAnimeFunction);
        const dmwhen = new bot_command_1.BotCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, enums_1.Response.DirectMessage, whenAnimeFunction);
        const whenmanga = new bot_command_1.BotCommand("whenmanga", `Search for a schedule of a manga that matches the keyword/parameter.\nYou can either put the exact manga title or just a keyword.`, true, enums_1.Response.ChannelReply, whenMangaFunction);
        const dmwhenmanga = new bot_command_1.BotCommand("dmwhenmanga", `Just similar with the* ***-whenmanga*** *command.`, true, enums_1.Response.DirectMessage, whenMangaFunction);
        const subscribe = new bot_command_1.BotCommand("subcribe", "", true, enums_1.Response.DirectMessage, null);
        const mysubs = new bot_command_1.BotCommand("viewsubs", "", true, enums_1.Response.DirectMessage, null);
        const ping = new bot_command_1.BotCommand("ping", "Just check your ping and the API's ping.", false, enums_1.Response.ChannelReply, pingFunction);
        const dmping = new bot_command_1.BotCommand("dmping", "Just similar with* ***-ping*** *command.", false, enums_1.Response.DirectMessage, pingFunction);
        commands.push(help);
        commands.push(dmhelp);
        commands.push(when);
        commands.push(dmwhen);
        commands.push(whenmanga);
        commands.push(dmwhenmanga);
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