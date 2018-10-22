import { IData } from "../interfaces/data.interface";
import { Page } from "./page.model";
import { JsonObject, JsonProperty } from "json2typescript";
import { IPage } from "../interfaces/page.interface";

@JsonObject("data")
export class Data implements IData {
  @JsonProperty("Page", Page)
  public Page: IPage = undefined;
}
