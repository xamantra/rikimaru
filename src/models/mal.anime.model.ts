import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("")
export class MalAnime {
  @JsonProperty("status", Number)
  public status: number = undefined;
  @JsonProperty("score", Number)
  public score: number = undefined;
  @JsonProperty("tags", String)
  public tags: string = undefined;
  @JsonProperty("is_rewatching", Number)
  public is_rewatching: number = undefined;
  @JsonProperty("num_watched_episodes", Number)
  public num_watched_episodes: number = undefined;
  @JsonProperty("anime_title", String)
  public anime_title: string = undefined;
  @JsonProperty("anime_num_episodes", Number)
  public anime_num_episodes: number = undefined;
  @JsonProperty("anime_airing_status", Number)
  public anime_airing_status: number = undefined;
  @JsonProperty("anime_id", Number)
  public anime_id: number = undefined;
  //   @JsonProperty("anime_studios", any)
  //   public anime_studios?: any = undefined;
  //   @JsonProperty("anime_licensors", any)
  //   public anime_licensors?: any = undefined;
  //   @JsonProperty("anime_season", Number)
  //   public anime_season?: any = undefined;
  @JsonProperty("has_episode_video", Boolean)
  public has_episode_video: boolean = undefined;
  @JsonProperty("has_promotion_video", Boolean)
  public has_promotion_video: boolean = undefined;
  @JsonProperty("has_video", Boolean)
  public has_video: boolean = undefined;
  @JsonProperty("video_url", String)
  public video_url: string = undefined;
  @JsonProperty("anime_url", String)
  public anime_url: string = undefined;
  @JsonProperty("anime_image_path", String)
  public anime_image_path: string = undefined;
  @JsonProperty("is_added_to_list", Boolean)
  public is_added_to_list: boolean = undefined;
  @JsonProperty("anime_media_type_string", String)
  public anime_media_type_string: string = undefined;
  @JsonProperty("anime_mpaa_rating_string", String)
  public anime_mpaa_rating_string: string = undefined;
  @JsonProperty("start_date_string", String)
  public start_date_string: string = undefined;
  //   @JsonProperty("finish_date_string", any)
  //   public finish_date_string?: any = undefined;
  @JsonProperty("anime_start_date_string", String)
  public anime_start_date_string: string = undefined;
  //   @JsonProperty("anime_end_date_string", any)
  //   public anime_end_date_string?: any = undefined;
  @JsonProperty("days_string", Number)
  public days_string: number = undefined;
  @JsonProperty("storage_string", String)
  public storage_string: string = undefined;
  @JsonProperty("priority_string", String)
  public priority_string: string = undefined;
}
