import { IPage } from "../interfaces/page.interface";
import { Media } from "./media.model";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Page")
export class Page implements IPage {
  @JsonProperty("media", [Media])
  public media: Media[] = undefined;
}
