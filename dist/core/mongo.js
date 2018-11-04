"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const mongodb_1 = __importDefault(require("mongodb"));
class Mongo {
    static Connect() {
        return new Promise((resolve, reject) => {
            const url = config_1.Config.MONGO_BASE;
            mongodb_1.default.connect(url, { useNewUrlParser: true }, function (err, db) {
                if (err)
                    console.log(err);
                else
                    resolve(db);
            });
        });
    }
    static FindAll(table, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table)
                    .find({})
                    .toArray(function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
    static FindOne(table, query, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table)
                    .find(query)
                    .toArray(function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (res.length > 0) {
                            if (callback !== null && callback !== undefined)
                                callback(res);
                            resolve(res);
                        }
                        else {
                            reject(new Error(`Nothing found from the database.`));
                        }
                    }
                });
            });
        });
    }
    static Insert(table, data, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).insertOne(data, function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
    static Delete(table, query, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).deleteOne(query, function (err, obj) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback();
                        resolve();
                    }
                });
            });
        });
    }
    static Update(table, query, $set, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).updateOne(query, $set, function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9tb25nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrQztBQUNsQyxzREFBa0M7QUFFbEMsTUFBYSxLQUFLO0lBQ1QsTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBMEIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQztZQUM5QixpQkFBVyxDQUFDLE9BQU8sQ0FDakIsR0FBRyxFQUNILEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUN6QixVQUFTLEdBQUcsRUFBRSxFQUFFO2dCQUNkLElBQUksR0FBRztvQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztvQkFDckIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFhLEVBQUUsUUFBZ0M7UUFDbkUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMzQixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7cUJBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ1IsT0FBTyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7b0JBQ3hCLElBQUksR0FBRzt3QkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDSCxJQUFJLFFB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QUM7eUJBQ3JCO3dCQUNILElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUzs0QkFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDNUQsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQ2xCLEtBQWEsRUFDYixLQUFhLEVBQ2IsSUFBWSxFQUNaLFFBQWdDO1FBRWhDLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztvQkFDM0QsSUFBSSxHQUFHO3dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3JCO3dCQUNILElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUzs0QkFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5R0Qsc0JBOEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBNb25nb0NsaWVudCBmcm9tIFwibW9uZ29kYlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vbmdvIHtcclxuICBwdWJsaWMgc3RhdGljIENvbm5lY3QoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8TW9uZ29DbGllbnQuTW9uZ29DbGllbnQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gQ29uZmlnLk1PTkdPX0JBU0U7XHJcbiAgICAgIE1vbmdvQ2xpZW50LmNvbm5lY3QoXHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oZXJyLCBkYikge1xyXG4gICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIGVsc2UgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEZpbmRBbGwodGFibGU6IHN0cmluZywgY2FsbGJhY2s/OiAocmVzdWx0OiBhbnkpID0+IHZvaWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuQ29ubmVjdCgpLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xyXG4gICAgICAgIGRiLmNvbGxlY3Rpb24odGFibGUpXHJcbiAgICAgICAgICAuZmluZCh7fSlcclxuICAgICAgICAgIC50b0FycmF5KGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhyZXMpO1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEZpbmRPbmUoXHJcbiAgICB0YWJsZTogc3RyaW5nLFxyXG4gICAgcXVlcnk6IG9iamVjdCxcclxuICAgIGNhbGxiYWNrPzogKHJlc3VsdDogYW55KSA9PiB2b2lkXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuQ29ubmVjdCgpLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xyXG4gICAgICAgIGRiLmNvbGxlY3Rpb24odGFibGUpXHJcbiAgICAgICAgICAuZmluZChxdWVyeSlcclxuICAgICAgICAgIC50b0FycmF5KGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsICYmIGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYE5vdGhpbmcgZm91bmQgZnJvbSB0aGUgZGF0YWJhc2UuYCkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEluc2VydChcclxuICAgIHRhYmxlOiBzdHJpbmcsXHJcbiAgICBkYXRhOiBvYmplY3QsXHJcbiAgICBjYWxsYmFjaz86IChyZXN1bHQ6IGFueSkgPT4gdm9pZFxyXG4gICkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLkNvbm5lY3QoKS50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgZGIgPSBjbGllbnQuZGIoQ29uZmlnLk1PTkdPX0RBVEFCQVNFKTtcclxuICAgICAgICBkYi5jb2xsZWN0aW9uKHRhYmxlKS5pbnNlcnRPbmUoZGF0YSwgZnVuY3Rpb24oZXJyLCByZXMpIHtcclxuICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsICYmIGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRGVsZXRlKHRhYmxlOiBzdHJpbmcsIHF1ZXJ5OiBvYmplY3QsIGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5Db25uZWN0KCkudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKENvbmZpZy5NT05HT19EQVRBQkFTRSk7XHJcbiAgICAgICAgZGIuY29sbGVjdGlvbih0YWJsZSkuZGVsZXRlT25lKHF1ZXJ5LCBmdW5jdGlvbihlcnIsIG9iaikge1xyXG4gICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBVcGRhdGUoXHJcbiAgICB0YWJsZTogc3RyaW5nLFxyXG4gICAgcXVlcnk6IG9iamVjdCxcclxuICAgICRzZXQ6IG9iamVjdCxcclxuICAgIGNhbGxiYWNrPzogKHJlc3VsdDogYW55KSA9PiB2b2lkXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuQ29ubmVjdCgpLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xyXG4gICAgICAgIGRiLmNvbGxlY3Rpb24odGFibGUpLnVwZGF0ZU9uZShxdWVyeSwgJHNldCwgZnVuY3Rpb24oZXJyLCByZXMpIHtcclxuICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsICYmIGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKHJlcyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19