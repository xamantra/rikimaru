"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = __importStar(require("node-schedule"));
const moment_1 = __importStar(require("moment"));
class Scheduler {
    constructor() { }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    async Add(media, callback) {
        const sched = await moment_1.default(moment_1.unix(media.nextAiringEpisode.airingAt)).toDate();
        const job = await schedule.scheduleJob(sched, async () => {
            await callback(job);
        });
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map