import { JsonConvert, ValueCheckingMode } from "json2typescript";

export class JsonHelper {
  public static get Converter() {
    const jsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    return jsonConvert;
  }

  public static Convert<T>(json: any, t: any) {
    const jsonString = JSON.stringify(json);
    const result = this.Converter.deserialize(JSON.parse(jsonString), t);
    return result as T;
  }

  public static ArrayConvert<T>(json: any, t: any) {
    const jsonString = JSON.stringify(json);
    const result = this.Converter.deserialize(JSON.parse(jsonString), t);
    return result as T[];
  }
}
