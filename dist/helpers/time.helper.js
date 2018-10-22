"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const countdown_1 = __importDefault(require("countdown"));
class TimeHelper {
    static Countdown(seconds) {
        let _countdown;
        // countdown = moment.duration(seconds, "s").humanize();
        _countdown = countdown_1.default(null, moment_1.default()
            .add(seconds, "s")
            .toDate(), countdown_1.default.DEFAULTS, 2);
        return _countdown.toString();
    }
    static Elapsed(timestamp) {
        const elapsed = moment_1.default(moment_1.default.unix(timestamp)).fromNow();
        return elapsed;
    }
    static YearMonthDay(y, m, d) {
        let yearmonthday;
        if (y !== null && m !== null && d !== null) {
            yearmonthday = moment_1.default(`${y}-${m}-${m}`).format("YYYY MMM D");
        }
        else if (y !== null && m !== null) {
            yearmonthday = moment_1.default(`${y}-${m}`).format("YYYY MMMM");
        }
        else if (y !== null) {
            yearmonthday = moment_1.default(`${y}`).format("YYYY");
        }
        else {
            yearmonthday = "Unknown";
        }
        return yearmonthday;
    }
}
exports.TimeHelper = TimeHelper;
//# sourceMappingURL=time.helper.js.map