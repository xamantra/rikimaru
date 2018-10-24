"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bot {
    constructor() {
        this.Status = "off";
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    Init() {
        this.Status = "on";
    }
    SetStatus(status, callback) {
        this.Status = status;
        callback(status);
    }
    get GetStatus() {
        return this.Status;
    }
}
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map