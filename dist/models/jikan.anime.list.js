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
let Anime = class Anime {
    constructor() {
        this.mal_id = undefined;
        this.title = undefined;
        this.video_url = undefined;
        this.url = undefined;
        this.image_url = undefined;
        this.type = undefined;
        this.watching_status = undefined;
        this.score = undefined;
        this.watched_episodes = undefined;
        this.total_episodes = undefined;
        this.airing_status = undefined;
        this.has_episode_video = undefined;
        this.has_promo_video = undefined;
        this.has_video = undefined;
        this.is_rewatching = undefined;
        this.rating = undefined;
        this.start_date = undefined;
        this.end_date = undefined;
        this.priority = undefined;
        this.added_to_list = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], Anime.prototype, "mal_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("title", String),
    __metadata("design:type", String)
], Anime.prototype, "title", void 0);
__decorate([
    json2typescript_1.JsonProperty("video_url", String),
    __metadata("design:type", String)
], Anime.prototype, "video_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Anime.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Anime.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("type", String),
    __metadata("design:type", String)
], Anime.prototype, "type", void 0);
__decorate([
    json2typescript_1.JsonProperty("watching_status", Number),
    __metadata("design:type", Number)
], Anime.prototype, "watching_status", void 0);
__decorate([
    json2typescript_1.JsonProperty("score", Number),
    __metadata("design:type", Number)
], Anime.prototype, "score", void 0);
__decorate([
    json2typescript_1.JsonProperty("watched_episodes", Number),
    __metadata("design:type", Number)
], Anime.prototype, "watched_episodes", void 0);
__decorate([
    json2typescript_1.JsonProperty("total_episodes", Number),
    __metadata("design:type", Number)
], Anime.prototype, "total_episodes", void 0);
__decorate([
    json2typescript_1.JsonProperty("airing_status", Number),
    __metadata("design:type", Number)
], Anime.prototype, "airing_status", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_episode_video", Boolean),
    __metadata("design:type", Boolean)
], Anime.prototype, "has_episode_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_promo_video", Boolean),
    __metadata("design:type", Boolean)
], Anime.prototype, "has_promo_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_video", Boolean),
    __metadata("design:type", Boolean)
], Anime.prototype, "has_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("is_rewatching", Boolean),
    __metadata("design:type", Boolean)
], Anime.prototype, "is_rewatching", void 0);
__decorate([
    json2typescript_1.JsonProperty("rating", String),
    __metadata("design:type", String)
], Anime.prototype, "rating", void 0);
__decorate([
    json2typescript_1.JsonProperty("start_date", String),
    __metadata("design:type", String)
], Anime.prototype, "start_date", void 0);
__decorate([
    json2typescript_1.JsonProperty("end_date", String),
    __metadata("design:type", String)
], Anime.prototype, "end_date", void 0);
__decorate([
    json2typescript_1.JsonProperty("priority", String),
    __metadata("design:type", String)
], Anime.prototype, "priority", void 0);
__decorate([
    json2typescript_1.JsonProperty("added_to_list", Boolean),
    __metadata("design:type", Boolean)
], Anime.prototype, "added_to_list", void 0);
Anime = __decorate([
    json2typescript_1.JsonObject("anime")
], Anime);
exports.Anime = Anime;
let AnimeList = class AnimeList {
    constructor() {
        this.request_hash = undefined;
        this.request_cached = undefined;
        this.request_cache_expiry = undefined;
        this.anime = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("request_hash", String),
    __metadata("design:type", String)
], AnimeList.prototype, "request_hash", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cached", Boolean),
    __metadata("design:type", Boolean)
], AnimeList.prototype, "request_cached", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cache_expiry", Number),
    __metadata("design:type", Number)
], AnimeList.prototype, "request_cache_expiry", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime", [Anime]),
    __metadata("design:type", Array)
], AnimeList.prototype, "anime", void 0);
AnimeList = __decorate([
    json2typescript_1.JsonObject("")
], AnimeList);
exports.AnimeList = AnimeList;
//# sourceMappingURL=jikan.anime.list.js.map