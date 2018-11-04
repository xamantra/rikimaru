"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPref {
    constructor(discordId, schedType, subsSort, remindInH) {
        this.discordId = discordId;
        this.schedType = schedType;
        this.subsSort = subsSort;
        this.remindInH = remindInH;
        if (remindInH > 24) {
            remindInH = 24;
        }
        if (remindInH < 1) {
            remindInH = 1;
        }
    }
}
exports.UserPref = UserPref;
