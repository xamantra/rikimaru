"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayHelper {
    static remove(array, element) {
        const index = array.indexOf(element);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=array.helper.js.map