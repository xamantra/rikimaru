"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
class CommandManager {
    constructor() {
        this.BotCommands = [];
        console.log(`Constructed: "${CommandManager.name}"`);
    }
    Init() {
        const commands = this.BotCommands;
        commands.push(commands_1.help);
        commands.push(commands_1.dmhelp);
        commands.push(commands_1.when);
        commands.push(commands_1.dmwhen);
        commands.push(commands_1.whenmanga);
        commands.push(commands_1.dmwhenmanga);
        commands.push(commands_1.subscribe);
        commands.push(commands_1.mysubs);
        commands.push(commands_1.ping);
        commands.push(commands_1.dmping);
    }
    get Commands() {
        return this.BotCommands;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.command.js.map