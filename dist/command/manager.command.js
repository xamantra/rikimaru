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
        cmds.push(commands_2.malsync);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBY29CO0FBRXBCLHlDQUE4QztBQUU5QyxNQUFhLGNBQWM7SUFHbEIsTUFBTSxDQUFDLElBQUk7UUFDaEIsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFpQjtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDekMsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLG1CQUNFLE9BQU8sQ0FBQyxJQUNWLHlFQUF5RSxDQUMxRSxDQUNGLENBQUM7cUJBQ0g7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoRGMsMEJBQVcsR0FBaUIsRUFBRSxDQUFDO0FBRGhELHdDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi9ib3QuY29tbWFuZFwiO1xuaW1wb3J0IHtcbiAgaGVscCxcbiAgZG1oZWxwLFxuICB3aGVuLFxuICBkbXdoZW4sXG4gIHN1YixcbiAgdmlld3N1YnMsXG4gIHBpbmcsXG4gIGRtcGluZyxcbiAgbG9nYWxsLFxuICB1bnN1YixcbiAgZG1zdWIsXG4gIGRtdmlld3N1YnMsXG4gIGRtdW5zdWJcbn0gZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IG1hbGJpbmQsIG1hbHN5bmMgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBwcml2YXRlIHN0YXRpYyBCb3RDb21tYW5kczogQm90Q29tbWFuZFtdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNtZHM6IEJvdENvbW1hbmRbXSA9IFtdO1xuXG4gICAgY21kcy5wdXNoKGhlbHApO1xuICAgIGNtZHMucHVzaChkbWhlbHApO1xuICAgIGNtZHMucHVzaCh3aGVuKTtcbiAgICBjbWRzLnB1c2goZG13aGVuKTtcbiAgICBjbWRzLnB1c2goc3ViKTtcbiAgICBjbWRzLnB1c2goZG1zdWIpO1xuICAgIGNtZHMucHVzaCh2aWV3c3Vicyk7XG4gICAgY21kcy5wdXNoKGRtdmlld3N1YnMpO1xuICAgIGNtZHMucHVzaCh1bnN1Yik7XG4gICAgY21kcy5wdXNoKGRtdW5zdWIpO1xuICAgIGNtZHMucHVzaChtYWxiaW5kKTtcbiAgICBjbWRzLnB1c2gobWFsc3luYyk7XG4gICAgY21kcy5wdXNoKHBpbmcpO1xuICAgIGNtZHMucHVzaChkbXBpbmcpO1xuICAgIGNtZHMucHVzaChsb2dhbGwpO1xuXG4gICAgdGhpcy5Cb3RDb21tYW5kcyA9IGNtZHM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldCBDb21tYW5kcygpIHtcbiAgICByZXR1cm4gdGhpcy5Cb3RDb21tYW5kcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgVmFsaWRhdGUoY29tbWFuZDogSUNvbW1hbmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Qm90Q29tbWFuZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gICAgICB0aGlzLkJvdENvbW1hbmRzLmZvckVhY2goY21kID0+IHtcbiAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgICAgIGlmIChjbWQuTmFtZSA9PT0gY29tbWFuZC5OYW1lKSB7XG4gICAgICAgICAgcmVzb2x2ZShjbWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpdGVyYXRpb24gPT09IHRoaXMuQm90Q29tbWFuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgVGhlIGNvbW1hbmQgKioqLSR7XG4gICAgICAgICAgICAgICAgICBjb21tYW5kLk5hbWVcbiAgICAgICAgICAgICAgICB9KioqIGRvZXNuJ3QgZXhpc3RzLiBUeXBlIHRoZSBjb21tYW5kOiAqKiotaGVscCoqKiAgdG8gc2VlIGFsbCBjb21tYW5kcy5gXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19