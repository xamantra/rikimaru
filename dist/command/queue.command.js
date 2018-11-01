"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandQueue {
    constructor(commandFunction, message, command, dm) {
        this.commandFunction = commandFunction;
        this.Completed = false;
        commandFunction.Execute(message, command, dm, () => {
            this.CompleteQueue();
        });
    }
    CompleteQueue() {
        this.Completed = true;
    }
    get Pending() {
        return this.Completed === false;
    }
}
exports.CommandQueue = CommandQueue;
//# sourceMappingURL=queue.command.js.map