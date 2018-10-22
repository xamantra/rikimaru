"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static IsCommandValid(hasParameter, command) {
        return hasParameter
            ? command.Parameter.length > 0
            : command.Parameter.length === 0;
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.command.js.map