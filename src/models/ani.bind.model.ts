import { Config } from "../core/config";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("")
export class AniBind {
  @JsonProperty("_id", String)
  public Id: string = undefined;
  @JsonProperty("anilist_id", Number)
  public AnilistId: number = undefined;
  @JsonProperty("discord_id", String)
  public DiscordId: string = undefined;
  @JsonProperty("anilist_username", String)
  public AnilistUsername: string = undefined;
  @JsonProperty("code", String)
  public Code: string = undefined;
  @JsonProperty("verified", Boolean)
  public Verified: boolean = undefined;

  public static CodeFormat(code: string) {
    return `[${Config.BOT_NAME}: ${code}]`;
  }
}
