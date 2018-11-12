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
const config_1 = require("../core/config");
let MalBind = class MalBind {
    constructor() {
        this.Id = undefined;
        this.DiscordId = undefined;
        this.MalUsername = undefined;
        this.Code = undefined;
        this.Verified = undefined;
    }
    static CodeFormat(code) {
        return `[${config_1.Config.BOT_NAME}: ${code}]`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmJpbmQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21hbC5iaW5kLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQTJEO0FBQzNELDJDQUF3QztBQUd4QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBRHBCO1FBR1MsT0FBRSxHQUFXLFNBQVMsQ0FBQztRQUV2QixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBRTlCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFekIsYUFBUSxHQUFZLFNBQVMsQ0FBQztJQUt2QyxDQUFDO0lBSFEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ25DLE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ3pDLENBQUM7Q0FDRixDQUFBO0FBYkM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O21DQUNFO0FBRTlCO0lBREMsOEJBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDOzswQ0FDRTtBQUVyQztJQURDLDhCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs7NENBQ0U7QUFFdkM7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O3FDQUNHO0FBRWhDO0lBREMsOEJBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDOzt5Q0FDRztBQVYxQixPQUFPO0lBRG5CLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsT0FBTyxDQWVuQjtBQWZZLDBCQUFPO0FBaUJwQixNQUFhLFVBQVU7SUFDckIsWUFDUyxLQUFhLEVBQ2IsTUFBcUIsRUFDckIsV0FBdUI7UUFGdkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFDN0IsQ0FBQztDQUNMO0FBTkQsZ0NBTUM7QUFFRCxNQUFhLGFBQWE7SUFDeEIsWUFDRSxVQUFrQixFQUNsQixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsTUFBYyxJQUNiLENBQUM7Q0FDTDtBQVJELHNDQVFDO0FBRUQsTUFBYSxVQUFVO0lBRXJCLFlBQ0UsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLGlCQUF5QixFQUN6QixTQUFpQixFQUNqQixNQUFjLEVBQ2QsT0FBZSxFQUNmLFdBQW1CLEVBQ25CLE9BQWUsRUFDZixRQUFnQjtRQUVoQixJQUFJLENBQUMsWUFBWTtZQUNmLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsT0FBTyxHQUFHLFdBQVcsQ0FBQztJQUNuRSxDQUFDO0NBQ0Y7QUFoQkQsZ0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSBcImpzb24ydHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbkBKc29uT2JqZWN0KFwiXCIpXG5leHBvcnQgY2xhc3MgTWFsQmluZCB7XG4gIEBKc29uUHJvcGVydHkoXCJfaWRcIiwgU3RyaW5nKVxuICBwdWJsaWMgSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcImRpc2NvcmRfaWRcIiwgU3RyaW5nKVxuICBwdWJsaWMgRGlzY29yZElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJtYWxfdXNlcm5hbWVcIiwgU3RyaW5nKVxuICBwdWJsaWMgTWFsVXNlcm5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcImNvZGVcIiwgU3RyaW5nKVxuICBwdWJsaWMgQ29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwidmVyaWZpZWRcIiwgQm9vbGVhbilcbiAgcHVibGljIFZlcmlmaWVkOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBzdGF0aWMgQ29kZUZvcm1hdChjb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYFske0NvbmZpZy5CT1RfTkFNRX06ICR7Y29kZX1dYDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFsUHJvZmlsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBJbWFnZTogc3RyaW5nLFxuICAgIHB1YmxpYyBTdGF0dXM6IFByb2ZpbGVTdGF0dXMsXG4gICAgcHVibGljIEFuaW1lU3RhdHVzOiBBbmltZVN0YXRzXG4gICkge31cbn1cblxuZXhwb3J0IGNsYXNzIFByb2ZpbGVTdGF0dXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBMYXN0T25saW5lOiBzdHJpbmcsXG4gICAgR2VuZGVyOiBzdHJpbmcsXG4gICAgQmlydGhkYXk6IHN0cmluZyxcbiAgICBMb2NhdGlvbjogc3RyaW5nLFxuICAgIEpvaW5lZDogc3RyaW5nXG4gICkge31cbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1lU3RhdHMge1xuICBwdWJsaWMgVG90YWxFbnRyaWVzOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKFxuICAgIERheXM6IHN0cmluZyxcbiAgICBNZWFuU2NvcmU6IHN0cmluZyxcbiAgICBDdXJyZW50bHlXYXRjaGluZzogbnVtYmVyLFxuICAgIENvbXBsZXRlZDogbnVtYmVyLFxuICAgIE9uSG9sZDogbnVtYmVyLFxuICAgIERyb3BwZWQ6IG51bWJlcixcbiAgICBQbGFuVG9XYXRjaDogbnVtYmVyLFxuICAgIFJld2F0Y2g6IG51bWJlcixcbiAgICBFcGlzb2RlczogbnVtYmVyXG4gICkge1xuICAgIHRoaXMuVG90YWxFbnRyaWVzID1cbiAgICAgIEN1cnJlbnRseVdhdGNoaW5nICsgQ29tcGxldGVkICsgT25Ib2xkICsgRHJvcHBlZCArIFBsYW5Ub1dhdGNoO1xuICB9XG59XG4iXX0=