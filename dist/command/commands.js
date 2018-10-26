"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_command_1 = require("./bot.command");
const enums_1 = require("./../core/enums");
const functions_1 = require("./functions");
const examples_1 = require("./examples");
exports.help = new bot_command_1.BotCommand("help", "Show all my command list.", false, enums_1.Response.ChannelReply, functions_1.helpFunction);
exports.dmhelp = new bot_command_1.BotCommand("dmhelp", "Just similar with the* ***-help*** *command.", false, enums_1.Response.DirectMessage, functions_1.helpFunction);
exports.when = new bot_command_1.BotCommand("when", `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`, true, enums_1.Response.ChannelReply, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.dmwhen = new bot_command_1.BotCommand("dmwhen", "Just similar with the* ***-when*** *command.", true, enums_1.Response.DirectMessage, functions_1.whenAnimeFunction, examples_1.mediaExample);
exports.subscribe = new bot_command_1.BotCommand("subscribe", "Subscribe to an ongoing anime. You can provide keyword or anime title.", true, enums_1.Response.DirectMessage, functions_1.subscribeFunction, examples_1.mediaExample);
exports.mysubs = new bot_command_1.BotCommand("mysubs", "View your own subscription list.", false, enums_1.Response.ChannelReply, functions_1.viewSubsFunction);
exports.dmmysubs = new bot_command_1.BotCommand("dmmysubs", "Just similar with ***-mysubs***.", false, enums_1.Response.DirectMessage, functions_1.viewSubsFunction);
exports.subsof = new bot_command_1.BotCommand("subsof", "View other member's subscriptions.", true, enums_1.Response.ChannelReply, functions_1.viewSubsFunction);
exports.unsub = new bot_command_1.BotCommand("unsub", "Unsubscribe to an ongoing anime. You can provide keyword or anime title.", true, enums_1.Response.DirectMessage, functions_1.unsubFunction, examples_1.mediaExample);
exports.ping = new bot_command_1.BotCommand("ping", "Just check your ping and the API's ping.", false, enums_1.Response.ChannelReply, functions_1.pingFunction);
exports.dmping = new bot_command_1.BotCommand("dmping", "Just similar with* ***-ping*** *command.", false, enums_1.Response.DirectMessage, functions_1.pingFunction);
exports.logall = new bot_command_1.BotCommand("logall", "Developer only..", false, enums_1.Response.DirectMessage, functions_1.logAllFunction, null, true);
//# sourceMappingURL=commands.js.map