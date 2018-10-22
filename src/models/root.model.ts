import { JsonObject, JsonProperty } from "json2typescript";
import { Data } from "./data.model";
import { IData } from "../interfaces/data.interface";

@JsonObject("root")
export class Root {
  @JsonProperty("data", Data)
  public Data: IData = undefined;
}
