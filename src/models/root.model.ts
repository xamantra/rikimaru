import { JsonObject, JsonProperty } from "json2typescript";
import { DataPage, DataMedia } from "./data.model";
import { IDataPage, IDataMedia } from "../interfaces/data.interface";
import { Media } from "./media.model";

@JsonObject("root")
export class RootPage {
  @JsonProperty("data", DataPage)
  public DataPage: IDataPage = undefined;
}

@JsonObject("root")
export class RootMedia {
  @JsonProperty("data", DataMedia)
  public DataMedia: IDataMedia = undefined;
}
