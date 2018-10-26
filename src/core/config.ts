import { env } from "../extras/env";

export class Config {
  public static get BOT_TOKEN(): string {
    return process.env.BOT_TOKEN || env.BOT_TOKEN;
  }

  public static get COMMAND_PREFIX(): string {
    return process.env.COMMAND_PREFIX || env.COMMAND_PREFIX;
  }

  public static get MYSQL_HOST(): string {
    return process.env.MYSQL_HOST || env.MYSQL_HOST;
  }

  public static get MYSQL_PORT(): number {
    return Number(process.env.MYSQL_PORT) || env.MYSQL_PORT;
  }

  public static get MYSQL_USERNAME(): string {
    return process.env.MYSQL_USERNAME || env.MYSQL_USERNAME;
  }

  public static get MYSQL_PASSWORD(): string {
    return process.env.MYSQL_PASSWORD || env.MYSQL_PASSWORD;
  }

  public static get MYSQL_DATABASE(): string {
    return process.env.MYSQL_DATABASE || env.MYSQL_DATABASE;
  }

  public static get MYSQL_TIMEOUT(): number {
    return Number(process.env.MYSQL_TIMEOUT) || env.MYSQL_TIMEOUT;
  }

  public static get MYSQL_CONNECTION_TIMEOUT(): number {
    return (
      Number(process.env.MYSQL_CONNECTION_TIMEOUT) ||
      env.MYSQL_CONNECTION_TIMEOUT
    );
  }
}
