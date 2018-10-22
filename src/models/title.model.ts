import { ITitle } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("title")
export class Title implements ITitle {
  @JsonProperty("romaji", String)
  public romaji: string = undefined;
  @JsonProperty("english", String)
  public english: string = undefined;
  @JsonProperty("native", String)
  public native: string = undefined;
}
