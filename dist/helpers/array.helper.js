"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayHelper {
    static remove(array, element, callback) {
        const index = array.indexOf(element);
        let called = false;
        if (index !== -1) {
            array.splice(index, 1);
            !called && callback !== null ? callback() : (called = true);
        }
    }
}
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=array.helper.js.map