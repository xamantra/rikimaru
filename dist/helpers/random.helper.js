"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Random {
    static Range(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.Random = Random;
//# sourceMappingURL=random.helper.js.map