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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBY29CO0FBRXBCLHlDQUE4QztBQUU5QyxNQUFhLGNBQWM7SUFHbEIsTUFBTSxDQUFDLElBQUk7UUFDaEIsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFpQjtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDekMsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLG1CQUNFLE9BQU8sQ0FBQyxJQUNWLHlFQUF5RSxDQUMxRSxDQUNGLENBQUM7cUJBQ0g7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFoRGMsMEJBQVcsR0FBaUIsRUFBRSxDQUFDO0FBRGhELHdDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi9ib3QuY29tbWFuZFwiO1xyXG5pbXBvcnQge1xyXG4gIGhlbHAsXHJcbiAgZG1oZWxwLFxyXG4gIHdoZW4sXHJcbiAgZG13aGVuLFxyXG4gIHN1YixcclxuICB2aWV3c3VicyxcclxuICBwaW5nLFxyXG4gIGRtcGluZyxcclxuICBsb2dhbGwsXHJcbiAgdW5zdWIsXHJcbiAgZG1zdWIsXHJcbiAgZG12aWV3c3VicyxcclxuICBkbXVuc3ViXHJcbn0gZnJvbSBcIi4vY29tbWFuZHNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBtYWxiaW5kLCBtYWxzeW5jIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tYW5kTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgQm90Q29tbWFuZHM6IEJvdENvbW1hbmRbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjbWRzOiBCb3RDb21tYW5kW10gPSBbXTtcclxuXHJcbiAgICBjbWRzLnB1c2goaGVscCk7XHJcbiAgICBjbWRzLnB1c2goZG1oZWxwKTtcclxuICAgIGNtZHMucHVzaCh3aGVuKTtcclxuICAgIGNtZHMucHVzaChkbXdoZW4pO1xyXG4gICAgY21kcy5wdXNoKHN1Yik7XHJcbiAgICBjbWRzLnB1c2goZG1zdWIpO1xyXG4gICAgY21kcy5wdXNoKHZpZXdzdWJzKTtcclxuICAgIGNtZHMucHVzaChkbXZpZXdzdWJzKTtcclxuICAgIGNtZHMucHVzaCh1bnN1Yik7XHJcbiAgICBjbWRzLnB1c2goZG11bnN1Yik7XHJcbiAgICBjbWRzLnB1c2gobWFsYmluZCk7XHJcbiAgICBjbWRzLnB1c2gobWFsc3luYyk7XHJcbiAgICBjbWRzLnB1c2gocGluZyk7XHJcbiAgICBjbWRzLnB1c2goZG1waW5nKTtcclxuICAgIGNtZHMucHVzaChsb2dhbGwpO1xyXG5cclxuICAgIHRoaXMuQm90Q29tbWFuZHMgPSBjbWRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQgQ29tbWFuZHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5Cb3RDb21tYW5kcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgVmFsaWRhdGUoY29tbWFuZDogSUNvbW1hbmQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb3RDb21tYW5kPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xyXG4gICAgICB0aGlzLkJvdENvbW1hbmRzLmZvckVhY2goY21kID0+IHtcclxuICAgICAgICBpdGVyYXRpb24rKztcclxuICAgICAgICBpZiAoY21kLk5hbWUgPT09IGNvbW1hbmQuTmFtZSkge1xyXG4gICAgICAgICAgcmVzb2x2ZShjbWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLkJvdENvbW1hbmRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFRoZSBjb21tYW5kICoqKi0ke1xyXG4gICAgICAgICAgICAgICAgICBjb21tYW5kLk5hbWVcclxuICAgICAgICAgICAgICAgIH0qKiogZG9lc24ndCBleGlzdHMuIFR5cGUgdGhlIGNvbW1hbmQ6ICoqKi1oZWxwKioqICB0byBzZWUgYWxsIGNvbW1hbmRzLmBcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=