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
        cmds.push(commands_2.anibind);
        cmds.push(commands_2.anisync);
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
            for (let i = 0; i < this.BotCommands.length; i++) {
                const cmd = this.BotCommands[i];
                if (cmd.Name === command.Name) {
                    resolve(cmd);
                    return;
                }
                else {
                    if (i === this.BotCommands.length - 1) {
                        console.log(`Unknown Command.`);
                        resolve(null);
                    }
                }
            }
        });
    }
}
CommandManager.BotCommands = [];
exports.CommandManager = CommandManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBY29CO0FBRXBCLHlDQUFnRTtBQUVoRSxNQUFhLGNBQWM7SUFHbEIsTUFBTSxDQUFDLElBQUk7UUFDaEIsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQU0sQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQUssQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQU8sQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBSSxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBTSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVNLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFpQjtRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDYixPQUFPO2lCQUNSO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2Y7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE3Q2MsMEJBQVcsR0FBaUIsRUFBRSxDQUFDO0FBRGhELHdDQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi9ib3QuY29tbWFuZFwiO1xuaW1wb3J0IHtcbiAgaGVscCxcbiAgZG1oZWxwLFxuICB3aGVuLFxuICBkbXdoZW4sXG4gIHN1YixcbiAgdmlld3N1YnMsXG4gIHBpbmcsXG4gIGRtcGluZyxcbiAgbG9nYWxsLFxuICB1bnN1YixcbiAgZG1zdWIsXG4gIGRtdmlld3N1YnMsXG4gIGRtdW5zdWJcbn0gZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IG1hbGJpbmQsIG1hbHN5bmMsIGFuaWJpbmQsIGFuaXN5bmMgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgY2xhc3MgQ29tbWFuZE1hbmFnZXIge1xuICBwcml2YXRlIHN0YXRpYyBCb3RDb21tYW5kczogQm90Q29tbWFuZFtdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNtZHM6IEJvdENvbW1hbmRbXSA9IFtdO1xuXG4gICAgY21kcy5wdXNoKGhlbHApO1xuICAgIGNtZHMucHVzaChkbWhlbHApO1xuICAgIGNtZHMucHVzaCh3aGVuKTtcbiAgICBjbWRzLnB1c2goZG13aGVuKTtcbiAgICBjbWRzLnB1c2goc3ViKTtcbiAgICBjbWRzLnB1c2goZG1zdWIpO1xuICAgIGNtZHMucHVzaCh2aWV3c3Vicyk7XG4gICAgY21kcy5wdXNoKGRtdmlld3N1YnMpO1xuICAgIGNtZHMucHVzaCh1bnN1Yik7XG4gICAgY21kcy5wdXNoKGRtdW5zdWIpO1xuICAgIGNtZHMucHVzaChtYWxiaW5kKTtcbiAgICBjbWRzLnB1c2gobWFsc3luYyk7XG4gICAgY21kcy5wdXNoKGFuaWJpbmQpO1xuICAgIGNtZHMucHVzaChhbmlzeW5jKTtcbiAgICBjbWRzLnB1c2gocGluZyk7XG4gICAgY21kcy5wdXNoKGRtcGluZyk7XG4gICAgY21kcy5wdXNoKGxvZ2FsbCk7XG5cbiAgICB0aGlzLkJvdENvbW1hbmRzID0gY21kcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IENvbW1hbmRzKCkge1xuICAgIHJldHVybiB0aGlzLkJvdENvbW1hbmRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBWYWxpZGF0ZShjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb3RDb21tYW5kPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuQm90Q29tbWFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY21kID0gdGhpcy5Cb3RDb21tYW5kc1tpXTtcbiAgICAgICAgaWYgKGNtZC5OYW1lID09PSBjb21tYW5kLk5hbWUpIHtcbiAgICAgICAgICByZXNvbHZlKGNtZCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpID09PSB0aGlzLkJvdENvbW1hbmRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmtub3duIENvbW1hbmQuYCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=