"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const config_1 = require("./config");
class RescueCenter {
    static async RequireParameter(message, cmd, command) {
        return new Promise((resolve, reject) => {
            const client = client_1.ClientManager.Client;
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
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzY3VlLmNlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3Jlc2N1ZS5jZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxxQ0FBeUM7QUFFekMscUNBQWtDO0FBRWxDLE1BQWEsWUFBWTtJQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUNsQyxPQUFnQixFQUNoQixHQUFlLEVBQ2YsT0FBaUI7UUFFakIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLE1BQU0sR0FBRyxlQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3JDLElBQUksT0FBTyxHQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDL0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUN6QixPQUFPLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsTUFBTSxHQUFHLEdBQ1AsR0FBRyxDQUFDLGlCQUFpQixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ3JELENBQUMsQ0FBQztvQkFDRSxLQUFLLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7d0JBQ3ZDLEtBQUssRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLGtCQUFrQjt3QkFDN0MsV0FBVyxFQUFFLGtCQUFrQixNQUFNLEdBQ25DLE9BQU8sQ0FBQyxJQUNWLDJCQUEyQjt3QkFDM0IsTUFBTSxFQUFFOzRCQUNOO2dDQUNFLElBQUksRUFBRSxvQkFBb0IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLFFBQVE7Z0NBQ3ZELDJDQUEyQztnQ0FDM0MsS0FBSyxFQUFFLE9BQU87NkJBQ2Y7eUJBQ0Y7d0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO3dCQUNyQixNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzs0QkFDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTt5QkFDN0I7cUJBQ0Y7aUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLGtCQUFrQixNQUFNLEdBQ3RCLE9BQU8sQ0FBQyxJQUNWLCtCQUErQixDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNUNELG9DQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi8uLi9jb21tYW5kL2JvdC5jb21tYW5kXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2xpZW50XCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgUmVzY3VlQ2VudGVyIHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBSZXF1aXJlUGFyYW1ldGVyKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY21kOiBCb3RDb21tYW5kLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBDbGllbnRNYW5hZ2VyLkNsaWVudDtcbiAgICAgIGNvbnN0IHByZWZpeCA9IENvbmZpZy5DT01NQU5EX1BSRUZJWDtcbiAgICAgIGxldCBleGFtcGxlOiBhbnkgPSBjbWQuRXhhbXBsZTtcbiAgICAgIGlmIChleGFtcGxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXhhbXBsZSA9IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBleGFtcGxlID0gY21kLkV4YW1wbGUuR2V0KGNvbW1hbmQsIGNtZC5FeGFtcGxlLkNvdW50KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1zZzogYW55ID1cbiAgICAgICAgY21kLlBhcmFtZXRlclJlcXVpcmVkICYmIGNvbW1hbmQuUGFyYW1ldGVyLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBlbWJlZDoge1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICAgICAgICB0aXRsZTogYCoqJHtDb25maWcuQk9UX05BTUV9IFJlc2N1ZSBDZW50ZXIqKmAsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBUaGUgY29tbWFuZCAqKioke3ByZWZpeH0ke1xuICAgICAgICAgICAgICAgICAgY29tbWFuZC5OYW1lXG4gICAgICAgICAgICAgICAgfSoqKiByZXF1aXJlcyBhIHBhcmFtZXRlci5gLFxuICAgICAgICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgRXhhbXBsZXxzIGZvciAqKioke3ByZWZpeH0ke2NvbW1hbmQuTmFtZX0qKiogOiBgLFxuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBleGFtcGxlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IGBUaGUgY29tbWFuZCAqKioke3ByZWZpeH0ke1xuICAgICAgICAgICAgICBjb21tYW5kLk5hbWVcbiAgICAgICAgICAgIH0qKiogZG9lc24ndCBuZWVkIGEgcGFyYW1ldGVyLmA7XG4gICAgICByZXNvbHZlKG1zZyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==