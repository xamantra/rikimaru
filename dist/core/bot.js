"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bot {
    static Init() {
        this.Active = true;
    }
    static SetActive(status, callback) {
        this.Active = status;
        callback(status);
    }
    static get IsActive() {
        return this.Active;
    }
}
Bot.Active = false;
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map