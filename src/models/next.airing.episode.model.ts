import { INextAiringEpisode } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("nextAiringEpisode")
export class NextAiringEpisode implements INextAiringEpisode {
  @JsonProperty("episode", Number)
  public next: number = undefined;
  @JsonProperty("airingAt", Number)
  public airingAt: number = undefined;
  @JsonProperty("timeUntilAiring", Number)
  public timeUntilAiring: number = undefined;
}
