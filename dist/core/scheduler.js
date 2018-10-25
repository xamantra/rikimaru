"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scheduler {
    static LoopJob(seconds = null, minutes = null, hours = null, callback) {
        let totalInterval = 0;
        if (seconds !== null)
            totalInterval += seconds * 1000;
        if (minutes !== null)
            totalInterval += minutes * 1000 * 60;
        if (hours !== null)
            totalInterval += hours * 1000 * 60 * 60;
        setInterval(callback, totalInterval);
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map