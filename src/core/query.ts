import { DataHelper } from "../helpers/data.helper";
import { Connection } from "mysql";

export class Query {
  public static async Connect() {
    return new Promise<Connection>(async (resolve, reject) => {
      const con = DataHelper.Conn;
      await con.connect(async err => {
        if (err !== null && err !== undefined) {
          await console.log(`Error 1: ${err}`);
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
          conn.query(sql, async (err, result) => {
            if (err !== undefined && err !== null) {
              console.log(`Error 2: ${err}`);
              reject(err);
            } else {
              callback(result);
              resolve();
            }
          });
        })
        .catch(reason => {
          console.log(reason);
        });
    });
  }
}
