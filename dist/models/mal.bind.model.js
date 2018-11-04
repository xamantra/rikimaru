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
let MalBind = class MalBind {
    constructor() {
        this.Id = undefined;
        this.DiscordId = undefined;
        this.MalUsername = undefined;
        this.Code = undefined;
        this.Verified = undefined;
    }
    static CodeFormat(code) {
        return `[Rikimaru: ${code}]`;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], MalBind.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("discord_id", String),
    __metadata("design:type", String)
], MalBind.prototype, "DiscordId", void 0);
__decorate([
    json2typescript_1.JsonProperty("mal_username", String),
    __metadata("design:type", String)
], MalBind.prototype, "MalUsername", void 0);
__decorate([
    json2typescript_1.JsonProperty("code", String),
    __metadata("design:type", String)
], MalBind.prototype, "Code", void 0);
__decorate([
    json2typescript_1.JsonProperty("verified", Boolean),
    __metadata("design:type", Boolean)
], MalBind.prototype, "Verified", void 0);
MalBind = __decorate([
    json2typescript_1.JsonObject("")
], MalBind);
exports.MalBind = MalBind;
class MalProfile {
    constructor(Image, Status, AnimeStatus) {
        this.Image = Image;
        this.Status = Status;
        this.AnimeStatus = AnimeStatus;
    }
}
exports.MalProfile = MalProfile;
class ProfileStatus {
    constructor(LastOnline, Gender, Birthday, Location, Joined) { }
}
exports.ProfileStatus = ProfileStatus;
class AnimeStats {
    constructor(Days, MeanScore, CurrentlyWatching, Completed, OnHold, Dropped, PlanToWatch, Rewatch, Episodes) {
        this.TotalEntries =
            CurrentlyWatching + Completed + OnHold + Dropped + PlanToWatch;
    }
}
exports.AnimeStats = AnimeStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmJpbmQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21hbC5iaW5kLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQTJEO0FBRzNELElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFEcEI7UUFHUyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFFaEMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixhQUFRLEdBQVksU0FBUyxDQUFDO0lBS3ZDLENBQUM7SUFIUSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDbkMsT0FBTyxjQUFjLElBQUksR0FBRyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBYkM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O21DQUNFO0FBRTlCO0lBREMsOEJBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDOzswQ0FDRTtBQUVyQztJQURDLDhCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs7NENBQ0U7QUFFdkM7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O3FDQUNHO0FBRWhDO0lBREMsOEJBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDOzt5Q0FDRztBQVYxQixPQUFPO0lBRG5CLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsT0FBTyxDQWVuQjtBQWZZLDBCQUFPO0FBaUJwQixNQUFhLFVBQVU7SUFDckIsWUFDUyxLQUFhLEVBQ2IsTUFBcUIsRUFDckIsV0FBdUI7UUFGdkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFDN0IsQ0FBQztDQUNMO0FBTkQsZ0NBTUM7QUFFRCxNQUFhLGFBQWE7SUFDeEIsWUFDRSxVQUFrQixFQUNsQixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsTUFBYyxJQUNiLENBQUM7Q0FDTDtBQVJELHNDQVFDO0FBRUQsTUFBYSxVQUFVO0lBRXJCLFlBQ0UsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLGlCQUF5QixFQUN6QixTQUFpQixFQUNqQixNQUFjLEVBQ2QsT0FBZSxFQUNmLFdBQW1CLEVBQ25CLE9BQWUsRUFDZixRQUFnQjtRQUVoQixJQUFJLENBQUMsWUFBWTtZQUNmLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUNuRSxDQUFDO0NBQ0Y7QUFoQkQsZ0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSBcImpzb24ydHlwZXNjcmlwdFwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJcIilcclxuZXhwb3J0IGNsYXNzIE1hbEJpbmQge1xyXG4gIEBKc29uUHJvcGVydHkoXCJfaWRcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJkaXNjb3JkX2lkXCIsIFN0cmluZylcclxuICBwdWJsaWMgRGlzY29yZElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcIm1hbF91c2VybmFtZVwiLCBTdHJpbmcpXHJcbiAgcHVibGljIE1hbFVzZXJuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImNvZGVcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBDb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInZlcmlmaWVkXCIsIEJvb2xlYW4pXHJcbiAgcHVibGljIFZlcmlmaWVkOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIENvZGVGb3JtYXQoY29kZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYFtSaWtpbWFydTogJHtjb2RlfV1gO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hbFByb2ZpbGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIEltYWdlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgU3RhdHVzOiBQcm9maWxlU3RhdHVzLFxyXG4gICAgcHVibGljIEFuaW1lU3RhdHVzOiBBbmltZVN0YXRzXHJcbiAgKSB7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZVN0YXR1cyB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBMYXN0T25saW5lOiBzdHJpbmcsXHJcbiAgICBHZW5kZXI6IHN0cmluZyxcclxuICAgIEJpcnRoZGF5OiBzdHJpbmcsXHJcbiAgICBMb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgSm9pbmVkOiBzdHJpbmdcclxuICApIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltZVN0YXRzIHtcclxuICBwdWJsaWMgVG90YWxFbnRyaWVzOiBudW1iZXI7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBEYXlzOiBzdHJpbmcsXHJcbiAgICBNZWFuU2NvcmU6IHN0cmluZyxcclxuICAgIEN1cnJlbnRseVdhdGNoaW5nOiBudW1iZXIsXHJcbiAgICBDb21wbGV0ZWQ6IG51bWJlcixcclxuICAgIE9uSG9sZDogbnVtYmVyLFxyXG4gICAgRHJvcHBlZDogbnVtYmVyLFxyXG4gICAgUGxhblRvV2F0Y2g6IG51bWJlcixcclxuICAgIFJld2F0Y2g6IG51bWJlcixcclxuICAgIEVwaXNvZGVzOiBudW1iZXJcclxuICApIHtcclxuICAgIHRoaXMuVG90YWxFbnRyaWVzID1cclxuICAgICAgQ3VycmVudGx5V2F0Y2hpbmcgKyBDb21wbGV0ZWQgKyBPbkhvbGQgKyBEcm9wcGVkICsgUGxhblRvV2F0Y2g7XHJcbiAgfVxyXG59XHJcbiJdfQ==