"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_helper_1 = require("../helpers/message.helper");
const command_model_1 = require("../models/command.model");
const client_1 = require("../core/client");
const config_1 = require("../core/config");
const response_handler_1 = require("./response.handler");
const sender_1 = require("../core/sender");
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
                if (isCommand && message_helper_1.MessageHelper.IsDMChannel(message)) {
                    sender_1.Sender.Send(message, `Go me nasai!, I can't process commands in DM.`, true);
                    return;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lc3NhZ2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhEQUEwRDtBQUMxRCwyREFBa0Q7QUFDbEQsMkNBQStDO0FBQy9DLDJDQUF3QztBQUN4Qyx5REFBcUQ7QUFDckQsMkNBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7UUFDdEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQzdCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sU0FBUyxHQUFHLDhCQUFhLENBQUMsU0FBUyxDQUFDLGVBQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxPQUFPLEdBQUcsU0FBUztvQkFDdkIsQ0FBQyxDQUFDLDhCQUFhLENBQUMsVUFBVSxDQUFDLGVBQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ2xELENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxTQUFTLEdBQUcsOEJBQWEsQ0FBQyxZQUFZLENBQUMsZUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyRSxJQUFJLFNBQVMsSUFBSSw4QkFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDbkQsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1AsK0NBQStDLEVBQy9DLElBQUksQ0FDTCxDQUFDO29CQUNGLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSx1QkFBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckIsa0NBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN2QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQkQsd0NBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL21lc3NhZ2UuaGVscGVyXCI7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uL21vZGVscy9jb21tYW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29yZS9jb25maWdcIjtcbmltcG9ydCB7IFJlc3BvbnNlSGFuZGxlciB9IGZyb20gXCIuL3Jlc3BvbnNlLmhhbmRsZXJcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi9jb3JlL3NlbmRlclwiO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUhhbmRsZXIge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluaXQoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICBjbGllbnQub24oXCJtZXNzYWdlXCIsIG1lc3NhZ2UgPT4ge1xuICAgICAgaWYgKG1lc3NhZ2UuYXV0aG9yLmlkICE9PSBjbGllbnQudXNlci5pZCkge1xuICAgICAgICBjb25zdCBpc0NvbW1hbmQgPSBNZXNzYWdlSGVscGVyLklzQ29tbWFuZChDb25maWcsIG1lc3NhZ2UpO1xuICAgICAgICBjb25zdCBjbWROYW1lID0gaXNDb21tYW5kXG4gICAgICAgICAgPyBNZXNzYWdlSGVscGVyLkdldENvbW1hbmQoQ29uZmlnLCBtZXNzYWdlKS50cmltKClcbiAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlciA9IE1lc3NhZ2VIZWxwZXIuR2V0UGFyYW1ldGVyKENvbmZpZywgbWVzc2FnZSkudHJpbSgpO1xuICAgICAgICBpZiAoaXNDb21tYW5kICYmIE1lc3NhZ2VIZWxwZXIuSXNETUNoYW5uZWwobWVzc2FnZSkpIHtcbiAgICAgICAgICBTZW5kZXIuU2VuZChcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBgR28gbWUgbmFzYWkhLCBJIGNhbid0IHByb2Nlc3MgY29tbWFuZHMgaW4gRE0uYCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb21tYW5kKSB7XG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kKGNtZE5hbWUsIHBhcmFtZXRlcik7XG4gICAgICAgICAgY29uc29sZS5sb2coY29tbWFuZCk7XG4gICAgICAgICAgUmVzcG9uc2VIYW5kbGVyLkdldChtZXNzYWdlLCBjb21tYW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=