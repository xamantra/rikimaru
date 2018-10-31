"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const json2typescript_1 = require("json2typescript");
let AnimeStats = class AnimeStats {
    constructor() {
        this.days_watched = undefined;
        this.mean_score = undefined;
        this.watching = undefined;
        this.completed = undefined;
        this.on_hold = undefined;
        this.dropped = undefined;
        this.plan_to_watch = undefined;
        this.total_entries = undefined;
        this.rewatched = undefined;
        this.episodes_watched = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("days_watched", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "days_watched", void 0);
__decorate([
    json2typescript_1.JsonProperty("mean_score", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "mean_score", void 0);
__decorate([
    json2typescript_1.JsonProperty("watching", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "watching", void 0);
__decorate([
    json2typescript_1.JsonProperty("completed", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "completed", void 0);
__decorate([
    json2typescript_1.JsonProperty("on_hold", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "on_hold", void 0);
__decorate([
    json2typescript_1.JsonProperty("dropped", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "dropped", void 0);
__decorate([
    json2typescript_1.JsonProperty("plan_to_watch", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "plan_to_watch", void 0);
__decorate([
    json2typescript_1.JsonProperty("total_entries", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "total_entries", void 0);
__decorate([
    json2typescript_1.JsonProperty("rewatched", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "rewatched", void 0);
__decorate([
    json2typescript_1.JsonProperty("episodes_watched", Number),
    __metadata("design:type", Number)
], AnimeStats.prototype, "episodes_watched", void 0);
AnimeStats = __decorate([
    json2typescript_1.JsonObject("anime_stats")
], AnimeStats);
exports.AnimeStats = AnimeStats;
let MangaStats = class MangaStats {
    constructor() {
        this.days_read = undefined;
        this.mean_score = undefined;
        this.reading = undefined;
        this.completed = undefined;
        this.on_hold = undefined;
        this.dropped = undefined;
        this.plan_to_read = undefined;
        this.total_entries = undefined;
        this.reread = undefined;
        this.chapters_read = undefined;
        this.volumes_read = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("days_read", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "days_read", void 0);
__decorate([
    json2typescript_1.JsonProperty("mean_score", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "mean_score", void 0);
__decorate([
    json2typescript_1.JsonProperty("reading", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "reading", void 0);
__decorate([
    json2typescript_1.JsonProperty("completed", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "completed", void 0);
__decorate([
    json2typescript_1.JsonProperty("on_hold", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "on_hold", void 0);
__decorate([
    json2typescript_1.JsonProperty("dropped", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "dropped", void 0);
__decorate([
    json2typescript_1.JsonProperty("plan_to_read", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "plan_to_read", void 0);
__decorate([
    json2typescript_1.JsonProperty("total_entries", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "total_entries", void 0);
__decorate([
    json2typescript_1.JsonProperty("reread", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "reread", void 0);
__decorate([
    json2typescript_1.JsonProperty("chapters_read", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "chapters_read", void 0);
__decorate([
    json2typescript_1.JsonProperty("volumes_read", Number),
    __metadata("design:type", Number)
], MangaStats.prototype, "volumes_read", void 0);
MangaStats = __decorate([
    json2typescript_1.JsonObject("manga_stats")
], MangaStats);
exports.MangaStats = MangaStats;
let Anime = class Anime {
    constructor() {
        this.mal_id = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.name = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], Anime.prototype, "mal_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Anime.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Anime.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("name", String),
    __metadata("design:type", String)
], Anime.prototype, "name", void 0);
Anime = __decorate([
    json2typescript_1.JsonObject("anime")
], Anime);
exports.Anime = Anime;
let Manga = class Manga {
    constructor() {
        this.mal_id = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.name = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], Manga.prototype, "mal_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Manga.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Manga.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("name", String),
    __metadata("design:type", String)
], Manga.prototype, "name", void 0);
Manga = __decorate([
    json2typescript_1.JsonObject("manga")
], Manga);
exports.Manga = Manga;
let Character = class Character {
    constructor() {
        this.mal_id = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.name = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], Character.prototype, "mal_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Character.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Character.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("name", String),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
Character = __decorate([
    json2typescript_1.JsonObject("characters")
], Character);
exports.Character = Character;
let People = class People {
    constructor() {
        this.mal_id = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.name = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], People.prototype, "mal_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], People.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], People.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("name", String),
    __metadata("design:type", String)
], People.prototype, "name", void 0);
People = __decorate([
    json2typescript_1.JsonObject("people")
], People);
exports.People = People;
let Favorite = class Favorite {
    constructor() {
        this.anime = undefined;
        this.manga = undefined;
        this.characters = undefined;
        this.people = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("anime", [Anime]),
    __metadata("design:type", Array)
], Favorite.prototype, "anime", void 0);
__decorate([
    json2typescript_1.JsonProperty("manga", [Manga]),
    __metadata("design:type", Array)
], Favorite.prototype, "manga", void 0);
__decorate([
    json2typescript_1.JsonProperty("characters", [Character]),
    __metadata("design:type", Array)
], Favorite.prototype, "characters", void 0);
__decorate([
    json2typescript_1.JsonProperty("people", [People]),
    __metadata("design:type", Array)
], Favorite.prototype, "people", void 0);
Favorite = __decorate([
    json2typescript_1.JsonObject("favorites")
], Favorite);
exports.Favorite = Favorite;
let Profile = class Profile {
    constructor() {
        this.request_hash = undefined;
        this.request_cached = undefined;
        this.request_cache_expiry = undefined;
        this.username = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.last_online = undefined;
        this.gender = undefined;
        this.birthday = undefined;
        this.location = undefined;
        this.joined = undefined;
        this.anime_stats = undefined;
        this.manga_stats = undefined;
        this.favorites = undefined;
        this.about = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("request_hash", String),
    __metadata("design:type", String)
], Profile.prototype, "request_hash", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cached", Boolean),
    __metadata("design:type", Boolean)
], Profile.prototype, "request_cached", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cache_expiry", Number),
    __metadata("design:type", Number)
], Profile.prototype, "request_cache_expiry", void 0);
__decorate([
    json2typescript_1.JsonProperty("username", String),
    __metadata("design:type", String)
], Profile.prototype, "username", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Profile.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Profile.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("last_online", String),
    __metadata("design:type", String)
], Profile.prototype, "last_online", void 0);
__decorate([
    json2typescript_1.JsonProperty("gender", String),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    json2typescript_1.JsonProperty("birthday", String),
    __metadata("design:type", String)
], Profile.prototype, "birthday", void 0);
__decorate([
    json2typescript_1.JsonProperty("location", String),
    __metadata("design:type", String)
], Profile.prototype, "location", void 0);
__decorate([
    json2typescript_1.JsonProperty("joined", String),
    __metadata("design:type", String)
], Profile.prototype, "joined", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_stats", AnimeStats),
    __metadata("design:type", AnimeStats)
], Profile.prototype, "anime_stats", void 0);
__decorate([
    json2typescript_1.JsonProperty("manga_stats", MangaStats),
    __metadata("design:type", MangaStats)
], Profile.prototype, "manga_stats", void 0);
__decorate([
    json2typescript_1.JsonProperty("favorites", Favorite),
    __metadata("design:type", Favorite)
], Profile.prototype, "favorites", void 0);
__decorate([
    json2typescript_1.JsonProperty("about", String),
    __metadata("design:type", String)
], Profile.prototype, "about", void 0);
Profile = __decorate([
    json2typescript_1.JsonObject("")
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=jikan.profile.js.map