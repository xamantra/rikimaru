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
const media_model_1 = require("./media.model");
const json2typescript_1 = require("json2typescript");
let Page = class Page {
    constructor() {
        this.media = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("media", [media_model_1.Media]),
    __metadata("design:type", Array)
], Page.prototype, "media", void 0);
Page = __decorate([
    json2typescript_1.JsonObject("Page")
], Page);
exports.Page = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcGFnZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLCtDQUFzQztBQUN0QyxxREFBMkQ7QUFHM0QsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtJQURqQjtRQUdTLFVBQUssR0FBYSxTQUFTLENBQUM7SUFDckMsQ0FBQztDQUFBLENBQUE7QUFEQztJQURDLDhCQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsbUJBQUssQ0FBQyxDQUFDOzttQ0FDSTtBQUZ4QixJQUFJO0lBRGhCLDRCQUFVLENBQUMsTUFBTSxDQUFDO0dBQ04sSUFBSSxDQUdoQjtBQUhZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVBhZ2UsIElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSBcIi4vbWVkaWEubW9kZWxcIjtcclxuaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSBcImpzb24ydHlwZXNjcmlwdFwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJQYWdlXCIpXHJcbmV4cG9ydCBjbGFzcyBQYWdlIGltcGxlbWVudHMgSVBhZ2Uge1xyXG4gIEBKc29uUHJvcGVydHkoXCJtZWRpYVwiLCBbTWVkaWFdKVxyXG4gIHB1YmxpYyBtZWRpYTogSU1lZGlhW10gPSB1bmRlZmluZWQ7XHJcbn1cclxuIl19