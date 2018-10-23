"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const data_helper_1 = require("./data.helper");
class RikimaruHelper {
    static Init() {
        fs.exists(data_helper_1.DataHelper.DBPath, exists => {
            if (exists) {
                return;
            }
            else {
                fs.copyFile(data_helper_1.DataHelper.DevDBPath, data_helper_1.DataHelper.DevDBPath, err => {
                    console.log(err);
                });
            }
        });
    }
}
exports.RikimaruHelper = RikimaruHelper;
//# sourceMappingURL=rikimaru.helper.js.map