import { UserPref } from "../models/user.pref.model";
export class UserPrefData {
  static Initializing = false;
  private static List: UserPref[] = [];

  public static Init() {
    return new Promise((resolve, reject) => {});
  }

  public static Exists() {
    return new Promise((resolve, reject) => {});
  }
}
