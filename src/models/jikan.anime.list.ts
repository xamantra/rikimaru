import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("anime")
export class Anime {
  @JsonProperty("mal_id", Number)
  mal_id: number = undefined;
  @JsonProperty("title", String)
  title: string = undefined;
  @JsonProperty("video_url", String)
  video_url: string = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("type", String)
  type: string = undefined;
  @JsonProperty("watching_status", Number)
  watching_status: number = undefined;
  @JsonProperty("score", Number)
  score: number = undefined;
  @JsonProperty("watched_episodes", Number)
  watched_episodes: number = undefined;
  @JsonProperty("total_episodes", Number)
  total_episodes: number = undefined;
  @JsonProperty("airing_status", Number)
  airing_status: number = undefined;
  @JsonProperty("has_episode_video", Boolean)
  has_episode_video: boolean = undefined;
  @JsonProperty("has_promo_video", Boolean)
  has_promo_video: boolean = undefined;
  @JsonProperty("has_video", Boolean)
  has_video: boolean = undefined;
  @JsonProperty("is_rewatching", Boolean)
  is_rewatching: boolean = undefined;
  @JsonProperty("rating", String)
  rating: string = undefined;
  @JsonProperty("start_date", String)
  start_date: string = undefined;
  @JsonProperty("end_date", String)
  end_date: string = undefined;
  @JsonProperty("priority", String)
  priority: string = undefined;
  @JsonProperty("added_to_list", Boolean)
  added_to_list: boolean = undefined;
}

@JsonObject("")
export class AnimeList {
  @JsonProperty("request_hash", String)
  request_hash: string = undefined;
  @JsonProperty("request_cached", Boolean)
  request_cached: boolean = undefined;
  @JsonProperty("request_cache_expiry", Number)
  request_cache_expiry: number = undefined;
  @JsonProperty("anime", [Anime])
  anime: Anime[] = undefined;
}
