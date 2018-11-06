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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc3RyZWFtaW5nLmVwaXNvZGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL21lZGlhLnN0cmVhbWluZy5lcGlzb2RlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscURBQTJEO0FBRzNELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRGxDO1FBR1MsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBRTlCLFFBQUcsR0FBVyxTQUFTLENBQUM7UUFFeEIsU0FBSSxHQUFXLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0NBQUEsQ0FBQTtBQVBDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztvREFDRztBQUVqQztJQURDLDhCQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7d0RBQ0c7QUFFckM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O2tEQUNHO0FBRS9CO0lBREMsOEJBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzttREFDRztBQVJyQixxQkFBcUI7SUFEakMsNEJBQVUsQ0FBQyx1QkFBdUIsQ0FBQztHQUN2QixxQkFBcUIsQ0FTakM7QUFUWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gXCJqc29uMnR5cGVzY3JpcHRcIjtcblxuQEpzb25PYmplY3QoXCJNZWRpYVN0cmVhbWluZ0VwaXNvZGVcIilcbmV4cG9ydCBjbGFzcyBNZWRpYVN0cmVhbWluZ0VwaXNvZGUgaW1wbGVtZW50cyBJTWVkaWFTdHJlYW1pbmdFcGlzb2RlIHtcbiAgQEpzb25Qcm9wZXJ0eShcInRpdGxlXCIsIFN0cmluZylcbiAgcHVibGljIHRpdGxlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJ0aHVtYm5haWxcIiwgU3RyaW5nKVxuICBwdWJsaWMgdGh1bWJuYWlsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJ1cmxcIiwgU3RyaW5nKVxuICBwdWJsaWMgdXJsOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJzaXRlXCIsIFN0cmluZylcbiAgcHVibGljIHNpdGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==