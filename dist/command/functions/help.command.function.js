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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL2hlbHAuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhDQUFrRDtBQUVsRCx3REFBb0Q7QUFFcEQsTUFBYSxZQUFZO0lBQ3ZCLGdCQUFlLENBQUM7SUFFVCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQWlCLEVBQUUsT0FBa0IsRUFBRSxFQUFZO1FBQ3RFLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVPLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQ2xELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLEVBQUUsRUFBRTtZQUNOLE9BQU8sQ0FBQyxNQUFNO2lCQUNYLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ1gsSUFBSSxDQUFDLENBQUMsRUFBVyxFQUFFLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsWUFBWSxFQUFFLENBQUMsRUFBRSxrQkFBa0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FDL0QsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFvQixFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU87aUJBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsQ0FBQyxFQUFXLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxZQUFZLEVBQUUsQ0FBQyxFQUFFLG1CQUFtQixPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUM1RCxDQUFDO1lBQ0osQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQW9CLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsT0FBZ0I7UUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLFFBQVEsR0FBRyxnQ0FBYyxDQUFDLFFBQVEsQ0FBQztZQUN6QyxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO2dCQUN2QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO3dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNSLElBQUksRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLEtBQUs7NEJBQ2hDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxXQUFXLEdBQUc7eUJBQ2xDLENBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRztvQkFDWixLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7d0JBQ3ZDLFNBQVMsRUFBRTs0QkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3lCQUMzQjt3QkFDRCxLQUFLLEVBQUUsNEJBQTRCO3dCQUNuQyxXQUFXLEVBQUUsU0FDWCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUN0QiwrQkFBK0I7d0JBQy9CLE1BQU0sRUFBRSxJQUFJO3dCQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDckIsTUFBTSxFQUFFOzRCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7NEJBQy9CLElBQUksRUFBRSxZQUFZO3lCQUNuQjtxQkFDRjtpQkFDRixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdEVELG9DQXNFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2UsIERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IENvbW1hbmRNYW5hZ2VyIH0gZnJvbSBcIi4uL21hbmFnZXIuY29tbWFuZFwiO1xuXG5leHBvcnQgY2xhc3MgSGVscEZ1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBhd2FpdCB0aGlzLlNob3dIZWxwKG1lc3NhZ2UsIGRtKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgU2hvd0hlbHAobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWQobWVzc2FnZSk7XG4gICAgcHJvY2Vzcy5vbihcInVuaGFuZGxlZFJlamVjdGlvblwiLCBjb25zb2xlLmxvZyk7XG4gICAgaWYgKGRtKSB7XG4gICAgICBtZXNzYWdlLm1lbWJlclxuICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgLnRoZW4oKCRtOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgTWVzc2FnZSA8JHskbS5pZH0+IHdhcyBzZW50IHRvIFwiJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX1cIi5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VcbiAgICAgICAgLnJlcGx5KGVtYmVkKVxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBNZXNzYWdlIDwkeyRtLmlkfT4gd2FzIHNlbnQgaW4gXCI8JHttZXNzYWdlLmNoYW5uZWwuaWR9PlwiLmBcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY29tbWFuZHMgPSBDb21tYW5kTWFuYWdlci5Db21tYW5kcztcbiAgICAgIENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCBsaXN0OiBhbnlbXSA9IFtdO1xuICAgICAgICBjb21tYW5kcy5mb3JFYWNoKGNvbW1hbmQgPT4ge1xuICAgICAgICAgIGlmIChjb21tYW5kLkRldk9ubHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgICAgICBuYW1lOiBgXFxuKioqLSR7Y29tbWFuZC5OYW1lfSoqKmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgKiR7Y29tbWFuZC5EZXNjcmlwdGlvbn0qYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgICB1cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiBgKioqUmlraW1hcnUgSGVscCBDZW50ZXIqKipgLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGBIZXkgKioke1xuICAgICAgICAgICAgICBtZXNzYWdlLm1lbWJlci51c2VyLnVzZXJuYW1lXG4gICAgICAgICAgICB9KiohIFRoaXMgYXJlIG15IGNvbW1hbmQgbGlzdDpgLFxuICAgICAgICAgICAgZmllbGRzOiBsaXN0LFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19