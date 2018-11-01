"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandScheduler {
    static Run(message, command, dm, onComplete) {
        this.CommandQueues.forEach(cq => {
            if (cq.Pending) {
                cq.commandFunction.Execute(message, command, dm, onComplete);
            }
        });
    }
    static Queue(commandQueue) {
        this.CommandQueues.push(commandQueue);
    }
}
CommandScheduler.CommandQueues = [];
exports.CommandScheduler = CommandScheduler;
//# sourceMappingURL=scheduler.command.js.map