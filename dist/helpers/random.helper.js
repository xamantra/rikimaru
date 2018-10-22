"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Randomizer {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.Randomizer = Randomizer;
//# sourceMappingURL=random.helper.js.map