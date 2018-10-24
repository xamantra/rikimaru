export class Config {
  private static Token =
    process.env.botToken || require("../extras/env").ConfigVariables.token;
  private static Prefix =
    process.env.commandPrefix ||
    require("../extras/env").ConfigVariables.prefix;
  private static MysqlHost =
    process.env.mysqlURL || require("../extras/env").ConfigVariables.mysqlURL;
  private static MysqlUsername =
    process.env.mysqlUsername ||
    require("../extras/env").ConfigVariables.mysqlUsername;
  private static MysqlPassword =
    process.env.mysqlPassword ||
    require("../extras/env").ConfigVariables.mysqlPassword;
  private static MysqlDatabase =
    process.env.mysqlDatabase ||
    require("../extras/env").ConfigVariables.mysqlDatabase;

  public static get GetToken() {
    return this.Token;
  }

  public static get GetPrefix() {
    return this.Prefix;
  }

  public static get GetMySqlHost() {
    return this.MysqlHost;
  }

  public static get GetMySqlUsername() {
    return this.MysqlUsername;
  }

  public static get GetMySqlPassword() {
    return this.MysqlPassword;
  }

  public static get GetMySqlDatabase() {
    return this.MysqlDatabase;
  }
}
