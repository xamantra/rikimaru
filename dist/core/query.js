"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_helper_1 = require("../helpers/data.helper");
class Query {
    static Connect(callback) {
        const con = data_helper_1.DataHelper.Conn;
        con.connect(async (err) => {
            if (err !== null && err !== undefined) {
                await console.log(`Error 1: ${err}`);
                return;
            }
            else {
                await callback(con);
            }
        });
    }
    static Execute(sql, callback) {
        this.Connect(async (conn) => {
            await conn.query(sql, async (err, result) => {
                if (err !== undefined && err !== null) {
                    await console.log(`Error 2: ${err}`);
                    return;
                }
                else {
                    await callback(result);
                }
            });
        });
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map