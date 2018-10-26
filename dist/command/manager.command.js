"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
class CommandManager {
    static Init() {
        const cmds = [];
        cmds.push(commands_1.help);
        cmds.push(commands_1.dmhelp);
        cmds.push(commands_1.when);
        cmds.push(commands_1.dmwhen);
        cmds.push(commands_1.subscribe);
        cmds.push(commands_1.viewsubs);
        cmds.push(commands_1.dmmysubs);
        cmds.push(commands_1.unsub);
        cmds.push(commands_1.ping);
        cmds.push(commands_1.dmping);
        cmds.push(commands_1.logall);
        this.BotCommands = cmds;
    }
    static get Commands() {
        return this.BotCommands;
    }
}
CommandManager.BotCommands = [];
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.command.js.map