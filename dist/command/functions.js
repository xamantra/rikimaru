"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_command_function_1 = require("./functions/help.command.function");
const tweak_command_function_1 = require("./functions/tweak.command.function");
const unsub_command_function_1 = require("./functions/unsub.command.function");
const viewsubs_command_function_1 = require("./functions/viewsubs.command.function");
const logall_command_function_1 = require("./functions/logall.command.function");
const subscribe_command_function_1 = require("./functions/subscribe.command.function");
const media_command_function_1 = require("./functions/media.command.function");
const ping_command_function_1 = require("./functions/ping.command.function");
exports.helpFunction = new help_command_function_1.HelpFunction();
exports.whenAnimeFunction = new media_command_function_1.MediaFunction();
exports.pingFunction = new ping_command_function_1.PingFunction();
exports.subscribeFunction = new subscribe_command_function_1.SubscribeFunction();
exports.viewSubsFunction = new viewsubs_command_function_1.ViewSubsFunction();
exports.unsubFunction = new unsub_command_function_1.UnsubFunction();
exports.logAllFunction = new logall_command_function_1.LogAllFunction();
exports.tweakFunction = new tweak_command_function_1.TweakFunction();
//# sourceMappingURL=functions.js.map