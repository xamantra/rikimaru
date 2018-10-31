import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("")
export class MalSync {
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
    return `[Rikimaru: ${code}]`;
  }
}

export class MalProfile {
  constructor(
    public Image: string,
    public Status: ProfileStatus,
    public AnimeStatus: AnimeStats
  ) {}
}

export class ProfileStatus {
  constructor(
    LastOnline: string,
    Gender: string,
    Birthday: string,
    Location: string,
    Joined: string
  ) {}
}

export class AnimeStats {
  public TotalEntries: number;
  constructor(
    Days: string,
    MeanScore: string,
    CurrentlyWatching: number,
    Completed: number,
    OnHold: number,
    Dropped: number,
    PlanToWatch: number,
    Rewatch: number,
    Episodes: number
  ) {
    this.TotalEntries =
      CurrentlyWatching + Completed + OnHold + Dropped + PlanToWatch;
  }
}
