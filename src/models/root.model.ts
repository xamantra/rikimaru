import { JsonObject, JsonProperty } from "json2typescript";
import { Data } from "./data.model";

@JsonObject("root")
export class Root {
  @JsonProperty("data", Data)
  public Data: Data = undefined;
}
