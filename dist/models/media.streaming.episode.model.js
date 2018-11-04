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
let MediaStreamingEpisode = class MediaStreamingEpisode {
    constructor() {
        this.title = undefined;
        this.thumbnail = undefined;
        this.url = undefined;
        this.site = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("title", String),
    __metadata("design:type", String)
], MediaStreamingEpisode.prototype, "title", void 0);
__decorate([
    json2typescript_1.JsonProperty("thumbnail", String),
    __metadata("design:type", String)
], MediaStreamingEpisode.prototype, "thumbnail", void 0);
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], MediaStreamingEpisode.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("site", String),
    __metadata("design:type", String)
], MediaStreamingEpisode.prototype, "site", void 0);
MediaStreamingEpisode = __decorate([
    json2typescript_1.JsonObject("MediaStreamingEpisode")
], MediaStreamingEpisode);
exports.MediaStreamingEpisode = MediaStreamingEpisode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc3RyZWFtaW5nLmVwaXNvZGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21lZGlhLnN0cmVhbWluZy5lcGlzb2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscURBQTJEO0FBRzNELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRGxDO1FBR1MsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBRTlCLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFFeEIsU0FBSSxHQUFXLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0NBQUEsQ0FBQTtBQVBDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztvREFDRztBQUVqQztJQURDLDhCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7d0RBQ0c7QUFFckM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O2tEQUNHO0FBRS9CO0lBREMsOEJBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzttREFDRztBQVJyQixxQkFBcUI7SUFEakMsNEJBQVUsQ0FBQyx1QkFBdUIsQ0FBQztHQUN2QixxQkFBcUIsQ0FTakM7QUFUWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSBcImpzb24ydHlwZXNjcmlwdFwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJNZWRpYVN0cmVhbWluZ0VwaXNvZGVcIilcclxuZXhwb3J0IGNsYXNzIE1lZGlhU3RyZWFtaW5nRXBpc29kZSBpbXBsZW1lbnRzIElNZWRpYVN0cmVhbWluZ0VwaXNvZGUge1xyXG4gIEBKc29uUHJvcGVydHkoXCJ0aXRsZVwiLCBTdHJpbmcpXHJcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInRodW1ibmFpbFwiLCBTdHJpbmcpXHJcbiAgcHVibGljIHRodW1ibmFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJ1cmxcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyB1cmw6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic2l0ZVwiLCBTdHJpbmcpXHJcbiAgcHVibGljIHNpdGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxufVxyXG4iXX0=