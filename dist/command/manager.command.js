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
                        console.log(`Unknown Command.`);
                        resolve(null);
                    }
                }
            });
        });
    }
}
CommandManager.BotCommands = [];
exports.CommandManager = CommandManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBY29CO0FBRXBCLHlDQUE4QztBQUc5QyxNQUFhLGNBQWM7SUFHbEIsTUFBTSxDQUFDLElBQUk7UUFDaEIsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFpQjtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2Y7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUEzQ2MsMEJBQVcsR0FBaUIsRUFBRSxDQUFDO0FBRGhELHdDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi9ib3QuY29tbWFuZFwiO1xuaW1wb3J0IHtcbiAgaGVscCxcbiAgZG1oZWxwLFxuICB3aGVuLFxuICBkbXdoZW4sXG4gIHN1YixcbiAgdmlld3N1YnMsXG4gIHBpbmcsXG4gIGRtcGluZyxcbiAgbG9nYWxsLFxuICB1bnN1YixcbiAgZG1zdWIsXG4gIGRtdmlld3N1YnMsXG4gIGRtdW5zdWJcbn0gZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IG1hbGJpbmQsIG1hbHN5bmMgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kTWFuYWdlciB7XG4gIHByaXZhdGUgc3RhdGljIEJvdENvbW1hbmRzOiBCb3RDb21tYW5kW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIEluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY21kczogQm90Q29tbWFuZFtdID0gW107XG5cbiAgICBjbWRzLnB1c2goaGVscCk7XG4gICAgY21kcy5wdXNoKGRtaGVscCk7XG4gICAgY21kcy5wdXNoKHdoZW4pO1xuICAgIGNtZHMucHVzaChkbXdoZW4pO1xuICAgIGNtZHMucHVzaChzdWIpO1xuICAgIGNtZHMucHVzaChkbXN1Yik7XG4gICAgY21kcy5wdXNoKHZpZXdzdWJzKTtcbiAgICBjbWRzLnB1c2goZG12aWV3c3Vicyk7XG4gICAgY21kcy5wdXNoKHVuc3ViKTtcbiAgICBjbWRzLnB1c2goZG11bnN1Yik7XG4gICAgY21kcy5wdXNoKG1hbGJpbmQpO1xuICAgIGNtZHMucHVzaChtYWxzeW5jKTtcbiAgICBjbWRzLnB1c2gocGluZyk7XG4gICAgY21kcy5wdXNoKGRtcGluZyk7XG4gICAgY21kcy5wdXNoKGxvZ2FsbCk7XG5cbiAgICB0aGlzLkJvdENvbW1hbmRzID0gY21kcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IENvbW1hbmRzKCkge1xuICAgIHJldHVybiB0aGlzLkJvdENvbW1hbmRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBWYWxpZGF0ZShjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb3RDb21tYW5kPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgaXRlcmF0aW9uID0gMDtcbiAgICAgIHRoaXMuQm90Q29tbWFuZHMuZm9yRWFjaChjbWQgPT4ge1xuICAgICAgICBpdGVyYXRpb24rKztcbiAgICAgICAgaWYgKGNtZC5OYW1lID09PSBjb21tYW5kLk5hbWUpIHtcbiAgICAgICAgICByZXNvbHZlKGNtZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiA9PT0gdGhpcy5Cb3RDb21tYW5kcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIENvbW1hbmQuYCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==