"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediaVariables {
    constructor() {
        console.log(`Constructed: "${MediaVariables.name}"`);
    }
    Get(id, type) {
        return {
            id: id,
            type: type
        };
    }
}
exports.MediaVariables = MediaVariables;
//# sourceMappingURL=media.variables.js.map