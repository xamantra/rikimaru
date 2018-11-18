import { ICoverImage } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("coverImage")
export class CoverImage implements ICoverImage {
  @JsonProperty("large", String)
  public large: string = undefined;
}
