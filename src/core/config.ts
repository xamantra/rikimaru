export class Config {
  public static get BOT_TOKEN(): string {
    return process.env.BOT_TOKEN || require("../extras/env").env.BOT_TOKEN;
  }

  public static get COMMAND_PREFIX(): string {
    return (
      process.env.COMMAND_PREFIX || require("../extras/env").env.COMMAND_PREFIX
    );
  }

  public static get MYSQL_HOST(): string {
    return process.env.MYSQL_HOST || require("../extras/env").env.MYSQL_HOST;
  }

  public static get MYSQL_PORT(): number {
    return (
      Number(process.env.MYSQL_PORT) || require("../extras/env").env.MYSQL_PORT
    );
  }

  public static get MYSQL_USERNAME(): string {
    return (
      process.env.MYSQL_USERNAME || require("../extras/env").env.MYSQL_USERNAME
    );
  }

  public static get MYSQL_PASSWORD(): string {
    return (
      process.env.MYSQL_PASSWORD || require("../extras/env").env.MYSQL_PASSWORD
    );
  }

  public static get MYSQL_DATABASE(): string {
    return (
      process.env.MYSQL_DATABASE || require("../extras/env").env.MYSQL_DATABASE
    );
  }

  public static get MYSQL_TIMEOUT(): number {
    return (
      Number(process.env.MYSQL_TIMEOUT) ||
      require("../extras/env").env.MYSQL_TIMEOUT
    );
  }

  public static get MYSQL_CONNECTION_TIMEOUT(): number {
    return (
      Number(process.env.MYSQL_CONNECTION_TIMEOUT) ||
      require("../extras/env").env.MYSQL_CONNECTION_TIMEOUT
    );
  }

  public static get MYSQL_CONNECTION_LIMIT(): number {
    return (
      Number(process.env.MYSQL_CONNECTION_LIMIT) ||
      require("../extras/env").env.MYSQL_CONNECTION_LIMIT
    );
  }

  public static get MONGO_URL(): string {
    return process.env.MONGO_URL || require("../extras/env").env.MONGO_URL;
  }

  public static get MONGO_BASE(): string {
    return process.env.MONGO_BASE || require("../extras/env").env.MONGO_BASE;
  }

  public static get MONGO_USERNAME(): string {
    return (
      process.env.MONGO_USERNAME || require("../extras/env").env.MONGO_USERNAME
    );
  }

  public static get MONGO_PASSWORD(): string {
    return (
      process.env.MONGO_PASSWORD || require("../extras/env").env.MONGO_PASSWORD
    );
  }

  public static get MONGO_DATABASE(): string {
    return (
      process.env.MONGO_DATABASE || require("../extras/env").env.MONGO_DATABASE
    );
  }

  public static get JIKAN_BASE_URL(): string {
    return (
      process.env.JIKAN_BASE_URL || require("../extras/env").env.JIKAN_BASE_URL
    );
  }

  public static get MAL_BASE_URL(): string {
    return (
      process.env.MAL_BASE_URL || require("../extras/env").env.MAL_BASE_URL
    );
  }

  public static get MAL_PROFILE_BASE(): string {
    return (
      process.env.MAL_PROFILE_BASE ||
      require("../extras/env").env.MAL_PROFILE_BASE
    );
  }

  public static MAL_CW_BASE(username: string) {
    const base =
      process.env.MAL_CW_BASE || require("../extras/env").env.MAL_CW_BASE;
    return `${base}/${username}/load.json?status=1`;
  }
}
