"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_helper_1 = require("../helpers/message.helper");
const command_model_1 = require("../models/command.model");
const client_1 = require("../core/client");
const config_1 = require("../core/config");
const response_handler_1 = require("./response.handler");
class MessageHandler {
    static async Init() {
        const client = await client_1.ClientManager.GetClient();
        client.on("message", message => {
            if (message.author.id !== client.user.id) {
                const isCommand = message_helper_1.MessageHelper.IsCommand(config_1.Config, message);
                const cmdName = isCommand
                    ? message_helper_1.MessageHelper.GetCommand(config_1.Config, message).trim()
                    : "";
                const parameter = message_helper_1.MessageHelper.GetParameter(config_1.Config, message).trim();
                if (isCommand) {
                    const command = new command_model_1.Command(cmdName, parameter);
                    console.log(command);
                    response_handler_1.ResponseHandler.Get(message, command);
                }
            }
        });
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lc3NhZ2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUEwRDtBQUMxRCwyREFBa0Q7QUFDbEQsMkNBQStDO0FBQy9DLDJDQUF3QztBQUN4Qyx5REFBcUQ7QUFFckQsTUFBYSxjQUFjO0lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxTQUFTLEdBQUcsOEJBQWEsQ0FBQyxTQUFTLENBQUMsZUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLE9BQU8sR0FBRyxTQUFTO29CQUN2QixDQUFDLENBQUMsOEJBQWEsQ0FBQyxVQUFVLENBQUMsZUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRTtvQkFDbEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDUCxNQUFNLFNBQVMsR0FBRyw4QkFBYSxDQUFDLFlBQVksQ0FBQyxlQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JFLElBQUksU0FBUyxFQUFFO29CQUNiLE1BQU0sT0FBTyxHQUFHLElBQUksdUJBQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JCLGtDQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDdkM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbEJELHdDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2VIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9tZXNzYWdlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9jb21tYW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlSGFuZGxlciB9IGZyb20gXCIuL3Jlc3BvbnNlLmhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlSGFuZGxlciB7XHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBJbml0KCkge1xyXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcclxuICAgIGNsaWVudC5vbihcIm1lc3NhZ2VcIiwgbWVzc2FnZSA9PiB7XHJcbiAgICAgIGlmIChtZXNzYWdlLmF1dGhvci5pZCAhPT0gY2xpZW50LnVzZXIuaWQpIHtcclxuICAgICAgICBjb25zdCBpc0NvbW1hbmQgPSBNZXNzYWdlSGVscGVyLklzQ29tbWFuZChDb25maWcsIG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnN0IGNtZE5hbWUgPSBpc0NvbW1hbmRcclxuICAgICAgICAgID8gTWVzc2FnZUhlbHBlci5HZXRDb21tYW5kKENvbmZpZywgbWVzc2FnZSkudHJpbSgpXHJcbiAgICAgICAgICA6IFwiXCI7XHJcbiAgICAgICAgY29uc3QgcGFyYW1ldGVyID0gTWVzc2FnZUhlbHBlci5HZXRQYXJhbWV0ZXIoQ29uZmlnLCBtZXNzYWdlKS50cmltKCk7XHJcbiAgICAgICAgaWYgKGlzQ29tbWFuZCkge1xyXG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kKGNtZE5hbWUsIHBhcmFtZXRlcik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhjb21tYW5kKTtcclxuICAgICAgICAgIFJlc3BvbnNlSGFuZGxlci5HZXQobWVzc2FnZSwgY29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19