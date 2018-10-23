"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_command_1 = require("./bot.command");
const enums_1 = require("../core/enums");
const functions_1 = require("./functions");
const examples_1 = require("./examples");
exports.help = new bot_command_1.BotCommand("help", "Show all my command list.", false, enums_1.Response.ChannelReply, functions_1.helpFunction);
exports.dmhelp = new bot_command_1.BotCommand("dmhelp", "Just similar with the* ***-help*** *command.", false, enums_1.Response.DirectMessage, functions_1.helpFunction);
exports.when = new bot_command_1.BotCommand("when", `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`, true, enums_1.Response.ChannelReply, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.dmwhen = new bot_command_1.BotCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, enums_1.Response.DirectMessage, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.whenmanga = new bot_command_1.BotCommand("whenmanga", `Search for a schedule of a manga that matches the keyword/parameter.\nYou can either put the exact manga title or just a keyword.`, true, enums_1.Response.ChannelReply, functions_1.whenMangaFunction, examples_1.mediaExample);
exports.dmwhenmanga = new bot_command_1.BotCommand("dmwhenmanga", `Just similar with the* ***-whenmanga*** *command.`, true, enums_1.Response.DirectMessage, functions_1.whenMangaFunction, examples_1.mediaExample);
exports.subscribe = new bot_command_1.BotCommand("subscribe", "", true, enums_1.Response.DirectMessage, null);
exports.mysubs = new bot_command_1.BotCommand("viewsubs", "", true, enums_1.Response.DirectMessage, null);
exports.ping = new bot_command_1.BotCommand("ping", "Just check your ping and the API's ping.", false, enums_1.Response.ChannelReply, functions_1.pingFunction);
exports.dmping = new bot_command_1.BotCommand("dmping", "Just similar with* ***-ping*** *command.", false, enums_1.Response.DirectMessage, functions_1.pingFunction);
//# sourceMappingURL=commands.js.map