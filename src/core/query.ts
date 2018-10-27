import { DataHelper } from "../helpers/data.helper";
import { Connection, MysqlError } from "mysql";

export class Query {
  public static async Connect() {
    return new Promise<Connection>((resolve, reject) => {
      const con = DataHelper.Conn;
      con.connect(err => {
        if (err !== null && err !== undefined) {
          console.log(`Error 1: ${err}`);
          reject(err);
        } else {
          resolve(con);
        }
      });
    });
  }

  public static async Execute(sql: string, callback?: (result: any) => void) {
    return new Promise((resolve, reject) => {
      this.Connect()
        .then(async conn => {
          conn.query(sql, (err, result) => {
            if (err !== undefined && err !== null) {
              console.log(`Error 2: ${err}`);
              conn.end();
              reject(err);
            } else {
              conn.end();
              conn.on("end", (_err: MysqlError) => {
                if (_err === null || _err === undefined) {
                  if (callback !== null && callback !== undefined)
                    callback(result);
                  resolve();
                } else {
                  reject(_err);
                }
              });
            }
          });
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }
}
