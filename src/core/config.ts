export class Config {
  private static BotToken =
    process.env.BOT_TOKEN || require("../extras/env").ConfigVariables.BOT_TOKEN;
  private static CommandPrefix =
    process.env.COMMAND_PREFIX ||
    require("../extras/env").ConfigVariables.COMMAND_PREFIX;
  private static MysqlHost =
    process.env.MYSQL_HOST ||
    require("../extras/env").ConfigVariables.MYSQL_HOST;
  private static MysqlPort =
    process.env.MYSQL_PORT ||
    require("../extras/env").ConfigVariables.MYSQL_PORT;
  private static MysqlUsername =
    process.env.MYSQL_USERNAME ||
    require("../extras/env").ConfigVariables.MYSQL_USERNAME;
  private static MysqlPassword =
    process.env.MYSQL_PASSWORD ||
    require("../extras/env").ConfigVariables.MYSQL_PASSWORD;
  private static MysqlDatabase =
    process.env.MYSQL_DATABASE ||
    require("../extras/env").ConfigVariables.MYSQL_DATABASE;
  private static MysqlTimeout =
    process.env.MYSQL_TIMEOUT ||
    require("../extras/env").ConfigVariables.MYSQL_TIMEOUT;
  private static MysqlConnectionTimeout =
    process.env.MYSQL_CONNECTION_TIMEOUT ||
    require("../extras/env").ConfigVariables.MYSQL_CONNECTION_TIMEOUT;

  public static get BOT_TOKEN() {
    return this.BotToken;
  }

  public static get COMMAND_PREFIX() {
    return this.CommandPrefix;
  }

  public static get MYSQL_HOST() {
    return this.MysqlHost;
  }

  public static get MYSQL_PORT() {
    return this.MysqlPort;
  }

  public static get MYSQL_USERNAME() {
    return this.MysqlUsername;
  }

  public static get MYSQL_PASSWORD() {
    return this.MysqlPassword;
  }

  public static get MYSQL_DATABASE() {
    return this.MysqlDatabase;
  }

  public static get MYSQL_TIMEOUT() {
    return this.MysqlTimeout;
  }

  public static get MYSQL_CONNECTION_TIMEOUT() {
    return this.MysqlConnectionTimeout;
  }
}
