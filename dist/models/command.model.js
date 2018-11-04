"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(name, parameter) {
        this.Name = name.trim();
        this.Parameter = parameter.trim();
    }
}
exports.Command = Command;
