"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_helper_1 = require("../../helpers/mal.helper");
const sender_1 = require("../../core/sender");
class MalFunction {
    Execute(message, command, dm) {
        this.Fetch(message, command, dm);
    }
    Fetch(message, command, dm) {
        mal_helper_1.MalHelper.GetProfile(command.Parameter)
            .then(profile => { })
            .catch((err) => {
            sender_1.Sender.Send(message, err.message, dm);
        });
    }
}
exports.MalFunction = MalFunction;
//# sourceMappingURL=mal.command.function.js.map