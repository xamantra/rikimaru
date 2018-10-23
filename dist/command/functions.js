"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_command_function_1 = require("./functions/help.command.function");
const media_command_function_1 = require("./functions/media.command.function");
const ping_command_function_1 = require("./functions/ping.command.function");
exports.helpFunction = new help_command_function_1.HelpFunction();
exports.whenAnimeFunction = new media_command_function_1.MediaFunction("anime");
exports.whenMangaFunction = new media_command_function_1.MediaFunction("manga");
exports.pingFunction = new ping_command_function_1.PingFunction();
//# sourceMappingURL=functions.js.map