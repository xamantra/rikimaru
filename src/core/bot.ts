import * as http from "http";
import * as fs from "fs";
import { DataHelper } from "../helpers/data.helper";

export class Bot {
  private static Active = false;

  public static Init() {
    this.Active = true;
    http
      .createServer(function(req, res) {
        res.write("Hello! I am Rikimaru!");
        res.end();
      })
      .listen(process.env.PORT || 8080);
    const file = fs.createWriteStream("rikimaru.db");
    http.get(DataHelper.RealPath, response => {
      response.pipe(file);
    });
  }

  public static SetActive(
    status: boolean,
    callback?: (status: boolean) => void
  ) {
    this.Active = status;
    callback(status);
  }

  public static get IsActive() {
    return this.Active;
  }
}
