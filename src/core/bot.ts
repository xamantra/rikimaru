import * as http from "http";

export class Bot {
  private static Active = false;

  public static Init() {
    this.Active = true;
    http
      .createServer(function(req, res) {
        res.write("Hello! I am Rikimaru!");
        res.end();
      })
      .listen(8080);
  }

  public static SetActive(
    status: boolean,
    callback?: (status: boolean) => void
  ) {
    this.Active = status;
    callback(status);
  }

  public static get IsActive() {
    return this.Active;
  }
}
