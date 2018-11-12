"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const rescue_center_1 = require("../core/rescue.center");
const manager_command_1 = require("../command/manager.command");
const sender_1 = require("./../core/sender");
const cooldown_model_1 = require("../models/cooldown.model");
const null_checker_helper_1 = require("../helpers/null.checker.helper");
class ResponseHandler {
    static async Get(message, command) {
        const cmd = await manager_command_1.CommandManager.Validate(command);
        if (null_checker_helper_1.NullCheck.Fine(cmd)) {
            const cooldown = await cooldown_model_1.Cooldown.Get(cmd, message.member.user);
            await cooldown
                .Register(message)
                .then(() => {
                const parameter = command.Parameter;
                const paramRequired = cmd.ParameterRequired;
                if (cmd.CanHaveMention &&
                    message.mentions !== null &&
                    message.mentions !== undefined) {
                    cmd.Function.Execute(message, command, cmd.DirectMessage);
                    return;
                }
                else if (parameter.length === 0 && paramRequired) {
                    this.SendRescue(message, cmd.DirectMessage, cmd, command);
                    return;
                }
                else if (parameter.length > 0 && !paramRequired) {
                    this.SendRescue(message, cmd.DirectMessage, cmd, command);
                    return;
                }
                else {
                    if (cmd.Function !== null) {
                        if (cmd.DevOnly === true &&
                            message.author.id === "442621672714010625") {
                            cmd.Function.Execute(message, command, cmd.DirectMessage);
                            return;
                        }
                        cmd.Function.Execute(message, command, cmd.DirectMessage);
                        return;
                    }
                }
            })
                .catch((response) => {
                message.channel.send(response.content).then(($m) => {
                    cooldown.Respond($m).then(() => {
                        if (message.deletable) {
                            message.delete();
                        }
                        setTimeout(() => {
                            $m.delete();
                        }, response.timeout);
                    });
                });
            });
        }
    }
    static SendRescue(message, dm, botCommand, command) {
        rescue_center_1.RescueCenter.RequireParameter(message, botCommand, command).then(embed => {
            sender_1.Sender.SendInfo(message, embed, dm);
        });
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9yZXNwb25zZS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBRTFCLDZCQUEyQjtBQUczQix5REFBcUQ7QUFDckQsZ0VBQTREO0FBQzVELDZDQUEwQztBQUMxQyw2REFBc0U7QUFDdEUsd0VBQTJEO0FBRTNELE1BQWEsZUFBZTtJQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFnQixFQUFFLE9BQWlCO1FBQ3pELE1BQU0sR0FBRyxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSwrQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLFFBQVEsR0FBRyxNQUFNLHlCQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELE1BQU0sUUFBUTtpQkFDWCxRQUFRLENBQUMsT0FBTyxDQUFDO2lCQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUMsSUFDRSxHQUFHLENBQUMsY0FBYztvQkFDbEIsT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJO29CQUN6QixPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFDOUI7b0JBQ0EsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzFELE9BQU87aUJBQ1I7cUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxhQUFhLEVBQUU7b0JBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxPQUFPO2lCQUNSO3FCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxPQUFPO2lCQUNSO3FCQUFNO29CQUNMLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7d0JBQ3pCLElBQ0UsR0FBRyxDQUFDLE9BQU8sS0FBSyxJQUFJOzRCQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsRUFDMUM7NEJBQ0EsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7NEJBQzFELE9BQU87eUJBQ1I7d0JBQ0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQzFELE9BQU87cUJBQ1I7aUJBQ0Y7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsUUFBMEIsRUFBRSxFQUFFO2dCQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBVyxFQUFFLEVBQUU7b0JBQzFELFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDN0IsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFOzRCQUNyQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7eUJBQ2xCO3dCQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7NEJBQ2QsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsVUFBVSxDQUN2QixPQUFnQixFQUNoQixFQUFXLEVBQ1gsVUFBc0IsRUFDdEIsT0FBaUI7UUFFakIsNEJBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2RSxlQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5REQsMENBOERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0IHsgQm90Q29tbWFuZCB9IGZyb20gXCIuLy4uL2NvbW1hbmQvYm90LmNvbW1hbmRcIjtcbmltcG9ydCBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IFJlc2N1ZUNlbnRlciB9IGZyb20gXCIuLi9jb3JlL3Jlc2N1ZS5jZW50ZXJcIjtcbmltcG9ydCB7IENvbW1hbmRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1hbmQvbWFuYWdlci5jb21tYW5kXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi8uLi9jb3JlL3NlbmRlclwiO1xuaW1wb3J0IHsgQ29vbGRvd24sIENvb2xkb3duUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2Nvb2xkb3duLm1vZGVsXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBSZXNwb25zZUhhbmRsZXIge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xuICAgIGNvbnN0IGNtZCA9IGF3YWl0IENvbW1hbmRNYW5hZ2VyLlZhbGlkYXRlKGNvbW1hbmQpO1xuICAgIGlmIChOdWxsQ2hlY2suRmluZShjbWQpKSB7XG4gICAgICBjb25zdCBjb29sZG93biA9IGF3YWl0IENvb2xkb3duLkdldChjbWQsIG1lc3NhZ2UubWVtYmVyLnVzZXIpO1xuICAgICAgYXdhaXQgY29vbGRvd25cbiAgICAgICAgLlJlZ2lzdGVyKG1lc3NhZ2UpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSBjb21tYW5kLlBhcmFtZXRlcjtcbiAgICAgICAgICBjb25zdCBwYXJhbVJlcXVpcmVkID0gY21kLlBhcmFtZXRlclJlcXVpcmVkO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNtZC5DYW5IYXZlTWVudGlvbiAmJlxuICAgICAgICAgICAgbWVzc2FnZS5tZW50aW9ucyAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgbWVzc2FnZS5tZW50aW9ucyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjbWQuRnVuY3Rpb24uRXhlY3V0ZShtZXNzYWdlLCBjb21tYW5kLCBjbWQuRGlyZWN0TWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIubGVuZ3RoID09PSAwICYmIHBhcmFtUmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuU2VuZFJlc2N1ZShtZXNzYWdlLCBjbWQuRGlyZWN0TWVzc2FnZSwgY21kLCBjb21tYW5kKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlci5sZW5ndGggPiAwICYmICFwYXJhbVJlcXVpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLlNlbmRSZXNjdWUobWVzc2FnZSwgY21kLkRpcmVjdE1lc3NhZ2UsIGNtZCwgY29tbWFuZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjbWQuRnVuY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNtZC5EZXZPbmx5ID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hdXRob3IuaWQgPT09IFwiNDQyNjIxNjcyNzE0MDEwNjI1XCJcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY21kLkZ1bmN0aW9uLkV4ZWN1dGUobWVzc2FnZSwgY29tbWFuZCwgY21kLkRpcmVjdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbWQuRnVuY3Rpb24uRXhlY3V0ZShtZXNzYWdlLCBjb21tYW5kLCBjbWQuRGlyZWN0TWVzc2FnZSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgocmVzcG9uc2U6IENvb2xkb3duUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZChyZXNwb25zZS5jb250ZW50KS50aGVuKCgkbTogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgY29vbGRvd24uUmVzcG9uZCgkbSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChtZXNzYWdlLmRlbGV0YWJsZSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZGVsZXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgJG0uZGVsZXRlKCk7XG4gICAgICAgICAgICAgIH0sIHJlc3BvbnNlLnRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIFNlbmRSZXNjdWUoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBkbTogYm9vbGVhbixcbiAgICBib3RDb21tYW5kOiBCb3RDb21tYW5kLFxuICAgIGNvbW1hbmQ6IElDb21tYW5kXG4gICkge1xuICAgIFJlc2N1ZUNlbnRlci5SZXF1aXJlUGFyYW1ldGVyKG1lc3NhZ2UsIGJvdENvbW1hbmQsIGNvbW1hbmQpLnRoZW4oZW1iZWQgPT4ge1xuICAgICAgU2VuZGVyLlNlbmRJbmZvKG1lc3NhZ2UsIGVtYmVkLCBkbSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==