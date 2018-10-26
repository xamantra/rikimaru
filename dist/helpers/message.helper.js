"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../core/config");
const discord_js_1 = require("discord.js");
class MessageHelper {
    static IsCommand(config, message) {
        return message.content.indexOf(config_1.Config.GetPrefix) === 0;
    }
    static IsDMChannel(message) {
        return message.channel instanceof discord_js_1.DMChannel || message.guild === null;
    }
    static HasPermission(message) {
        const roles = ["Ōnā", "Botto"];
        return message.member.roles.some(r => roles.includes(r.name));
    }
    static GetPermissions(message, log = false) {
        const permissions = message.member.permissions;
        if (log === true) {
            console.log(permissions.toArray());
        }
        return permissions;
    }
    static GetArgs(config, message) {
        return message.content
            .slice(config_1.Config.GetPrefix.length)
            .trim()
            .split(/ +/g);
    }
    static GetCommand(config, message) {
        return this.GetArgs(config, message)
            .shift()
            .toLowerCase();
    }
    static GetParameter(config, message) {
        const args = this.GetArgs(config, message);
        return args.slice(1, args.length).join(" ");
    }
}
exports.MessageHelper = MessageHelper;
//# sourceMappingURL=message.helper.js.map