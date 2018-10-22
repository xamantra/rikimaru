"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json2typescript_1 = require("json2typescript");
class JsonHelper {
    static get Converter() {
        const jsonConvert = new json2typescript_1.JsonConvert();
        jsonConvert.ignorePrimitiveChecks = false;
        jsonConvert.valueCheckingMode = json2typescript_1.ValueCheckingMode.ALLOW_NULL;
        return jsonConvert;
    }
}
exports.JsonHelper = JsonHelper;
//# sourceMappingURL=json.helper.js.map