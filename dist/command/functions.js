"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const help_command_function_1 = require("./functions/help.command.function");
const unsub_command_function_1 = require("./functions/unsub.command.function");
const viewsubs_command_function_1 = require("./functions/viewsubs.command.function");
const logall_command_function_1 = require("./functions/logall.command.function");
const subscribe_command_function_1 = require("./functions/subscribe.command.function");
const media_command_function_1 = require("./functions/media.command.function");
const ping_command_function_1 = require("./functions/ping.command.function");
const malbind_command_function_1 = require("./functions/malbind.command.function");
const malsync_command_function_1 = require("./functions/malsync.command.function");
const anilbind_command_function_1 = require("./functions/anilbind.command.function");
const anisync_command_function_1 = require("./functions/anisync.command.function");
exports.helpFunction = new help_command_function_1.HelpFunction();
exports.whenAnimeFunction = new media_command_function_1.MediaFunction();
exports.pingFunction = new ping_command_function_1.PingFunction();
exports.subscribeFunction = new subscribe_command_function_1.SubscribeFunction();
exports.viewSubsFunction = new viewsubs_command_function_1.ViewSubsFunction();
exports.unsubFunction = new unsub_command_function_1.UnsubFunction();
exports.logAllFunction = new logall_command_function_1.LogAllFunction();
exports.malBindFunction = new malbind_command_function_1.MalBindFunction();
exports.malSyncFunction = new malsync_command_function_1.MalSyncFunction();
exports.aniBindFunction = new anilbind_command_function_1.AniBindFunction();
exports.aniSyncFunction = new anisync_command_function_1.AniSyncFunction();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQWlFO0FBQ2pFLCtFQUFtRTtBQUNuRSxxRkFBeUU7QUFDekUsaUZBQXFFO0FBQ3JFLHVGQUEyRTtBQUMzRSwrRUFBbUU7QUFDbkUsNkVBQWlFO0FBQ2pFLG1GQUF1RTtBQUN2RSxtRkFBdUU7QUFDdkUscUZBQXdFO0FBQ3hFLG1GQUF1RTtBQUUxRCxRQUFBLFlBQVksR0FBRyxJQUFJLG9DQUFZLEVBQUUsQ0FBQztBQUNsQyxRQUFBLGlCQUFpQixHQUFHLElBQUksc0NBQWEsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsWUFBWSxHQUFHLElBQUksb0NBQVksRUFBRSxDQUFDO0FBQ2xDLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSw4Q0FBaUIsRUFBRSxDQUFDO0FBQzVDLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSw0Q0FBZ0IsRUFBRSxDQUFDO0FBQzFDLFFBQUEsYUFBYSxHQUFHLElBQUksc0NBQWEsRUFBRSxDQUFDO0FBQ3BDLFFBQUEsY0FBYyxHQUFHLElBQUksd0NBQWMsRUFBRSxDQUFDO0FBQ3RDLFFBQUEsZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsZUFBZSxHQUFHLElBQUksMkNBQWUsRUFBRSxDQUFDO0FBQ3hDLFFBQUEsZUFBZSxHQUFHLElBQUksMENBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVscEZ1bmN0aW9uIH0gZnJvbSBcIi4vZnVuY3Rpb25zL2hlbHAuY29tbWFuZC5mdW5jdGlvblwiO1xuaW1wb3J0IHsgVW5zdWJGdW5jdGlvbiB9IGZyb20gXCIuL2Z1bmN0aW9ucy91bnN1Yi5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBWaWV3U3Vic0Z1bmN0aW9uIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3ZpZXdzdWJzLmNvbW1hbmQuZnVuY3Rpb25cIjtcbmltcG9ydCB7IExvZ0FsbEZ1bmN0aW9uIH0gZnJvbSBcIi4vZnVuY3Rpb25zL2xvZ2FsbC5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVGdW5jdGlvbiB9IGZyb20gXCIuL2Z1bmN0aW9ucy9zdWJzY3JpYmUuY29tbWFuZC5mdW5jdGlvblwiO1xuaW1wb3J0IHsgTWVkaWFGdW5jdGlvbiB9IGZyb20gXCIuL2Z1bmN0aW9ucy9tZWRpYS5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBQaW5nRnVuY3Rpb24gfSBmcm9tIFwiLi9mdW5jdGlvbnMvcGluZy5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBNYWxCaW5kRnVuY3Rpb24gfSBmcm9tIFwiLi9mdW5jdGlvbnMvbWFsYmluZC5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBNYWxTeW5jRnVuY3Rpb24gfSBmcm9tIFwiLi9mdW5jdGlvbnMvbWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uXCI7XG5pbXBvcnQgeyBBbmlCaW5kRnVuY3Rpb24gfSBmcm9tIFwiLi9mdW5jdGlvbnMvYW5pbGJpbmQuY29tbWFuZC5mdW5jdGlvblwiO1xuaW1wb3J0IHsgQW5pU3luY0Z1bmN0aW9uIH0gZnJvbSBcIi4vZnVuY3Rpb25zL2FuaXN5bmMuY29tbWFuZC5mdW5jdGlvblwiO1xuXG5leHBvcnQgY29uc3QgaGVscEZ1bmN0aW9uID0gbmV3IEhlbHBGdW5jdGlvbigpO1xuZXhwb3J0IGNvbnN0IHdoZW5BbmltZUZ1bmN0aW9uID0gbmV3IE1lZGlhRnVuY3Rpb24oKTtcbmV4cG9ydCBjb25zdCBwaW5nRnVuY3Rpb24gPSBuZXcgUGluZ0Z1bmN0aW9uKCk7XG5leHBvcnQgY29uc3Qgc3Vic2NyaWJlRnVuY3Rpb24gPSBuZXcgU3Vic2NyaWJlRnVuY3Rpb24oKTtcbmV4cG9ydCBjb25zdCB2aWV3U3Vic0Z1bmN0aW9uID0gbmV3IFZpZXdTdWJzRnVuY3Rpb24oKTtcbmV4cG9ydCBjb25zdCB1bnN1YkZ1bmN0aW9uID0gbmV3IFVuc3ViRnVuY3Rpb24oKTtcbmV4cG9ydCBjb25zdCBsb2dBbGxGdW5jdGlvbiA9IG5ldyBMb2dBbGxGdW5jdGlvbigpO1xuZXhwb3J0IGNvbnN0IG1hbEJpbmRGdW5jdGlvbiA9IG5ldyBNYWxCaW5kRnVuY3Rpb24oKTtcbmV4cG9ydCBjb25zdCBtYWxTeW5jRnVuY3Rpb24gPSBuZXcgTWFsU3luY0Z1bmN0aW9uKCk7XG5leHBvcnQgY29uc3QgYW5pQmluZEZ1bmN0aW9uID0gbmV3IEFuaUJpbmRGdW5jdGlvbigpO1xuZXhwb3J0IGNvbnN0IGFuaVN5bmNGdW5jdGlvbiA9IG5ldyBBbmlTeW5jRnVuY3Rpb24oKTtcbiJdfQ==