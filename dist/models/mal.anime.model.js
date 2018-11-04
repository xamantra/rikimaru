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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmFuaW1lLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9tYWwuYW5pbWUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkQ7QUFHM0QsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQURyQjtRQUdTLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFFM0IsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLGtCQUFhLEdBQVcsU0FBUyxDQUFDO1FBRWxDLHlCQUFvQixHQUFXLFNBQVMsQ0FBQztRQUV6QyxnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUVoQyx1QkFBa0IsR0FBVyxTQUFTLENBQUM7UUFFdkMsd0JBQW1CLEdBQVcsU0FBUyxDQUFDO1FBRXhDLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDcEMsd0NBQXdDO1FBQ3hDLDRDQUE0QztRQUM1QywwQ0FBMEM7UUFDMUMsOENBQThDO1FBQzlDLDBDQUEwQztRQUMxQywyQ0FBMkM7UUFFcEMsc0JBQWlCLEdBQVksU0FBUyxDQUFDO1FBRXZDLHdCQUFtQixHQUFZLFNBQVMsQ0FBQztRQUV6QyxjQUFTLEdBQVksU0FBUyxDQUFDO1FBRS9CLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUU5QixxQkFBZ0IsR0FBVyxTQUFTLENBQUM7UUFFckMscUJBQWdCLEdBQVksU0FBUyxDQUFDO1FBRXRDLDRCQUF1QixHQUFXLFNBQVMsQ0FBQztRQUU1Qyw2QkFBd0IsR0FBVyxTQUFTLENBQUM7UUFFN0Msc0JBQWlCLEdBQVcsU0FBUyxDQUFDO1FBQzdDLDZDQUE2QztRQUM3QyxpREFBaUQ7UUFFMUMsNEJBQXVCLEdBQVcsU0FBUyxDQUFDO1FBQ25ELGdEQUFnRDtRQUNoRCxvREFBb0Q7UUFFN0MsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFFaEMsbUJBQWMsR0FBVyxTQUFTLENBQUM7UUFFbkMsb0JBQWUsR0FBVyxTQUFTLENBQUM7SUFDN0MsQ0FBQztDQUFBLENBQUE7QUF2REM7SUFEQyw4QkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7O3dDQUNHO0FBRWxDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOzt1Q0FDRztBQUVqQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7c0NBQ0c7QUFFaEM7SUFEQyw4QkFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7OytDQUNHO0FBRXpDO0lBREMsOEJBQVksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUM7O3NEQUNHO0FBRWhEO0lBREMsOEJBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDOzs2Q0FDRztBQUV2QztJQURDLDhCQUFZLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDOztvREFDRztBQUU5QztJQURDLDhCQUFZLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDOztxREFDRztBQUUvQztJQURDLDhCQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzs7MENBQ0c7QUFRcEM7SUFEQyw4QkFBWSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQzs7bURBQ0c7QUFFOUM7SUFEQyw4QkFBWSxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQzs7cURBQ0c7QUFFaEQ7SUFEQyw4QkFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7OzJDQUNHO0FBRXRDO0lBREMsOEJBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDOzsyQ0FDRztBQUVyQztJQURDLDhCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7MkNBQ0c7QUFFckM7SUFEQyw4QkFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQzs7a0RBQ0c7QUFFNUM7SUFEQyw4QkFBWSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQzs7a0RBQ0c7QUFFN0M7SUFEQyw4QkFBWSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQzs7eURBQ0c7QUFFbkQ7SUFEQyw4QkFBWSxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQzs7MERBQ0c7QUFFcEQ7SUFEQyw4QkFBWSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQzs7bURBQ0c7QUFJN0M7SUFEQyw4QkFBWSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQzs7eURBQ0c7QUFJbkQ7SUFEQyw4QkFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7OzZDQUNHO0FBRXZDO0lBREMsOEJBQVksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7O2dEQUNHO0FBRTFDO0lBREMsOEJBQVksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7O2lEQUNHO0FBeERoQyxRQUFRO0lBRHBCLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsUUFBUSxDQXlEcEI7QUF6RFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5ASnNvbk9iamVjdChcIlwiKVxyXG5leHBvcnQgY2xhc3MgTWFsQW5pbWUge1xyXG4gIEBKc29uUHJvcGVydHkoXCJzdGF0dXNcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBzdGF0dXM6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic2NvcmVcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBzY29yZTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJ0YWdzXCIsIFN0cmluZylcclxuICBwdWJsaWMgdGFnczogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJpc19yZXdhdGNoaW5nXCIsIE51bWJlcilcclxuICBwdWJsaWMgaXNfcmV3YXRjaGluZzogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJudW1fd2F0Y2hlZF9lcGlzb2Rlc1wiLCBOdW1iZXIpXHJcbiAgcHVibGljIG51bV93YXRjaGVkX2VwaXNvZGVzOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX3RpdGxlXCIsIFN0cmluZylcclxuICBwdWJsaWMgYW5pbWVfdGl0bGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiYW5pbWVfbnVtX2VwaXNvZGVzXCIsIE51bWJlcilcclxuICBwdWJsaWMgYW5pbWVfbnVtX2VwaXNvZGVzOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX2FpcmluZ19zdGF0dXNcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBhbmltZV9haXJpbmdfc3RhdHVzOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX2lkXCIsIE51bWJlcilcclxuICBwdWJsaWMgYW5pbWVfaWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAvLyAgIEBKc29uUHJvcGVydHkoXCJhbmltZV9zdHVkaW9zXCIsIGFueSlcclxuICAvLyAgIHB1YmxpYyBhbmltZV9zdHVkaW9zPzogYW55ID0gdW5kZWZpbmVkO1xyXG4gIC8vICAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX2xpY2Vuc29yc1wiLCBhbnkpXHJcbiAgLy8gICBwdWJsaWMgYW5pbWVfbGljZW5zb3JzPzogYW55ID0gdW5kZWZpbmVkO1xyXG4gIC8vICAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX3NlYXNvblwiLCBOdW1iZXIpXHJcbiAgLy8gICBwdWJsaWMgYW5pbWVfc2Vhc29uPzogYW55ID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJoYXNfZXBpc29kZV92aWRlb1wiLCBCb29sZWFuKVxyXG4gIHB1YmxpYyBoYXNfZXBpc29kZV92aWRlbzogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiaGFzX3Byb21vdGlvbl92aWRlb1wiLCBCb29sZWFuKVxyXG4gIHB1YmxpYyBoYXNfcHJvbW90aW9uX3ZpZGVvOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJoYXNfdmlkZW9cIiwgQm9vbGVhbilcclxuICBwdWJsaWMgaGFzX3ZpZGVvOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJ2aWRlb191cmxcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyB2aWRlb191cmw6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiYW5pbWVfdXJsXCIsIFN0cmluZylcclxuICBwdWJsaWMgYW5pbWVfdXJsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImFuaW1lX2ltYWdlX3BhdGhcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBhbmltZV9pbWFnZV9wYXRoOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImlzX2FkZGVkX3RvX2xpc3RcIiwgQm9vbGVhbilcclxuICBwdWJsaWMgaXNfYWRkZWRfdG9fbGlzdDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiYW5pbWVfbWVkaWFfdHlwZV9zdHJpbmdcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBhbmltZV9tZWRpYV90eXBlX3N0cmluZzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJhbmltZV9tcGFhX3JhdGluZ19zdHJpbmdcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBhbmltZV9tcGFhX3JhdGluZ19zdHJpbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic3RhcnRfZGF0ZV9zdHJpbmdcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBzdGFydF9kYXRlX3N0cmluZzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIC8vICAgQEpzb25Qcm9wZXJ0eShcImZpbmlzaF9kYXRlX3N0cmluZ1wiLCBhbnkpXHJcbiAgLy8gICBwdWJsaWMgZmluaXNoX2RhdGVfc3RyaW5nPzogYW55ID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJhbmltZV9zdGFydF9kYXRlX3N0cmluZ1wiLCBTdHJpbmcpXHJcbiAgcHVibGljIGFuaW1lX3N0YXJ0X2RhdGVfc3RyaW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgLy8gICBASnNvblByb3BlcnR5KFwiYW5pbWVfZW5kX2RhdGVfc3RyaW5nXCIsIGFueSlcclxuICAvLyAgIHB1YmxpYyBhbmltZV9lbmRfZGF0ZV9zdHJpbmc/OiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImRheXNfc3RyaW5nXCIsIE51bWJlcilcclxuICBwdWJsaWMgZGF5c19zdHJpbmc6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic3RvcmFnZV9zdHJpbmdcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBzdG9yYWdlX3N0cmluZzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJwcmlvcml0eV9zdHJpbmdcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBwcmlvcml0eV9zdHJpbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxufVxyXG4iXX0=