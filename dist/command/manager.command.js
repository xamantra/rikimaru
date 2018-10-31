"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const commands_2 = require("./commands");
class CommandManager {
    static Init() {
        const cmds = [];
        cmds.push(commands_1.help);
        cmds.push(commands_1.dmhelp);
        cmds.push(commands_1.when);
        cmds.push(commands_1.dmwhen);
        cmds.push(commands_1.sub);
        cmds.push(commands_1.dmsub);
        cmds.push(commands_1.viewsubs);
        cmds.push(commands_1.dmviewsubs);
        cmds.push(commands_1.unsub);
        cmds.push(commands_1.dmunsub);
        cmds.push(commands_2.malbind);
        cmds.push(commands_2.autosub);
        cmds.push(commands_1.ping);
        cmds.push(commands_1.dmping);
        cmds.push(commands_1.logall);
        this.BotCommands = cmds;
    }
    static get Commands() {
        return this.BotCommands;
    }
    static Validate(command) {
        return new Promise((resolve, reject) => {
            let iteration = 0;
            this.BotCommands.forEach(cmd => {
                iteration++;
                if (cmd.Name === command.Name) {
                    resolve(cmd);
                }
                else {
                    if (iteration === this.BotCommands.length) {
                        reject(new Error(`The command ***-${command.Name}*** doesn't exists. Type the command: ***-help***  to see all commands.`));
                    }
                }
            });
        });
    }
}
CommandManager.BotCommands = [];
exports.CommandManager = CommandManager;
//# sourceMappingURL=manager.command.js.map