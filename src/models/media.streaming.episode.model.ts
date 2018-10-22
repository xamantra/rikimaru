import { IMediaStreamingEpisode } from "../interfaces/page.interface";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("MediaStreamingEpisode")
export class MediaStreamingEpisode implements IMediaStreamingEpisode {
  @JsonProperty("title", String)
  public title: string = undefined;
  @JsonProperty("thumbnail", String)
  public thumbnail: string = undefined;
  @JsonProperty("url", String)
  public url: string = undefined;
  @JsonProperty("site", String)
  public site: string = undefined;
}
