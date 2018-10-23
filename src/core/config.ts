export class Config {
  private static Token =
    process.env.botToken || require("../extras/env").ConfigVariables.token;
  private static Prefix =
    process.env.commandPrefix ||
    require("../extras/env").ConfigVariables.prefix;

  public static get GetToken() {
    return this.Token;
  }

  public static get GetPrefix() {
    return this.Prefix;
  }
}
