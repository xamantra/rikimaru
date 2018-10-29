"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_helper_1 = require("../helpers/data.helper");
class Query {
    static async Connect() {
        return new Promise((resolve, reject) => {
            const conn = data_helper_1.DataHelper.Conn;
            conn.connect(err => {
                if (err !== null && err !== undefined) {
                    console.log(`Error 1: ${err}`);
                    reject(err);
                }
                else {
                    resolve(conn);
                }
            });
        });
    }
    static async Execute(sql, callback) {
        return new Promise((resolve, reject) => {
            this.Connect()
                .then(conn => {
                conn.query(sql, (error, results, fields) => {
                    conn.destroy();
                    if (error !== null && error !== undefined) {
                        reject(new Error(`${error.message}`));
                    }
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(results);
                        resolve(results);
                    }
                });
            })
                .catch((err) => {
                reject(new Error(`${err.message}`));
            });
        });
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map