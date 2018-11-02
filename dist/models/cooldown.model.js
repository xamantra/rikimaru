"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_helper_1 = require("../helpers/time.helper");
class Cooldown {
    constructor(command, user) {
        this.command = command;
        this.user = user;
        this.lastMessage = null;
        this.lastResponse = null;
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
        return new Promise((resolve, reject) => {
            if (this.lastMessage === null) {
                this.lastMessage = newMessage;
                resolve();
            }
            else {
                const diff = time_helper_1.TimeHelper.DiffSeconds(newMessage.createdAt, this.lastMessage.createdAt);
                if (diff < this.command.Cooldown) {
                    const countdown = this.command.Cooldown - diff;
                    reject(new CooldownResponse(`:alarm_clock: **${this.user.username}** You are on cooldown for **-${this.command.Name}** - \`${countdown}s\``, countdown * 1000));
                }
                else {
                    this.lastMessage = newMessage;
                    resolve();
                }
            }
        });
    }
    Respond(newResponse) {
        return new Promise((resolve, reject) => {
            if (this.lastResponse !== null && this.lastResponse !== undefined) {
                if (this.lastResponse.deletable) {
                    this.lastResponse
                        .delete()
                        .then(() => {
                        this.lastResponse = newResponse;
                        resolve();
                    })
                        .catch(err => {
                        this.lastResponse = newResponse;
                        resolve();
                    });
                }
                else {
                    this.lastResponse = newResponse;
                    resolve();
                }
            }
            else {
                this.lastResponse = newResponse;
                resolve();
            }
        });
    }
}
Cooldown.List = [];
exports.Cooldown = Cooldown;
class CooldownResponse {
    constructor(content, timeout) {
        this.content = content;
        this.timeout = timeout;
    }
}
exports.CooldownResponse = CooldownResponse;
//# sourceMappingURL=cooldown.model.js.map