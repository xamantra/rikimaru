import { DataHelper } from "../helpers/data.helper";
import { Connection } from "mysql";

export class Query {
  public static Connect(callback?: (conn: Connection) => void) {
    const con = DataHelper.Conn;
    con.connect(async err => {
      if (err !== null && err !== undefined) {
        await console.log(`Error 1: ${err}`);
        return;
      } else {
        await callback(con);
      }
    });
  }

  public static Execute(sql: string, callback?: (result: any) => void) {
    this.Connect(async conn => {
      await conn.query(sql, async (err, result) => {
        if (err !== undefined && err !== null) {
          await console.log(`Error 2: ${err}`);
          return;
        } else {
          await callback(result);
        }
      });
    });
  }
}
