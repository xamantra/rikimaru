export class NullCheck {
  public static Fine(obj: any) {
    if (obj !== null && obj !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
