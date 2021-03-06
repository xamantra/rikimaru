import { JsonObject, JsonProperty } from "json2typescript";
import { Config } from "../core/config";

@JsonObject("")
export class MalBind {
  @JsonProperty("_id", String)
  public Id: string = undefined;
  @JsonProperty("discord_id", String)
  public DiscordId: string = undefined;
  @JsonProperty("mal_username", String)
  public MalUsername: string = undefined;
  @JsonProperty("code", String)
  public Code: string = undefined;
  @JsonProperty("verified", Boolean)
  public Verified: boolean = undefined;

  public static CodeFormat(code: string) {
    return `[${Config.BOT_NAME}: ${code}]`;
  }
}
