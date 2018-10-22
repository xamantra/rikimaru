"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class MessageHelper {
    constructor() {
        console.log(`Constructed: "${MessageHelper.name}"`);
    }
    IsCommand(config, message) {
        return message.content.indexOf(config.GetPrefix) === 0;
    }
    IsDMChannel(message) {
        return message.channel instanceof discord_js_1.DMChannel || message.guild === null;
    }
    HasPermission(message) {
        const roles = ["Ōnā", "Botto"];
        return message.member.roles.some(r => roles.includes(r.name));
    }
    GetPermissions(message, log = false) {
        const permissions = message.member.permissions;
        if (log === true) {
            console.log(permissions.toArray());
        }
        return permissions;
    }
    GetArgs(config, message) {
        return message.content
            .slice(config.GetPrefix.length)
            .trim()
            .split(/ +/g);
    }
    GetCommand(config, message) {
        return this.GetArgs(config, message)
            .shift()
            .toLowerCase();
    }
    GetParameter(config, message) {
        const args = this.GetArgs(config, message);
        return args.slice(1, args.length).join(" ");
    }
}
exports.MessageHelper = MessageHelper;
//# sourceMappingURL=message.helper.js.map