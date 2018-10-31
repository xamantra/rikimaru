import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("anime_stats")
export class AnimeStats {
  @JsonProperty("days_watched", Number)
  days_watched: number = undefined;
  @JsonProperty("mean_score", Number)
  mean_score: number = undefined;
  @JsonProperty("watching", Number)
  watching: number = undefined;
  @JsonProperty("completed", Number)
  completed: number = undefined;
  @JsonProperty("on_hold", Number)
  on_hold: number = undefined;
  @JsonProperty("dropped", Number)
  dropped: number = undefined;
  @JsonProperty("plan_to_watch", Number)
  plan_to_watch: number = undefined;
  @JsonProperty("total_entries", Number)
  total_entries: number = undefined;
  @JsonProperty("rewatched", Number)
  rewatched: number = undefined;
  @JsonProperty("episodes_watched", Number)
  episodes_watched: number = undefined;
}

@JsonObject("manga_stats")
export class MangaStats {
  @JsonProperty("days_read", Number)
  days_read: number = undefined;
  @JsonProperty("mean_score", Number)
  mean_score: number = undefined;
  @JsonProperty("reading", Number)
  reading: number = undefined;
  @JsonProperty("completed", Number)
  completed: number = undefined;
  @JsonProperty("on_hold", Number)
  on_hold: number = undefined;
  @JsonProperty("dropped", Number)
  dropped: number = undefined;
  @JsonProperty("plan_to_read", Number)
  plan_to_read: number = undefined;
  @JsonProperty("total_entries", Number)
  total_entries: number = undefined;
  @JsonProperty("reread", Number)
  reread: number = undefined;
  @JsonProperty("chapters_read", Number)
  chapters_read: number = undefined;
  @JsonProperty("volumes_read", Number)
  volumes_read: number = undefined;
}

@JsonObject("anime")
export class Anime {
  @JsonProperty("mal_id", Number)
  mal_id: number = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("name", String)
  name: string = undefined;
}

@JsonObject("manga")
export class Manga {
  @JsonProperty("mal_id", Number)
  mal_id: number = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("name", String)
  name: string = undefined;
}

@JsonObject("characters")
export class Character {
  @JsonProperty("mal_id", Number)
  mal_id: number = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("name", String)
  name: string = undefined;
}

@JsonObject("people")
export class People {
  @JsonProperty("mal_id", Number)
  mal_id: number = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("name", String)
  name: string = undefined;
}

@JsonObject("favorites")
export class Favorite {
  @JsonProperty("anime", [Anime])
  anime: Anime[] = undefined;
  @JsonProperty("manga", [Manga])
  manga: Manga[] = undefined;
  @JsonProperty("characters", [Character])
  characters: Character[] = undefined;
  @JsonProperty("people", [People])
  people: People[] = undefined;
}

@JsonObject("")
export class Profile {
  @JsonProperty("request_hash", String)
  request_hash: string = undefined;
  @JsonProperty("request_cached", Boolean)
  request_cached: boolean = undefined;
  @JsonProperty("request_cache_expiry", Number)
  request_cache_expiry: number = undefined;
  @JsonProperty("username", String)
  username: string = undefined;
  @JsonProperty("url", String)
  url: string = undefined;
  @JsonProperty("image_url", String)
  image_url: string = undefined;
  @JsonProperty("last_online", String)
  last_online: string = undefined;
  @JsonProperty("gender", String)
  gender: string = undefined;
  @JsonProperty("birthday", String)
  birthday: string = undefined;
  @JsonProperty("location", String)
  location: string = undefined;
  @JsonProperty("joined", String)
  joined: string = undefined;
  @JsonProperty("anime_stats", AnimeStats)
  anime_stats: AnimeStats = undefined;
  @JsonProperty("manga_stats", MangaStats)
  manga_stats: MangaStats = undefined;
  @JsonProperty("favorites", Favorite)
  favorites: Favorite = undefined;
  @JsonProperty("about", String)
  about: string = undefined;
}
