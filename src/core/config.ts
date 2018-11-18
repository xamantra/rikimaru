import { IFirebaseConfig } from "../interfaces/firebase.config.interface";
import { ClientManager } from "./client";
export class Config {
  public static get BOT_NAME() {
    return ClientManager.BotName;
  }

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

  public static get MAL_ANIME_BASE(): string {
    return (
      process.env.MAL_ANIME_BASE || require("../extras/env").env.MAL_ANIME_BASE
    );
  }

  public static get ANI_ANIME_BASE(): string {
    return (
      process.env.ANI_ANIME_BASE || require("../extras/env").env.ANI_ANIME_BASE
    );
  }

  public static MAL_CW_LINK(username: string) {
    const base =
      process.env.MAL_CW_BASE || require("../extras/env").env.MAL_CW_BASE;
    return `${base}/${username}/load.json?status=1`;
  }

  public static get QUEUE_REFRESH_RATE() {
    return Number(
      process.env.QUEUE_REFRESH_RATE ||
        require("../extras/env").env.QUEUE_REFRESH_RATE
    );
  }

  public static get CACHE_UPDATE_INTERVAL() {
    return Number(
      process.env.CACHE_UPDATE_INTERVAL ||
        require("../extras/env").env.CACHE_UPDATE_INTERVAL
    );
  }
}
