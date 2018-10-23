"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./../../core/bot");
class TweakFunction {
    Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            bot_1.Bot.SetActive(false, status => {
                if (status === false)
                    message.author.send("Hello my creator! I am now in **tweak mode**.");
                else
                    message.author.send("Hello my creator! I am now in **alive mode**.");
            });
        }
    }
}
exports.TweakFunction = TweakFunction;
//# sourceMappingURL=tweak.command.function.js.map