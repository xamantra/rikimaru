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
let CoverImage = class CoverImage {
    constructor() {
        this.large = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("large", String),
    __metadata("design:type", String)
], CoverImage.prototype, "large", void 0);
CoverImage = __decorate([
    json2typescript_1.JsonObject("coverImage")
], CoverImage);
exports.CoverImage = CoverImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY292ZXIuaW1hZ2UubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2NvdmVyLmltYWdlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscURBQTJEO0FBRzNELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFEdkI7UUFHUyxVQUFLLEdBQVcsU0FBUyxDQUFDO0lBQ25DLENBQUM7Q0FBQSxDQUFBO0FBREM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O3lDQUNHO0FBRnRCLFVBQVU7SUFEdEIsNEJBQVUsQ0FBQyxZQUFZLENBQUM7R0FDWixVQUFVLENBR3RCO0FBSFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ292ZXJJbWFnZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gXCJqc29uMnR5cGVzY3JpcHRcIjtcclxuXHJcbkBKc29uT2JqZWN0KFwiY292ZXJJbWFnZVwiKVxyXG5leHBvcnQgY2xhc3MgQ292ZXJJbWFnZSBpbXBsZW1lbnRzIElDb3ZlckltYWdlIHtcclxuICBASnNvblByb3BlcnR5KFwibGFyZ2VcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBsYXJnZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG59XHJcbiJdfQ==