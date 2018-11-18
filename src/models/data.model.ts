import { IDataPage, IDataMedia } from "../interfaces/data.interface";
import { Page } from "./page.model";
import { JsonObject, JsonProperty } from "json2typescript";
import { IPage, IMedia } from "../interfaces/page.interface";
import { Media } from "./media.model";

@JsonObject("data")
export class DataPage implements IDataPage {
  @JsonProperty("Page", Page)
  public Page: IPage = undefined;
}

@JsonObject("data")
export class DataMedia implements IDataMedia {
  @JsonProperty("Media", Media)
  public Media: IMedia = undefined;
}
