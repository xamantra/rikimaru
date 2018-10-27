import { DataHelper } from "../helpers/data.helper";
import { Connection, MysqlError, Pool } from "mysql";

export class Query {
  // public static async Connect() {
  //   return new Promise<Pool>((resolve, reject) => {
  //     const pool = DataHelper.Pool;
  //     pool.(err => {
  //       if (err !== null && err !== undefined) {
  //         console.log(`Error 1: ${err}`);
  //         reject(err);
  //       } else {
  //         resolve(pool);
  //       }
  //     });
  //   });
  // }

  public static async Execute(sql: string, callback?: (result: any) => void) {
    return new Promise((resolve, reject) => {
      DataHelper.Pool.query(sql, (error, results, fields) => {
        if (error !== null && error !== undefined) {
          reject(error);
        } else {
          if (callback !== null && callback !== undefined) callback(results);
          resolve();
        }
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
