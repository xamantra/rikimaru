"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
class MalSyncExample {
    constructor(count) {
        this.Count = count;
        this.Usernames = ["thisisausername", "anotherusername", "malusername"];
    }
    Get(command, count) {
        let result = ``;
        const picked = [];
        for (let i = 0; i < this.Usernames.length; i++) {
            const item = this.Usernames[random_helper_1.Random.Range(0, this.Usernames.length - 1)];
            if (!picked.includes(item) && picked.length < count) {
                result += `\n-*${command.Name}* ${item}`;
                picked.push(item);
            }
            if (picked.length === count) {
                return result;
            }
        }
        return result;
    }
}
exports.MalSyncExample = MalSyncExample;
