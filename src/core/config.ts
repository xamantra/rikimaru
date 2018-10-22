import { EnvironmentVariables } from "../extras/env.sample";

export class Config {
  private Token: string;
  private Prefix: string;

  constructor() {
    this.Token = process.env.botToken || EnvironmentVariables.token;
    this.Prefix = process.env.commandPrefix || EnvironmentVariables.prefix;
  }

  public Init(): void {
    console.log(
      `Config :: BotToken = ${this.Token}, CommandPrefix = ${this.Prefix}`
    );
  }

  public get GetToken(): string {
    return this.Token;
  }

  public get GetPrefix(): string {
    return this.Prefix;
  }
}
