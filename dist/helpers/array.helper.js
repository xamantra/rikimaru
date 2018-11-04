"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayHelper {
    static remove(array, element, callback) {
        const index = array.indexOf(element);
        let called = false;
        if (index !== -1) {
            array.splice(index, 1);
            if (!called && callback !== null) {
                called = true;
                callback();
            }
        }
    }
}
exports.ArrayHelper = ArrayHelper;
