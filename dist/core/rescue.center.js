"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
class RescueCenter {
    static async RequireParameter(message, cmd, command) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
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
                            title: `**Rikimaru Rescue Center**`,
                            description: `The command ***-${command.Name}*** requires a parameter.`,
                            fields: [
                                {
                                    name: `Example|s for ***-${command.Name}*** : `,
                                    // tslint:disable-next-line:max-line-length
                                    value: example
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: client.user.avatarURL,
                                text: "© Rikimaru"
                            }
                        }
                    }
                    : `The command ***-${command.Name}*** doesn't need a parameter.`;
                resolve(msg);
            });
        });
    }
}
exports.RescueCenter = RescueCenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzY3VlLmNlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3Jlc2N1ZS5jZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxxQ0FBeUM7QUFHekMsTUFBYSxZQUFZO0lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQ2xDLE9BQWdCLEVBQ2hCLEdBQWUsRUFDZixPQUFpQjtRQUVqQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLE9BQU8sR0FBUSxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQ3pCLE9BQU8sR0FBRyxFQUFFLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2RDtnQkFDRCxNQUFNLEdBQUcsR0FDUCxHQUFHLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDckQsQ0FBQyxDQUFDO3dCQUNFLEtBQUssRUFBRTs0QkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSzs0QkFDdkMsS0FBSyxFQUFFLDRCQUE0Qjs0QkFDbkMsV0FBVyxFQUFFLG1CQUNYLE9BQU8sQ0FBQyxJQUNWLDJCQUEyQjs0QkFDM0IsTUFBTSxFQUFFO2dDQUNOO29DQUNFLElBQUksRUFBRSxxQkFBcUIsT0FBTyxDQUFDLElBQUksUUFBUTtvQ0FDL0MsMkNBQTJDO29DQUMzQyxLQUFLLEVBQUUsT0FBTztpQ0FDZjs2QkFDRjs0QkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7NEJBQ3JCLE1BQU0sRUFBRTtnQ0FDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2dDQUMvQixJQUFJLEVBQUUsWUFBWTs2QkFDbkI7eUJBQ0Y7cUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLG1CQUFtQixPQUFPLENBQUMsSUFBSSwrQkFBK0IsQ0FBQztnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTFDRCxvQ0EwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3RDb21tYW5kIH0gZnJvbSBcIi4vLi4vY29tbWFuZC9ib3QuY29tbWFuZFwiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvcnNcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi9jbGllbnRcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgUmVzY3VlQ2VudGVyIHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBSZXF1aXJlUGFyYW1ldGVyKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgY21kOiBCb3RDb21tYW5kLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpLnRoZW4oY2xpZW50ID0+IHtcbiAgICAgICAgbGV0IGV4YW1wbGU6IGFueSA9IGNtZC5FeGFtcGxlO1xuICAgICAgICBpZiAoZXhhbXBsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXhhbXBsZSA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhhbXBsZSA9IGNtZC5FeGFtcGxlLkdldChjb21tYW5kLCBjbWQuRXhhbXBsZS5Db3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnOiBhbnkgPVxuICAgICAgICAgIGNtZC5QYXJhbWV0ZXJSZXF1aXJlZCAmJiBjb21tYW5kLlBhcmFtZXRlci5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogYCoqUmlraW1hcnUgUmVzY3VlIENlbnRlcioqYCxcbiAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgVGhlIGNvbW1hbmQgKioqLSR7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuTmFtZVxuICAgICAgICAgICAgICAgICAgfSoqKiByZXF1aXJlcyBhIHBhcmFtZXRlci5gLFxuICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgRXhhbXBsZXxzIGZvciAqKiotJHtjb21tYW5kLk5hbWV9KioqIDogYCxcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV4YW1wbGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogYFRoZSBjb21tYW5kICoqKi0ke2NvbW1hbmQuTmFtZX0qKiogZG9lc24ndCBuZWVkIGEgcGFyYW1ldGVyLmA7XG4gICAgICAgIHJlc29sdmUobXNnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=