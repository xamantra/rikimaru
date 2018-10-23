import * as fs from "fs";
import { DataHelper } from "./data.helper";

export class RikimaruHelper {
  public static Init() {
    fs.exists(DataHelper.DBPath, exists => {
      if (exists) {
        return;
      } else {
        fs.copyFile(DataHelper.DevDBPath, DataHelper.DevDBPath, err => {
          console.log(err);
        });
      }
    });
  }

  public static GetPath() {
    fs.realpath(DataHelper.DBPath, err => {
      console.log(err);
    });
  }
}
