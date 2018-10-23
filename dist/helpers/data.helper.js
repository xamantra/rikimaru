"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs = __importStar(require("fs"));
class DataHelper {
    static Init() {
        const db = this.DB;
        db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_id TEXT)");
        db.run(
        // tslint:disable-next-line:max-line-length
        "CREATE TABLE IF NOT EXISTS media (mal_id INTEGER PRIMARY KEY, title Text)");
        db.run("CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY AUTOINCREMENT, media_id INTEGER, user_id INTEGER)");
        console.log(`Constructed: "${DataHelper.name}"`);
    }
    static get DB() {
        return new sqlite3_1.default.Database(this.DBPath, function (err) {
            if (err !== null) {
                console.log(err);
            }
        });
    }
    static get DBPath() {
        const database = "data/rikimaru.db";
        return database;
    }
    static get DevDBPath() {
        const database = "data/rikimaru-dev.db";
        return database;
    }
    static get RealPath() {
        return fs.realpathSync(this.DBPath);
    }
}
exports.DataHelper = DataHelper;
//# sourceMappingURL=data.helper.js.map