export class Random {
  public static Range(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
