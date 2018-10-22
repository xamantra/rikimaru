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
const cover_image_model_1 = require("./cover.image.model");
const media_streaming_episode_model_1 = require("./media.streaming.episode.model");
const title_model_1 = require("./title.model");
const start_date_model_1 = require("./start.date.model");
const next_airing_episode_model_1 = require("./next.airing.episode.model");
const json2typescript_1 = require("json2typescript");
const end_date_model_1 = require("./end.date.model");
let Media = class Media {
    constructor() {
        this.coverImage = undefined;
        this.id = undefined;
        this.idMal = undefined;
        this.title = undefined;
        this.type = undefined;
        this.status = undefined;
        this.updatedAt = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.episodes = undefined;
        this.nextAiringEpisode = undefined;
        this.streamingEpisodes = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("coverImage", cover_image_model_1.CoverImage),
    __metadata("design:type", Object)
], Media.prototype, "coverImage", void 0);
__decorate([
    json2typescript_1.JsonProperty("id", Number),
    __metadata("design:type", Number)
], Media.prototype, "id", void 0);
__decorate([
    json2typescript_1.JsonProperty("idMal", Number),
    __metadata("design:type", Number)
], Media.prototype, "idMal", void 0);
__decorate([
    json2typescript_1.JsonProperty("title", title_model_1.Title),
    __metadata("design:type", Object)
], Media.prototype, "title", void 0);
__decorate([
    json2typescript_1.JsonProperty("type", String),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    json2typescript_1.JsonProperty("status", String),
    __metadata("design:type", String)
], Media.prototype, "status", void 0);
__decorate([
    json2typescript_1.JsonProperty("updatedAt", Number),
    __metadata("design:type", Number)
], Media.prototype, "updatedAt", void 0);
__decorate([
    json2typescript_1.JsonProperty("startDate", start_date_model_1.StartDate),
    __metadata("design:type", Object)
], Media.prototype, "startDate", void 0);
__decorate([
    json2typescript_1.JsonProperty("endDate", end_date_model_1.EndDate),
    __metadata("design:type", Object)
], Media.prototype, "endDate", void 0);
__decorate([
    json2typescript_1.JsonProperty("episodes", Number),
    __metadata("design:type", Number)
], Media.prototype, "episodes", void 0);
__decorate([
    json2typescript_1.JsonProperty("nextAiringEpisode", next_airing_episode_model_1.NextAiringEpisode),
    __metadata("design:type", Object)
], Media.prototype, "nextAiringEpisode", void 0);
__decorate([
    json2typescript_1.JsonProperty("streamingEpisodes", [media_streaming_episode_model_1.MediaStreamingEpisode]),
    __metadata("design:type", Array)
], Media.prototype, "streamingEpisodes", void 0);
Media = __decorate([
    json2typescript_1.JsonObject("media")
], Media);
exports.Media = Media;
//# sourceMappingURL=media.model.js.map