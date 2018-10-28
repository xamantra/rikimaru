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
    static Convert(json, t) {
        return new Promise((resolve, reject) => {
            const jsonString = JSON.stringify(json);
            const result = this.Converter.deserialize(JSON.parse(jsonString), t);
            if (result === null || result === undefined) {
                reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
            }
            else {
                resolve(result);
            }
        });
    }
    static ArrayConvert(json, t) {
        return new Promise((resolve, reject) => {
            const jsonString = JSON.stringify(json);
            const result = this.Converter.deserialize(JSON.parse(jsonString), t);
            if (result === null || result === undefined) {
                reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
            }
            else {
                resolve(result);
            }
        });
    }
}
exports.JsonHelper = JsonHelper;
//# sourceMappingURL=json.helper.js.map