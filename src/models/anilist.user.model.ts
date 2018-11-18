import { JsonObject, JsonProperty } from "json2typescript";
import {
  IAnilistData,
  IAnilistUser
} from "../interfaces/anilist.user.interface";
import {
  IAnilistUserRoot,
  IAnilistAvatar
} from "../interfaces/anilist.user.interface";

@JsonObject("avatar")
export class AnilistAvatar implements IAnilistAvatar {
  @JsonProperty("large", String)
  large: string;
  @JsonProperty("medium", String)
  medium: string;
}

@JsonObject("User")
export class User implements IAnilistUser {
  @JsonProperty("about", String)
  about: string = undefined;
  @JsonProperty("avatar", AnilistAvatar)
  avatar: AnilistAvatar = undefined;
  @JsonProperty("bannerImage", String)
  bannerImage: string = undefined;
  @JsonProperty("id", Number)
  id: number = undefined;
  @JsonProperty("name", String)
  name: string = undefined;
  @JsonProperty("siteUrl", String)
  siteUrl: string = undefined;
}

@JsonObject("data")
export class Data implements IAnilistData {
  @JsonProperty("User")
  User: User = undefined;
}

@JsonObject("")
export class Root implements IAnilistUserRoot {
  @JsonProperty("data", Data)
  data: Data = undefined;
}
