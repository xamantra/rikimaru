"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../helpers/random.helper");
class Color {
    static get Random() {
        const list = this.List;
        return list[random_helper_1.Random.Range(0, list.length - 1)];
    }
}
Color.List = [
    3556083,
    6430440,
    11478939,
    11942502,
    11817022,
    15897889,
    15968259,
    13875968,
    8885504,
    5221963,
    4833930,
    3791820,
    3926782,
    508158,
    38910,
    2250494
];
exports.Color = Color;
//# sourceMappingURL=colors.js.map