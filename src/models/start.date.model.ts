import { IDate } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("startDate")
export class StartDate implements IDate {
  @JsonProperty("year", Number)
  public year: number = undefined;
  @JsonProperty("month", Number)
  public month: number = undefined;
  @JsonProperty("day", Number)
  public day: number = undefined;
}
