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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21lZGlhLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWlEO0FBQ2pELG1GQUF3RTtBQUN4RSwrQ0FBc0M7QUFTdEMseURBQStDO0FBQy9DLDJFQUFnRTtBQUNoRSxxREFBMkQ7QUFDM0QscURBQTJDO0FBRzNDLElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFEbEI7UUFHUyxlQUFVLEdBQWdCLFNBQVMsQ0FBQztRQUVwQyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBRXZCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFMUIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFFM0IsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixjQUFTLEdBQVUsU0FBUyxDQUFDO1FBRTdCLFlBQU8sR0FBVSxTQUFTLENBQUM7UUFFM0IsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUU3QixzQkFBaUIsR0FBdUIsU0FBUyxDQUFDO1FBRWxELHNCQUFpQixHQUE2QixTQUFTLENBQUM7SUFDakUsQ0FBQztDQUFBLENBQUE7QUF2QkM7SUFEQyw4QkFBWSxDQUFDLFlBQVksRUFBRSw4QkFBVSxDQUFDOzt5Q0FDSTtBQUUzQztJQURDLDhCQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7aUNBQ0c7QUFFOUI7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O29DQUNHO0FBRWpDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQUssQ0FBQzs7b0NBQ0k7QUFFakM7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O21DQUNHO0FBRWhDO0lBREMsOEJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOztxQ0FDRztBQUVsQztJQURDLDhCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7d0NBQ0c7QUFFckM7SUFEQyw4QkFBWSxDQUFDLFdBQVcsRUFBRSw0QkFBUyxDQUFDOzt3Q0FDRDtBQUVwQztJQURDLDhCQUFZLENBQUMsU0FBUyxFQUFFLHdCQUFPLENBQUM7O3NDQUNDO0FBRWxDO0lBREMsOEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDOzt1Q0FDRztBQUVwQztJQURDLDhCQUFZLENBQUMsbUJBQW1CLEVBQUUsNkNBQWlCLENBQUM7O2dEQUNJO0FBRXpEO0lBREMsOEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLHFEQUFxQixDQUFDLENBQUM7O2dEQUNJO0FBeEJwRCxLQUFLO0lBRGpCLDRCQUFVLENBQUMsT0FBTyxDQUFDO0dBQ1AsS0FBSyxDQXlCakI7QUF6Qlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3ZlckltYWdlIH0gZnJvbSBcIi4vY292ZXIuaW1hZ2UubW9kZWxcIjtcclxuaW1wb3J0IHsgTWVkaWFTdHJlYW1pbmdFcGlzb2RlIH0gZnJvbSBcIi4vbWVkaWEuc3RyZWFtaW5nLmVwaXNvZGUubW9kZWxcIjtcclxuaW1wb3J0IHsgVGl0bGUgfSBmcm9tIFwiLi90aXRsZS5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIElNZWRpYSxcclxuICBJQ292ZXJJbWFnZSxcclxuICBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlLFxyXG4gIElOZXh0QWlyaW5nRXBpc29kZSxcclxuICBJRGF0ZSxcclxuICBJVGl0bGVcclxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBTdGFydERhdGUgfSBmcm9tIFwiLi9zdGFydC5kYXRlLm1vZGVsXCI7XHJcbmltcG9ydCB7IE5leHRBaXJpbmdFcGlzb2RlIH0gZnJvbSBcIi4vbmV4dC5haXJpbmcuZXBpc29kZS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEVuZERhdGUgfSBmcm9tIFwiLi9lbmQuZGF0ZS5tb2RlbFwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJtZWRpYVwiKVxyXG5leHBvcnQgY2xhc3MgTWVkaWEgaW1wbGVtZW50cyBJTWVkaWEge1xyXG4gIEBKc29uUHJvcGVydHkoXCJjb3ZlckltYWdlXCIsIENvdmVySW1hZ2UpXHJcbiAgcHVibGljIGNvdmVySW1hZ2U6IElDb3ZlckltYWdlID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJpZFwiLCBOdW1iZXIpXHJcbiAgcHVibGljIGlkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImlkTWFsXCIsIE51bWJlcilcclxuICBwdWJsaWMgaWRNYWw6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwidGl0bGVcIiwgVGl0bGUpXHJcbiAgcHVibGljIHRpdGxlOiBJVGl0bGUgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInR5cGVcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInN0YXR1c1wiLCBTdHJpbmcpXHJcbiAgcHVibGljIHN0YXR1czogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyB1cGRhdGVkQXQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic3RhcnREYXRlXCIsIFN0YXJ0RGF0ZSlcclxuICBwdWJsaWMgc3RhcnREYXRlOiBJRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiZW5kRGF0ZVwiLCBFbmREYXRlKVxyXG4gIHB1YmxpYyBlbmREYXRlOiBJRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiZXBpc29kZXNcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBlcGlzb2RlczogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJuZXh0QWlyaW5nRXBpc29kZVwiLCBOZXh0QWlyaW5nRXBpc29kZSlcclxuICBwdWJsaWMgbmV4dEFpcmluZ0VwaXNvZGU6IElOZXh0QWlyaW5nRXBpc29kZSA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic3RyZWFtaW5nRXBpc29kZXNcIiwgW01lZGlhU3RyZWFtaW5nRXBpc29kZV0pXHJcbiAgcHVibGljIHN0cmVhbWluZ0VwaXNvZGVzOiBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlW10gPSB1bmRlZmluZWQ7XHJcbn1cclxuIl19