export class ArrayHelper {
  public static remove(array: any[], element: any, callback?: () => void) {
    const index = array.indexOf(element);
    let called = false;
    if (index !== -1) {
      array.splice(index, 1);
      !called && callback !== null ? callback() : (called = true);
    }
  }
}
