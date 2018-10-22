import { ConfigVariables } from "../extras/env";

export class Config {
  private Token: string;
  private Prefix: string;

  constructor() {
    this.Token = process.env.botToken || ConfigVariables.token;
    this.Prefix = process.env.commandPrefix || ConfigVariables.prefix;
    console.log(
      `Config :: BotToken = ${this.Token.substr(0, 14)}..., CommandPrefix = ${
        this.Prefix
      }`
    );
    console.log(`Constructed: "${Config.name}"`);
  }

  public get GetToken(): string {
    return this.Token;
  }

  public get GetPrefix(): string {
    return this.Prefix;
  }
}
