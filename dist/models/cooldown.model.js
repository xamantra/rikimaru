"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_helper_1 = require("../helpers/time.helper");
class Cooldown {
    constructor(command, user) {
        this.command = command;
        this.user = user;
        this.lastMessage = null;
        Cooldown.List.push(this);
    }
    static Get(command, user) {
        return new Promise((resolve, reject) => {
            const cooldown = this.List.find(cd => cd.command === command && cd.user === user);
            if (cooldown === undefined || cooldown === null) {
                const newCooldown = new Cooldown(command, user);
                resolve(newCooldown);
            }
            else {
                resolve(cooldown);
            }
        });
    }
    Register(newMessage) {
        console.log(Cooldown.List.length);
        return new Promise((resolve, reject) => {
            if (this.lastMessage === null) {
                this.lastMessage = newMessage;
                resolve(null);
            }
            else {
                const diff = time_helper_1.TimeHelper.DiffSeconds(newMessage.createdAt, this.lastMessage.createdAt);
                if (diff < this.command.Cooldown) {
                    const countdown = this.command.Cooldown - diff;
                    resolve(new CooldownResponse(`:alarm_clock: **${this.user.username}** You are on cooldown for **-${this.command.Name}** - \`${countdown}s\``, countdown * 1000, countdown));
                }
                else {
                    this.lastMessage = newMessage;
                    resolve(null);
                }
            }
        });
    }
}
Cooldown.List = [];
exports.Cooldown = Cooldown;
class CooldownResponse {
    constructor(content, timeout, countdown) {
        this.content = content;
        this.timeout = timeout;
        this.countdown = countdown;
    }
}
exports.CooldownResponse = CooldownResponse;
//# sourceMappingURL=cooldown.model.js.map