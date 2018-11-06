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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9tb25nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUFrQztBQUNsQyxzREFBa0M7QUFFbEMsTUFBYSxLQUFLO0lBQ1QsTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBMEIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFVBQVUsQ0FBQztZQUM5QixpQkFBVyxDQUFDLE9BQU8sQ0FDakIsR0FBRyxFQUNILEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxFQUN6QixVQUFTLEdBQUcsRUFBRSxFQUFFO2dCQUNkLElBQUksR0FBRztvQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztvQkFDckIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFhLEVBQUUsUUFBZ0M7UUFDbkUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMzQixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7cUJBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ1IsT0FBTyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUc7b0JBQ3hCLElBQUksR0FBRzt3QkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNyQjt3QkFDSCxJQUFJLFFB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QUM7eUJBQ3JCO3dCQUNILElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUzs0QkFBRSxRQUFRLEVBQUUsQ0FBQzt3QkFDNUQsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQ2xCLEtBQWEsRUFDYixLQUFhLEVBQ2IsSUFBWSxFQUNaLFFBQWdDO1FBRWhDLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztvQkFDM0QsSUFBSSxHQUFHO3dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3JCO3dCQUNILElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUzs0QkFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDZDtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5R0Qsc0JBOEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgTW9uZ29DbGllbnQgZnJvbSBcIm1vbmdvZGJcIjtcblxuZXhwb3J0IGNsYXNzIE1vbmdvIHtcbiAgcHVibGljIHN0YXRpYyBDb25uZWN0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNb25nb0NsaWVudC5Nb25nb0NsaWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gQ29uZmlnLk1PTkdPX0JBU0U7XG4gICAgICBNb25nb0NsaWVudC5jb25uZWN0KFxuICAgICAgICB1cmwsXG4gICAgICAgIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVyciwgZGIpIHtcbiAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZShkYik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEZpbmRBbGwodGFibGU6IHN0cmluZywgY2FsbGJhY2s/OiAocmVzdWx0OiBhbnkpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5Db25uZWN0KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKHRhYmxlKVxuICAgICAgICAgIC5maW5kKHt9KVxuICAgICAgICAgIC50b0FycmF5KGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgRmluZE9uZShcbiAgICB0YWJsZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBvYmplY3QsXG4gICAgY2FsbGJhY2s/OiAocmVzdWx0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5Db25uZWN0KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKHRhYmxlKVxuICAgICAgICAgIC5maW5kKHF1ZXJ5KVxuICAgICAgICAgIC50b0FycmF5KGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBOb3RoaW5nIGZvdW5kIGZyb20gdGhlIGRhdGFiYXNlLmApKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEluc2VydChcbiAgICB0YWJsZTogc3RyaW5nLFxuICAgIGRhdGE6IG9iamVjdCxcbiAgICBjYWxsYmFjaz86IChyZXN1bHQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLkNvbm5lY3QoKS50aGVuKGNsaWVudCA9PiB7XG4gICAgICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKENvbmZpZy5NT05HT19EQVRBQkFTRSk7XG4gICAgICAgIGRiLmNvbGxlY3Rpb24odGFibGUpLmluc2VydE9uZShkYXRhLCBmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgICAgIGlmIChlcnIpIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIERlbGV0ZSh0YWJsZTogc3RyaW5nLCBxdWVyeTogb2JqZWN0LCBjYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5Db25uZWN0KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKHRhYmxlKS5kZWxldGVPbmUocXVlcnksIGZ1bmN0aW9uKGVyciwgb2JqKSB7XG4gICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgVXBkYXRlKFxuICAgIHRhYmxlOiBzdHJpbmcsXG4gICAgcXVlcnk6IG9iamVjdCxcbiAgICAkc2V0OiBvYmplY3QsXG4gICAgY2FsbGJhY2s/OiAocmVzdWx0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5Db25uZWN0KCkudGhlbihjbGllbnQgPT4ge1xuICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYihDb25maWcuTU9OR09fREFUQUJBU0UpO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKHRhYmxlKS51cGRhdGVPbmUocXVlcnksICRzZXQsIGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICAgICAgaWYgKGVycikgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19