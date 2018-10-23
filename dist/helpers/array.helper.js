"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.remove = function (value) {
    const idx = this.indexOf(value);
    if (idx !== -1) {
        return this.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
    return this;
};
//# sourceMappingURL=array.helper.js.map