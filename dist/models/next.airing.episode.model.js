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
        this.next = undefined;
        this.airingAt = undefined;
        this.timeUntilAiring = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("episode", Number),
    __metadata("design:type", Number)
], NextAiringEpisode.prototype, "next", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV4dC5haXJpbmcuZXBpc29kZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvbmV4dC5haXJpbmcuZXBpc29kZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHFEQUEyRDtBQUczRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUQ5QjtRQUdTLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFekIsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUU3QixvQkFBZSxHQUFXLFNBQVMsQ0FBQztJQUM3QyxDQUFDO0NBQUEsQ0FBQTtBQUxDO0lBREMsOEJBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDOzsrQ0FDQTtBQUVoQztJQURDLDhCQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzs7bURBQ0c7QUFFcEM7SUFEQyw4QkFBWSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQzs7MERBQ0c7QUFOaEMsaUJBQWlCO0lBRDdCLDRCQUFVLENBQUMsbUJBQW1CLENBQUM7R0FDbkIsaUJBQWlCLENBTzdCO0FBUFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU5leHRBaXJpbmdFcGlzb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gXCJqc29uMnR5cGVzY3JpcHRcIjtcblxuQEpzb25PYmplY3QoXCJuZXh0QWlyaW5nRXBpc29kZVwiKVxuZXhwb3J0IGNsYXNzIE5leHRBaXJpbmdFcGlzb2RlIGltcGxlbWVudHMgSU5leHRBaXJpbmdFcGlzb2RlIHtcbiAgQEpzb25Qcm9wZXJ0eShcImVwaXNvZGVcIiwgTnVtYmVyKVxuICBwdWJsaWMgbmV4dDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwiYWlyaW5nQXRcIiwgTnVtYmVyKVxuICBwdWJsaWMgYWlyaW5nQXQ6IG51bWJlciA9IHVuZGVmaW5lZDtcbiAgQEpzb25Qcm9wZXJ0eShcInRpbWVVbnRpbEFpcmluZ1wiLCBOdW1iZXIpXG4gIHB1YmxpYyB0aW1lVW50aWxBaXJpbmc6IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==