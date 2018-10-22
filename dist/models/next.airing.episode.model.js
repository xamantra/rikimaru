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
let NextAiringEpisode = class NextAiringEpisode {
    constructor() {
        this.episode = undefined;
        this.airingAt = undefined;
        this.timeUntilAiring = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("episode", Number),
    __metadata("design:type", Number)
], NextAiringEpisode.prototype, "episode", void 0);
__decorate([
    json2typescript_1.JsonProperty("airingAt", Number),
    __metadata("design:type", Number)
], NextAiringEpisode.prototype, "airingAt", void 0);
__decorate([
    json2typescript_1.JsonProperty("timeUntilAiring", Number),
    __metadata("design:type", Number)
], NextAiringEpisode.prototype, "timeUntilAiring", void 0);
NextAiringEpisode = __decorate([
    json2typescript_1.JsonObject("nextAiringEpisode")
], NextAiringEpisode);
exports.NextAiringEpisode = NextAiringEpisode;
//# sourceMappingURL=next.airing.episode.model.js.map