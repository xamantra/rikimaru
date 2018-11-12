"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const config_1 = require("./config");
class RescueCenter {
    static async RequireParameter(message, cmd, command) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
                const prefix = config_1.Config.COMMAND_PREFIX;
                let example = cmd.Example;
                if (example === undefined) {
                    example = "";
                }
                else {
                    example = cmd.Example.Get(command, cmd.Example.Count);
                }
                const msg = cmd.ParameterRequired && command.Parameter.length === 0
                    ? {
                        embed: {
                            color: message.member.highestRole.color,
                            title: `**${config_1.Config.BOT_NAME} Rescue Center**`,
                            description: `The command ***${prefix}${command.Name}*** requires a parameter.`,
                            fields: [
                                {
                                    name: `Example|s for ***${prefix}${command.Name}*** : `,
                                    // tslint:disable-next-line:max-line-length
                                    value: example
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: client.user.avatarURL,
                                text: `© ${config_1.Config.BOT_NAME}`
                            }
                        }
                    }
                    : `The command ***${prefix}${command.Name}*** doesn't need a parameter.`;
                resolve(msg);
            });
        });
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzY3VlLmNlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3Jlc2N1ZS5jZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxxQ0FBeUM7QUFFekMscUNBQWtDO0FBRWxDLE1BQWEsWUFBWTtJQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUNsQyxPQUFnQixFQUNoQixHQUFlLEVBQ2YsT0FBaUI7UUFFakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLGNBQWMsQ0FBQztnQkFDckMsSUFBSSxPQUFPLEdBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDL0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUN6QixPQUFPLEdBQUcsRUFBRSxDQUFDO2lCQUNkO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQ0QsTUFBTSxHQUFHLEdBQ1AsR0FBRyxDQUFDLGlCQUFpQixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ3JELENBQUMsQ0FBQzt3QkFDRSxLQUFLLEVBQUU7NEJBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7NEJBQ3ZDLEtBQUssRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLGtCQUFrQjs0QkFDN0MsV0FBVyxFQUFFLGtCQUFrQixNQUFNLEdBQ25DLE9BQU8sQ0FBQyxJQUNWLDJCQUEyQjs0QkFDM0IsTUFBTSxFQUFFO2dDQUNOO29DQUNFLElBQUksRUFBRSxvQkFBb0IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLFFBQVE7b0NBQ3ZELDJDQUEyQztvQ0FDM0MsS0FBSyxFQUFFLE9BQU87aUNBQ2Y7NkJBQ0Y7NEJBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFOzRCQUNyQixNQUFNLEVBQUU7Z0NBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztnQ0FDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTs2QkFDN0I7eUJBQ0Y7cUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLGtCQUFrQixNQUFNLEdBQ3RCLE9BQU8sQ0FBQyxJQUNWLCtCQUErQixDQUFDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBN0NELG9DQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi8uLi9jb21tYW5kL2JvdC5jb21tYW5kXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuL2NvbG9yc1wiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NsaWVudFwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIFJlc2N1ZUNlbnRlciB7XG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgUmVxdWlyZVBhcmFtZXRlcihcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGNtZDogQm90Q29tbWFuZCxcbiAgICBjb21tYW5kOiBJQ29tbWFuZFxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKS50aGVuKGNsaWVudCA9PiB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IENvbmZpZy5DT01NQU5EX1BSRUZJWDtcbiAgICAgICAgbGV0IGV4YW1wbGU6IGFueSA9IGNtZC5FeGFtcGxlO1xuICAgICAgICBpZiAoZXhhbXBsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhhbXBsZSA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhhbXBsZSA9IGNtZC5FeGFtcGxlLkdldChjb21tYW5kLCBjbWQuRXhhbXBsZS5Db3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnOiBhbnkgPVxuICAgICAgICAgIGNtZC5QYXJhbWV0ZXJSZXF1aXJlZCAmJiBjb21tYW5kLlBhcmFtZXRlci5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogYCoqJHtDb25maWcuQk9UX05BTUV9IFJlc2N1ZSBDZW50ZXIqKmAsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYFRoZSBjb21tYW5kICoqKiR7cHJlZml4fSR7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuTmFtZVxuICAgICAgICAgICAgICAgICAgfSoqKiByZXF1aXJlcyBhIHBhcmFtZXRlci5gLFxuICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgRXhhbXBsZXxzIGZvciAqKioke3ByZWZpeH0ke2NvbW1hbmQuTmFtZX0qKiogOiBgLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXhhbXBsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IGBUaGUgY29tbWFuZCAqKioke3ByZWZpeH0ke1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuTmFtZVxuICAgICAgICAgICAgICB9KioqIGRvZXNuJ3QgbmVlZCBhIHBhcmFtZXRlci5gO1xuICAgICAgICByZXNvbHZlKG1zZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19