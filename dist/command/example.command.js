"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("./../helpers/random.helper");
class ExampleCommand {
    constructor() {
        this.media = [];
        this.media = [
            "one piece",
            "code geass",
            "sao",
            "danmachi",
            "re zero",
            "dororo",
            "boarding juliet",
            "reincarnated as slime",
            "bunny girl senpai",
            "irozuku sekai",
            "kekkai sensen",
            "boruto",
            "merc storia",
            "gridman",
            "tokyo ghoul",
            "franxx",
            "akame ga kill",
            "asobi asobase",
            "goblin slayer"
        ];
        console.log(`Constructed: "${ExampleCommand.name}"`);
    }
    MediaExample(command, count) {
        let result = ``;
        const picked = [];
        for (let i = 0; i < this.media.length; i++) {
            const item = this.media[random_helper_1.Randomizer.randomInt(0, this.media.length - 1)];
            if (!picked.includes(item) && picked.length < count) {
                result += `\n-*${command.Name}* ${item}`;
                picked.push(item);
            }
            else if (picked.length === count) {
                return result;
            }
        }
        return result;
    }
}
exports.ExampleCommand = ExampleCommand;
//# sourceMappingURL=example.command.js.map