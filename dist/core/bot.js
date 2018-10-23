"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const data_helper_1 = require("../helpers/data.helper");
class Bot {
    static Init() {
        this.Active = true;
        http
            .createServer(function (req, res) {
            res.write("Hello! I am Rikimaru!");
            res.end();
        })
            .listen(process.env.PORT || 8080);
        const file = fs.createWriteStream("rikimaru.db");
        http.get(data_helper_1.DataHelper.RealPath, response => {
            response.pipe(file);
        });
    }
    static SetActive(status, callback) {
        this.Active = status;
        callback(status);
    }
    static get IsActive() {
        return this.Active;
    }
}
Bot.Active = false;
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map