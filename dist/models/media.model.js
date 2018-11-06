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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21lZGlhLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQWlEO0FBQ2pELG1GQUF3RTtBQUN4RSwrQ0FBc0M7QUFTdEMseURBQStDO0FBQy9DLDJFQUFnRTtBQUNoRSxxREFBMkQ7QUFDM0QscURBQTJDO0FBRzNDLElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFEbEI7UUFHUyxlQUFVLEdBQWdCLFNBQVMsQ0FBQztRQUVwQyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBRXZCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFMUIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFFM0IsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixjQUFTLEdBQVUsU0FBUyxDQUFDO1FBRTdCLFlBQU8sR0FBVSxTQUFTLENBQUM7UUFFM0IsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUU3QixzQkFBaUIsR0FBdUIsU0FBUyxDQUFDO1FBRWxELHNCQUFpQixHQUE2QixTQUFTLENBQUM7SUFDakUsQ0FBQztDQUFBLENBQUE7QUF2QkM7SUFEQyw4QkFBWSxDQUFDLFlBQVksRUFBRSw4QkFBVSxDQUFDOzt5Q0FDSTtBQUUzQztJQURDLDhCQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7aUNBQ0c7QUFFOUI7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O29DQUNHO0FBRWpDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQUssQ0FBQzs7b0NBQ0k7QUFFakM7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O21DQUNHO0FBRWhDO0lBREMsOEJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOztxQ0FDRztBQUVsQztJQURDLDhCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7d0NBQ0c7QUFFckM7SUFEQyw4QkFBWSxDQUFDLFdBQVcsRUFBRSw0QkFBUyxDQUFDOzt3Q0FDRDtBQUVwQztJQURDLDhCQUFZLENBQUMsU0FBUyxFQUFFLHdCQUFPLENBQUM7O3NDQUNDO0FBRWxDO0lBREMsOEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDOzt1Q0FDRztBQUVwQztJQURDLDhCQUFZLENBQUMsbUJBQW1CLEVBQUUsNkNBQWlCLENBQUM7O2dEQUNJO0FBRXpEO0lBREMsOEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLHFEQUFxQixDQUFDLENBQUM7O2dEQUNJO0FBeEJwRCxLQUFLO0lBRGpCLDRCQUFVLENBQUMsT0FBTyxDQUFDO0dBQ1AsS0FBSyxDQXlCakI7QUF6Qlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3ZlckltYWdlIH0gZnJvbSBcIi4vY292ZXIuaW1hZ2UubW9kZWxcIjtcbmltcG9ydCB7IE1lZGlhU3RyZWFtaW5nRXBpc29kZSB9IGZyb20gXCIuL21lZGlhLnN0cmVhbWluZy5lcGlzb2RlLm1vZGVsXCI7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gXCIuL3RpdGxlLm1vZGVsXCI7XG5pbXBvcnQge1xuICBJTWVkaWEsXG4gIElDb3ZlckltYWdlLFxuICBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlLFxuICBJTmV4dEFpcmluZ0VwaXNvZGUsXG4gIElEYXRlLFxuICBJVGl0bGVcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFN0YXJ0RGF0ZSB9IGZyb20gXCIuL3N0YXJ0LmRhdGUubW9kZWxcIjtcbmltcG9ydCB7IE5leHRBaXJpbmdFcGlzb2RlIH0gZnJvbSBcIi4vbmV4dC5haXJpbmcuZXBpc29kZS5tb2RlbFwiO1xuaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSBcImpzb24ydHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgRW5kRGF0ZSB9IGZyb20gXCIuL2VuZC5kYXRlLm1vZGVsXCI7XG5cbkBKc29uT2JqZWN0KFwibWVkaWFcIilcbmV4cG9ydCBjbGFzcyBNZWRpYSBpbXBsZW1lbnRzIElNZWRpYSB7XG4gIEBKc29uUHJvcGVydHkoXCJjb3ZlckltYWdlXCIsIENvdmVySW1hZ2UpXG4gIHB1YmxpYyBjb3ZlckltYWdlOiBJQ292ZXJJbWFnZSA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcImlkXCIsIE51bWJlcilcbiAgcHVibGljIGlkOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJpZE1hbFwiLCBOdW1iZXIpXG4gIHB1YmxpYyBpZE1hbDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwidGl0bGVcIiwgVGl0bGUpXG4gIHB1YmxpYyB0aXRsZTogSVRpdGxlID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwidHlwZVwiLCBTdHJpbmcpXG4gIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJzdGF0dXNcIiwgU3RyaW5nKVxuICBwdWJsaWMgc3RhdHVzOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJ1cGRhdGVkQXRcIiwgTnVtYmVyKVxuICBwdWJsaWMgdXBkYXRlZEF0OiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJzdGFydERhdGVcIiwgU3RhcnREYXRlKVxuICBwdWJsaWMgc3RhcnREYXRlOiBJRGF0ZSA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcImVuZERhdGVcIiwgRW5kRGF0ZSlcbiAgcHVibGljIGVuZERhdGU6IElEYXRlID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwiZXBpc29kZXNcIiwgTnVtYmVyKVxuICBwdWJsaWMgZXBpc29kZXM6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcIm5leHRBaXJpbmdFcGlzb2RlXCIsIE5leHRBaXJpbmdFcGlzb2RlKVxuICBwdWJsaWMgbmV4dEFpcmluZ0VwaXNvZGU6IElOZXh0QWlyaW5nRXBpc29kZSA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcInN0cmVhbWluZ0VwaXNvZGVzXCIsIFtNZWRpYVN0cmVhbWluZ0VwaXNvZGVdKVxuICBwdWJsaWMgc3RyZWFtaW5nRXBpc29kZXM6IElNZWRpYVN0cmVhbWluZ0VwaXNvZGVbXSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==