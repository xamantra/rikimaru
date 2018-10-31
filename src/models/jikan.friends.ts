import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("friends")
export class Friend {
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("username", String)
  username: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("last_online", String)
  last_online: string = undefined;
  @JsonProperty("friends_since", String)
  friends_since: string = undefined;
}

@JsonObject("friends")
export class Friends {
  @JsonProperty("request_hash", String)
  request_hash: string = undefined;
  @JsonProperty("request_cached", Boolean)
  request_cached: boolean = undefined;
  @JsonProperty("request_cache_expiry", Number)
  request_cache_expiry: number = undefined;
  @JsonProperty("friends", [Friend])
  friends: Friend[] = undefined;
}
