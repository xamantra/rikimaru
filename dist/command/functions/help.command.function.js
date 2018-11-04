"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../core/client");
const manager_command_1 = require("../manager.command");
class HelpFunction {
    constructor() { }
    async Execute(message, command, dm) {
        await this.ShowHelp(message, dm);
    }
    async ShowHelp(message, dm) {
        const embed = await this.Embed(message);
        process.on("unhandledRejection", console.log);
        if (dm) {
            message.member
                .send(embed)
                .then(($m) => {
                console.log(`Message <${$m.id}> was sent to "${message.author.username}".`);
            })
                .catch((err) => {
                console.log(err.name);
            });
        }
        else {
            message
                .reply(embed)
                .then(($m) => {
                console.log(`Message <${$m.id}> was sent in "<${message.channel.id}>".`);
            })
                .catch((err) => {
                console.log(err.name);
            });
        }
    }
    Embed(message) {
        return new Promise((resolve, reject) => {
            const commands = manager_command_1.CommandManager.Commands;
            client_1.ClientManager.GetClient().then(client => {
                const list = [];
                commands.forEach(command => {
                    if (command.DevOnly === false) {
                        list.push({
                            name: `\n***-${command.Name}***`,
                            value: `*${command.Description}*`
                        });
                    }
                });
                const embed = {
                    embed: {
                        color: message.member.highestRole.color,
                        thumbnail: {
                            url: client.user.avatarURL
                        },
                        title: `***Rikimaru Help Center***`,
                        description: `Hey **${message.member.user.username}**! This are my command list:`,
                        fields: list,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Rikimaru"
                        }
                    }
                };
                resolve(embed);
            });
        });
    }
}
exports.HelpFunction = HelpFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL2hlbHAuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhDQUFrRDtBQUVsRCx3REFBb0Q7QUFFcEQsTUFBYSxZQUFZO0lBQ3ZCLGdCQUFlLENBQUM7SUFFVCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQ2xELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLEVBQUUsRUFBRTtZQUNOLE9BQU8sQ0FBQyxNQUFNO2lCQUNYLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ1gsSUFBSSxDQUFDLENBQUMsRUFBVyxFQUFFLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsWUFBWSxFQUFFLENBQUMsRUFBRSxrQkFBa0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FDL0QsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFvQixFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU87aUJBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsQ0FBQyxFQUFXLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxZQUFZLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUM1RCxDQUFDO1lBQ0osQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQW9CLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsT0FBZ0I7UUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLFFBQVEsR0FBRyxnQ0FBYyxDQUFDLFFBQVEsQ0FBQztZQUN6QyxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO2dCQUN2QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO3dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLEtBQUs7NEJBQ2hDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxXQUFXLEdBQUc7eUJBQ2xDLENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRztvQkFDWixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7d0JBQ3ZDLFNBQVMsRUFBRTs0QkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3lCQUMzQjt3QkFDRCxLQUFLLEVBQUUsNEJBQTRCO3dCQUNuQyxXQUFXLEVBQUUsU0FDWCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUN0QiwrQkFBK0I7d0JBQy9CLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDckIsTUFBTSxFQUFFOzRCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7NEJBQy9CLElBQUksRUFBRSxZQUFZO3lCQUNuQjtxQkFDRjtpQkFDRixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdEVELG9DQXNFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQ29tbWFuZE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci5jb21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVscEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcclxuICAgIGF3YWl0IHRoaXMuU2hvd0hlbHAobWVzc2FnZSwgZG0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBTaG93SGVscChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkKG1lc3NhZ2UpO1xyXG4gICAgcHJvY2Vzcy5vbihcInVuaGFuZGxlZFJlamVjdGlvblwiLCBjb25zb2xlLmxvZyk7XHJcbiAgICBpZiAoZG0pIHtcclxuICAgICAgbWVzc2FnZS5tZW1iZXJcclxuICAgICAgICAuc2VuZChlbWJlZClcclxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBgTWVzc2FnZSA8JHskbS5pZH0+IHdhcyBzZW50IHRvIFwiJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX1cIi5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVzc2FnZVxyXG4gICAgICAgIC5yZXBseShlbWJlZClcclxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICBgTWVzc2FnZSA8JHskbS5pZH0+IHdhcyBzZW50IGluIFwiPCR7bWVzc2FnZS5jaGFubmVsLmlkfT5cIi5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBFbWJlZChtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBjb21tYW5kcyA9IENvbW1hbmRNYW5hZ2VyLkNvbW1hbmRzO1xyXG4gICAgICBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICBjb25zdCBsaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGNvbW1hbmRzLmZvckVhY2goY29tbWFuZCA9PiB7XHJcbiAgICAgICAgICBpZiAoY29tbWFuZC5EZXZPbmx5ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgIG5hbWU6IGBcXG4qKiotJHtjb21tYW5kLk5hbWV9KioqYCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYCoke2NvbW1hbmQuRGVzY3JpcHRpb259KmBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSB7XHJcbiAgICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICAgIHRodW1ibmFpbDoge1xyXG4gICAgICAgICAgICAgIHVybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBgKioqUmlraW1hcnUgSGVscCBDZW50ZXIqKipgLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogYEhleSAqKiR7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZS5tZW1iZXIudXNlci51c2VybmFtZVxyXG4gICAgICAgICAgICB9KiohIFRoaXMgYXJlIG15IGNvbW1hbmQgbGlzdDpgLFxyXG4gICAgICAgICAgICBmaWVsZHM6IGxpc3QsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzb2x2ZShlbWJlZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==