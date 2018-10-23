export class Bot {
  private static Active = false;

  public static Init() {
    this.Active = true;
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
