import { DataHelper } from "../helpers/data.helper";
import { Connection, MysqlError, Pool } from "mysql";

export class Query {
  public static async Connect() {
    return new Promise<Connection>((resolve, reject) => {
      const conn = DataHelper.Conn;
      conn.end((error: MysqlError) => {
        if (error !== null && error !== undefined) {
          reject(error);
        } else {
          conn.connect(err => {
            if (err !== null && err !== undefined) {
              console.log(`Error 1: ${err}`);
              reject(err);
            } else {
              resolve(conn);
            }
          });
        }
      });
    });
  }

  public static async Execute(sql: string, callback?: (result: any) => void) {
    return new Promise<any>((resolve, reject) => {
      this.Connect()
        .then(conn => {
          conn.query(sql, (error, results, fields) => {
            if (error !== null && error !== undefined) {
              reject(error);
            } else {
              conn.end((err: MysqlError) => {
                if (err !== null && err !== undefined) {
                  reject(err);
                } else {
                  if (callback !== null && callback !== undefined)
                    callback(results);
                  resolve(results);
                }
              });
            }
          });
        })
        .catch((err: MysqlError) => {
          console.warn(new Error(`${err.message}`));
        });
    });
    // return new Promise((resolve, reject) => {
    //   this.Connect()
    //     .then(async conn => {
    //       conn.query(sql, (err, result) => {
    //         if (err !== undefined && err !== null) {
    //           console.log(`Error 2: ${err}`);
    //           conn.end();
    //           reject(err);
    //         } else {
    //           conn.end();
    //           conn.on("end", (_err: MysqlError) => {
    //             if (_err === null || _err === undefined) {
    //               if (callback !== null && callback !== undefined)
    //                 callback(result);
    //               resolve();
    //             } else {
    //               reject(_err);
    //             }
    //           });
    //         }
    //       });
    //     })
    //     .catch(reason => {
    //       console.log(reason);
    //     });
    // });
  }
}
