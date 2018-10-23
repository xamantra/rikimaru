export class ArrayHelper {
  public static remove(array: any[], element: any) {
    const index = array.indexOf(element);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
