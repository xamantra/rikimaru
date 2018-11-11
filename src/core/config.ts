import { IFirebaseConfig } from "../interfaces/firebase.config.interface";
export class Config {
  public static get BOT_TOKEN(): string {
    return process.env.BOT_TOKEN || require("../extras/env").env.BOT_TOKEN;
  }

  public static get COMMAND_PREFIX(): string {
    return (
      process.env.COMMAND_PREFIX || require("../extras/env").env.COMMAND_PREFIX
    );
  }

  public static get MONGO_BASE(): string {
    return process.env.MONGO_BASE || require("../extras/env").env.MONGO_BASE;
  }

  public static get MONGO_DATABASE(): string {
    return (
      process.env.MONGO_DATABASE || require("../extras/env").env.MONGO_DATABASE
    );
  }

  public static get MAL_PROFILE_BASE(): string {
    return (
      process.env.MAL_PROFILE_BASE ||
      require("../extras/env").env.MAL_PROFILE_BASE
    );
  }

  public static MAL_CW_LINK(username: string) {
    const base =
      process.env.MAL_CW_BASE || require("../extras/env").env.MAL_CW_BASE;
    return `${base}/${username}/load.json?status=1`;
  }

  public static FIREBASE_CONFIG(): IFirebaseConfig {
    return (
      process.env.FIREBASE_CONFIG ||
      require("../extras/env").env.FIREBASE_CONFIG
    );
  }

  public static get DBL_TOKEN() {
    return process.env.DBL_TOKEN || require("../extras/env").env.DBL_TOKEN;
  }
}
