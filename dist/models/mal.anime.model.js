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
let MalAnime = class MalAnime {
    constructor() {
        this.status = undefined;
        this.score = undefined;
        this.tags = undefined;
        this.is_rewatching = undefined;
        this.num_watched_episodes = undefined;
        this.anime_title = undefined;
        this.anime_num_episodes = undefined;
        this.anime_airing_status = undefined;
        this.anime_id = undefined;
        //   @JsonProperty("anime_studios", any)
        //   public anime_studios?: any = undefined;
        //   @JsonProperty("anime_licensors", any)
        //   public anime_licensors?: any = undefined;
        //   @JsonProperty("anime_season", Number)
        //   public anime_season?: any = undefined;
        this.has_episode_video = undefined;
        this.has_promotion_video = undefined;
        this.has_video = undefined;
        this.video_url = undefined;
        this.anime_url = undefined;
        this.anime_image_path = undefined;
        this.is_added_to_list = undefined;
        this.anime_media_type_string = undefined;
        this.anime_mpaa_rating_string = undefined;
        this.start_date_string = undefined;
        //   @JsonProperty("finish_date_string", any)
        //   public finish_date_string?: any = undefined;
        this.anime_start_date_string = undefined;
        //   @JsonProperty("anime_end_date_string", any)
        //   public anime_end_date_string?: any = undefined;
        this.days_string = undefined;
        this.storage_string = undefined;
        this.priority_string = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("status", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "status", void 0);
__decorate([
    json2typescript_1.JsonProperty("score", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "score", void 0);
__decorate([
    json2typescript_1.JsonProperty("tags", String),
    __metadata("design:type", String)
], MalAnime.prototype, "tags", void 0);
__decorate([
    json2typescript_1.JsonProperty("is_rewatching", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "is_rewatching", void 0);
__decorate([
    json2typescript_1.JsonProperty("num_watched_episodes", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "num_watched_episodes", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_title", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_title", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_num_episodes", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "anime_num_episodes", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_airing_status", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "anime_airing_status", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_id", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "anime_id", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_episode_video", Boolean),
    __metadata("design:type", Boolean)
], MalAnime.prototype, "has_episode_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_promotion_video", Boolean),
    __metadata("design:type", Boolean)
], MalAnime.prototype, "has_promotion_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("has_video", Boolean),
    __metadata("design:type", Boolean)
], MalAnime.prototype, "has_video", void 0);
__decorate([
    json2typescript_1.JsonProperty("video_url", String),
    __metadata("design:type", String)
], MalAnime.prototype, "video_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_url", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_image_path", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_image_path", void 0);
__decorate([
    json2typescript_1.JsonProperty("is_added_to_list", Boolean),
    __metadata("design:type", Boolean)
], MalAnime.prototype, "is_added_to_list", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_media_type_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_media_type_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_mpaa_rating_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_mpaa_rating_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("start_date_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "start_date_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("anime_start_date_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "anime_start_date_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("days_string", Number),
    __metadata("design:type", Number)
], MalAnime.prototype, "days_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("storage_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "storage_string", void 0);
__decorate([
    json2typescript_1.JsonProperty("priority_string", String),
    __metadata("design:type", String)
], MalAnime.prototype, "priority_string", void 0);
MalAnime = __decorate([
    json2typescript_1.JsonObject("")
], MalAnime);
exports.MalAnime = MalAnime;
