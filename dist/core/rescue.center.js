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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzY3VlLmNlbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL3Jlc2N1ZS5jZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxxQ0FBeUM7QUFHekMsTUFBYSxZQUFZO0lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQ2xDLE9BQWdCLEVBQ2hCLEdBQWUsRUFDZixPQUFpQjtRQUVqQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLE9BQU8sR0FBUSxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQ3pCLE9BQU8sR0FBRyxFQUFFLENBQUM7aUJBQ2Q7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2RDtnQkFDRCxNQUFNLEdBQUcsR0FDUCxHQUFHLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDckQsQ0FBQyxDQUFDO3dCQUNFLEtBQUssRUFBRTs0QkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSzs0QkFDdkMsS0FBSyxFQUFFLDRCQUE0Qjs0QkFDbkMsV0FBVyxFQUFFLG1CQUNYLE9BQU8sQ0FBQyxJQUNWLDJCQUEyQjs0QkFDM0IsTUFBTSxFQUFFO2dDQUNOO29DQUNFLElBQUksRUFBRSxxQkFBcUIsT0FBTyxDQUFDLElBQUksUUFBUTtvQ0FDL0MsMkNBQTJDO29DQUMzQyxLQUFLLEVBQUUsT0FBTztpQ0FDZjs2QkFDRjs0QkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7NEJBQ3JCLE1BQU0sRUFBRTtnQ0FDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2dDQUMvQixJQUFJLEVBQUUsWUFBWTs2QkFDbkI7eUJBQ0Y7cUJBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLG1CQUFtQixPQUFPLENBQUMsSUFBSSwrQkFBK0IsQ0FBQztnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTFDRCxvQ0EwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3RDb21tYW5kIH0gZnJvbSBcIi4vLi4vY29tbWFuZC9ib3QuY29tbWFuZFwiO1xyXG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JzXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi9jbGllbnRcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzY3VlQ2VudGVyIHtcclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFJlcXVpcmVQYXJhbWV0ZXIoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgY21kOiBCb3RDb21tYW5kLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmRcclxuICApIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCkudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgIGxldCBleGFtcGxlOiBhbnkgPSBjbWQuRXhhbXBsZTtcclxuICAgICAgICBpZiAoZXhhbXBsZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBleGFtcGxlID0gXCJcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXhhbXBsZSA9IGNtZC5FeGFtcGxlLkdldChjb21tYW5kLCBjbWQuRXhhbXBsZS5Db3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1zZzogYW55ID1cclxuICAgICAgICAgIGNtZC5QYXJhbWV0ZXJSZXF1aXJlZCAmJiBjb21tYW5kLlBhcmFtZXRlci5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBgKipSaWtpbWFydSBSZXNjdWUgQ2VudGVyKipgLFxyXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYFRoZSBjb21tYW5kICoqKi0ke1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuTmFtZVxyXG4gICAgICAgICAgICAgICAgICB9KioqIHJlcXVpcmVzIGEgcGFyYW1ldGVyLmAsXHJcbiAgICAgICAgICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGBFeGFtcGxlfHMgZm9yICoqKi0ke2NvbW1hbmQuTmFtZX0qKiogOiBgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV4YW1wbGVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgOiBgVGhlIGNvbW1hbmQgKioqLSR7Y29tbWFuZC5OYW1lfSoqKiBkb2Vzbid0IG5lZWQgYSBwYXJhbWV0ZXIuYDtcclxuICAgICAgICByZXNvbHZlKG1zZyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==