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
    await this.Connect()
      .then(async conn => {
        await conn.query(sql, async (err, result) => {
          if (err !== undefined && err !== null) {
            await console.log(`Error 2: ${err}`);
            return;
          } else {
            await callback(result);
            return `OK`;
          }
        });
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
