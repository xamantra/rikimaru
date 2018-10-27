import { JsonConvert, ValueCheckingMode } from "json2typescript";

export class JsonHelper {
  public static get Converter() {
    const jsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    return jsonConvert;
  }

  public static async Convert<T>(json: any, t: any) {
    return new Promise<T>((resolve, reject) => {
      const jsonString = JSON.stringify(json);
      const result = this.Converter.deserialize(JSON.parse(jsonString), t);
      if (result === null || result === undefined) {
        reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
      } else {
        resolve(result as T);
      }
    });
  }

  public static ArrayConvert<T>(json: any, t: any) {
    return new Promise<T[]>((resolve, reject) => {
      const jsonString = JSON.stringify(json);
      const result = this.Converter.deserialize(JSON.parse(jsonString), t);
      if (result === null || result === undefined) {
        reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
      } else {
        resolve(result as T[]);
      }
    });
  }
}
