"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("class-transformer");
const rescue_center_1 = require("../core/rescue.center");
const manager_command_1 = require("../command/manager.command");
const sender_1 = require("./../core/sender");
const cooldown_model_1 = require("../models/cooldown.model");
class ResponseHandler {
    static Get(message, command) {
        manager_command_1.CommandManager.Validate(command)
            .then(cmd => {
            cooldown_model_1.Cooldown.Get(cmd, message.member.user).then(cooldown => {
                cooldown
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
                    return;
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
            });
        })
            .catch((err) => {
            message.reply(err.message);
        });
    }
    static SendRescue(message, dm, botCommand, command) {
        rescue_center_1.RescueCenter.RequireParameter(message, botCommand, command).then(embed => {
            sender_1.Sender.SendInfo(message, embed, dm);
        });
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9yZXNwb25zZS5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBRTFCLDZCQUEyQjtBQUczQix5REFBcUQ7QUFDckQsZ0VBQTREO0FBQzVELDZDQUEwQztBQUMxQyw2REFBc0U7QUFFdEUsTUFBYSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBZ0IsRUFBRSxPQUFpQjtRQUNuRCxnQ0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YseUJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNyRCxRQUFRO3FCQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUM7cUJBQ2pCLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ1QsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztvQkFDcEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDO29CQUM1QyxJQUNFLEdBQUcsQ0FBQyxjQUFjO3dCQUNsQixPQUFPLENBQUMsUUFBUSxLQUFLLElBQUk7d0JBQ3pCLE9BQU8sQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUM5Qjt3QkFDQSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDMUQsT0FBTztxQkFDUjt5QkFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGFBQWEsRUFBRTt3QkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzFELE9BQU87cUJBQ1I7eUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzFELE9BQU87cUJBQ1I7eUJBQU07d0JBQ0wsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTs0QkFDekIsSUFDRSxHQUFHLENBQUMsT0FBTyxLQUFLLElBQUk7Z0NBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLG9CQUFvQixFQUMxQztnQ0FDQSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQ0FDMUQsT0FBTzs2QkFDUjs0QkFDRCxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDMUQsT0FBTzt5QkFDUjtxQkFDRjtvQkFDRCxPQUFPO2dCQUNULENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxRQUEwQixFQUFFLEVBQUU7b0JBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFXLEVBQUUsRUFBRTt3QkFDMUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOzRCQUM3QixJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0NBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzs2QkFDbEI7NEJBQ0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQ0FDZCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7NEJBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLE1BQU0sQ0FBQyxVQUFVLENBQ3ZCLE9BQWdCLEVBQ2hCLEVBQVcsRUFDWCxVQUFzQixFQUN0QixPQUFpQjtRQUVqQiw0QkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZFLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5FRCwwQ0FtRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XHJcbmltcG9ydCB7IEJvdENvbW1hbmQgfSBmcm9tIFwiLi8uLi9jb21tYW5kL2JvdC5jb21tYW5kXCI7XHJcbmltcG9ydCBcImNsYXNzLXRyYW5zZm9ybWVyXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFJlc2N1ZUNlbnRlciB9IGZyb20gXCIuLi9jb3JlL3Jlc2N1ZS5jZW50ZXJcIjtcclxuaW1wb3J0IHsgQ29tbWFuZE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbWFuZC9tYW5hZ2VyLmNvbW1hbmRcIjtcclxuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4vLi4vY29yZS9zZW5kZXJcIjtcclxuaW1wb3J0IHsgQ29vbGRvd24sIENvb2xkb3duUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2Nvb2xkb3duLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VIYW5kbGVyIHtcclxuICBwdWJsaWMgc3RhdGljIEdldChtZXNzYWdlOiBNZXNzYWdlLCBjb21tYW5kOiBJQ29tbWFuZCkge1xyXG4gICAgQ29tbWFuZE1hbmFnZXIuVmFsaWRhdGUoY29tbWFuZClcclxuICAgICAgLnRoZW4oY21kID0+IHtcclxuICAgICAgICBDb29sZG93bi5HZXQoY21kLCBtZXNzYWdlLm1lbWJlci51c2VyKS50aGVuKGNvb2xkb3duID0+IHtcclxuICAgICAgICAgIGNvb2xkb3duXHJcbiAgICAgICAgICAgIC5SZWdpc3RlcihtZXNzYWdlKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyID0gY29tbWFuZC5QYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgICAgY29uc3QgcGFyYW1SZXF1aXJlZCA9IGNtZC5QYXJhbWV0ZXJSZXF1aXJlZDtcclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBjbWQuQ2FuSGF2ZU1lbnRpb24gJiZcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVudGlvbnMgIT09IG51bGwgJiZcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVudGlvbnMgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY21kLkZ1bmN0aW9uLkV4ZWN1dGUobWVzc2FnZSwgY29tbWFuZCwgY21kLkRpcmVjdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVyLmxlbmd0aCA9PT0gMCAmJiBwYXJhbVJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbmRSZXNjdWUobWVzc2FnZSwgY21kLkRpcmVjdE1lc3NhZ2UsIGNtZCwgY29tbWFuZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIubGVuZ3RoID4gMCAmJiAhcGFyYW1SZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZW5kUmVzY3VlKG1lc3NhZ2UsIGNtZC5EaXJlY3RNZXNzYWdlLCBjbWQsIGNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY21kLkZ1bmN0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBjbWQuRGV2T25seSA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYXV0aG9yLmlkID09PSBcIjQ0MjYyMTY3MjcxNDAxMDYyNVwiXHJcbiAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNtZC5GdW5jdGlvbi5FeGVjdXRlKG1lc3NhZ2UsIGNvbW1hbmQsIGNtZC5EaXJlY3RNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgY21kLkZ1bmN0aW9uLkV4ZWN1dGUobWVzc2FnZSwgY29tbWFuZCwgY21kLkRpcmVjdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZXNwb25zZTogQ29vbGRvd25SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgIG1lc3NhZ2UuY2hhbm5lbC5zZW5kKHJlc3BvbnNlLmNvbnRlbnQpLnRoZW4oKCRtOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb29sZG93bi5SZXNwb25kKCRtKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZGVsZXRhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkbS5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgfSwgcmVzcG9uc2UudGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIG1lc3NhZ2UucmVwbHkoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIFNlbmRSZXNjdWUoXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgZG06IGJvb2xlYW4sXHJcbiAgICBib3RDb21tYW5kOiBCb3RDb21tYW5kLFxyXG4gICAgY29tbWFuZDogSUNvbW1hbmRcclxuICApIHtcclxuICAgIFJlc2N1ZUNlbnRlci5SZXF1aXJlUGFyYW1ldGVyKG1lc3NhZ2UsIGJvdENvbW1hbmQsIGNvbW1hbmQpLnRoZW4oZW1iZWQgPT4ge1xyXG4gICAgICBTZW5kZXIuU2VuZEluZm8obWVzc2FnZSwgZW1iZWQsIGRtKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=