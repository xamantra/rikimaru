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
}
