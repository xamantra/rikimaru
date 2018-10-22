import { JsonConvert, ValueCheckingMode } from "json2typescript";

export class JsonHelper {
  public static get Converter() {
    const jsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    return jsonConvert;
  }
}
