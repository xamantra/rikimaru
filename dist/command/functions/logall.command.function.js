"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_data_1 = require("./../../data/media.data");
class LogAllFunction {
    Execute(message, command, dm) {
        if (message.author.id === "442621672714010625") {
            console.log(media_data_1.MediaData.LogAll());
        }
    }
}
exports.LogAllFunction = LogAllFunction;
//# sourceMappingURL=logall.command.function.js.map