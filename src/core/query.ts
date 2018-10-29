import { DataHelper } from "../helpers/data.helper";
import { Connection, MysqlError, Pool } from "mysql";

export class Query {
  public static async Connect() {
    return new Promise<Connection>((resolve, reject) => {
      const conn = DataHelper.Conn;
      conn.connect(err => {
        if (err !== null && err !== undefined) {
          console.log(`Error 1: ${err}`);
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });
  }

  public static async Execute(sql: string, callback?: (result: any) => void) {
    return new Promise<any>((resolve, reject) => {
      this.Connect()
        .then(conn => {
          conn.query(sql, (error, results, fields) => {
            conn.destroy();
            if (error !== null && error !== undefined) {
              reject(new Error(`${error.message}`));
            } else {
              if (callback !== null && callback !== undefined)
                callback(results);
              resolve(results);
            }
          });
        })
        .catch((err: MysqlError) => {
          reject(new Error(`${err.message}`));
        });
    });
  }
}
