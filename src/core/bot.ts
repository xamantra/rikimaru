export class Bot {
  private static _instance: Bot;
  private Status = "off";

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public Init() {
    this.Status = "on";
  }

  public SetStatus(status: string, callback?: (status: string) => void) {
    this.Status = status;
    callback(status);
  }

  public get GetStatus() {
    return this.Status;
  }
}
