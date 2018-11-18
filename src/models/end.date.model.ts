import { IDate } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("endDate")
export class EndDate implements IDate {
  @JsonProperty("year", Number)
  public year: number = undefined;
  @JsonProperty("month", Number)
  public month: number = undefined;
  @JsonProperty("day", Number)
  public day: number = undefined;
}
