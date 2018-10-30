import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("RowDataPacket")
export class User {
  @JsonProperty("_id", String)
  public Id: string = undefined;
  @JsonProperty("discord_id", String)
  public DiscordId: string = undefined;
}

@JsonObject("RowDataPacket")
export class Media {
  @JsonProperty("mal_id", Number)
  public MalId: number = undefined;
  @JsonProperty("title", String)
  public Title: string = undefined;
}

@JsonObject("RowDataPacket")
export class Subscription {
  @JsonProperty("_id", String)
  public Id: string = undefined;
  @JsonProperty("media_id", Number)
  public MediaId: number = undefined;
  @JsonProperty("user_id", String)
  public UserId: string = undefined;
}

@JsonObject("RowDataPacket")
export class Queue {
  @JsonProperty("_id", String)
  public Id: string = undefined;
  @JsonProperty("media_id", Number)
  public MediaId: number = undefined;
  @JsonProperty("next_episode", Number)
  public NextEpisode: number = undefined;
}
