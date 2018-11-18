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
let AnilistAvatar = class AnilistAvatar {
};
__decorate([
    json2typescript_1.JsonProperty("large", String),
    __metadata("design:type", String)
], AnilistAvatar.prototype, "large", void 0);
__decorate([
    json2typescript_1.JsonProperty("medium", String),
    __metadata("design:type", String)
], AnilistAvatar.prototype, "medium", void 0);
AnilistAvatar = __decorate([
    json2typescript_1.JsonObject("avatar")
], AnilistAvatar);
exports.AnilistAvatar = AnilistAvatar;
let User = class User {
    constructor() {
        this.about = undefined;
        this.avatar = undefined;
        this.bannerImage = undefined;
        this.id = undefined;
        this.name = undefined;
        this.siteUrl = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("about", String),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    json2typescript_1.JsonProperty("avatar", AnilistAvatar),
    __metadata("design:type", AnilistAvatar)
], User.prototype, "avatar", void 0);
__decorate([
    json2typescript_1.JsonProperty("bannerImage", String),
    __metadata("design:type", String)
], User.prototype, "bannerImage", void 0);
__decorate([
    json2typescript_1.JsonProperty("id", Number),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    json2typescript_1.JsonProperty("name", String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    json2typescript_1.JsonProperty("siteUrl", String),
    __metadata("design:type", String)
], User.prototype, "siteUrl", void 0);
User = __decorate([
    json2typescript_1.JsonObject("User")
], User);
exports.User = User;
let Data = class Data {
    constructor() {
        this.User = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("User"),
    __metadata("design:type", User)
], Data.prototype, "User", void 0);
Data = __decorate([
    json2typescript_1.JsonObject("data")
], Data);
exports.Data = Data;
let Root = class Root {
    constructor() {
        this.data = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", Data),
    __metadata("design:type", Data)
], Root.prototype, "data", void 0);
Root = __decorate([
    json2typescript_1.JsonObject("")
], Root);
exports.Root = Root;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGlzdC51c2VyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9hbmlsaXN0LnVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkQ7QUFXM0QsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUt6QixDQUFBO0FBSEM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7OzRDQUNoQjtBQUVkO0lBREMsOEJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOzs2Q0FDaEI7QUFKSixhQUFhO0lBRHpCLDRCQUFVLENBQUMsUUFBUSxDQUFDO0dBQ1IsYUFBYSxDQUt6QjtBQUxZLHNDQUFhO0FBUTFCLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFEakI7UUFHRSxVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRTFCLFdBQU0sR0FBa0IsU0FBUyxDQUFDO1FBRWxDLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRWhDLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFFdkIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixZQUFPLEdBQVcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Q0FBQSxDQUFBO0FBWEM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O21DQUNKO0FBRTFCO0lBREMsOEJBQVksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDOzhCQUM5QixhQUFhO29DQUFhO0FBRWxDO0lBREMsOEJBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDOzt5Q0FDSjtBQUVoQztJQURDLDhCQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7Z0NBQ0o7QUFFdkI7SUFEQyw4QkFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7O2tDQUNKO0FBRXpCO0lBREMsOEJBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDOztxQ0FDSjtBQVpqQixJQUFJO0lBRGhCLDRCQUFVLENBQUMsTUFBTSxDQUFDO0dBQ04sSUFBSSxDQWFoQjtBQWJZLG9CQUFJO0FBZ0JqQixJQUFhLElBQUksR0FBakIsTUFBYSxJQUFJO0lBRGpCO1FBR0UsU0FBSSxHQUFTLFNBQVMsQ0FBQztJQUN6QixDQUFDO0NBQUEsQ0FBQTtBQURDO0lBREMsOEJBQVksQ0FBQyxNQUFNLENBQUM7OEJBQ2YsSUFBSTtrQ0FBYTtBQUZaLElBQUk7SUFEaEIsNEJBQVUsQ0FBQyxNQUFNLENBQUM7R0FDTixJQUFJLENBR2hCO0FBSFksb0JBQUk7QUFNakIsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtJQURqQjtRQUdFLFNBQUksR0FBUyxTQUFTLENBQUM7SUFDekIsQ0FBQztDQUFBLENBQUE7QUFEQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzs4QkFDckIsSUFBSTtrQ0FBYTtBQUZaLElBQUk7SUFEaEIsNEJBQVUsQ0FBQyxFQUFFLENBQUM7R0FDRixJQUFJLENBR2hCO0FBSFksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7XHJcbiAgSUFuaWxpc3REYXRhLFxyXG4gIElBbmlsaXN0VXNlclxyXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FuaWxpc3QudXNlci5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtcclxuICBJQW5pbGlzdFVzZXJSb290LFxyXG4gIElBbmlsaXN0QXZhdGFyXHJcbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYW5pbGlzdC51c2VyLmludGVyZmFjZVwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJhdmF0YXJcIilcclxuZXhwb3J0IGNsYXNzIEFuaWxpc3RBdmF0YXIgaW1wbGVtZW50cyBJQW5pbGlzdEF2YXRhciB7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImxhcmdlXCIsIFN0cmluZylcclxuICBsYXJnZTogc3RyaW5nO1xyXG4gIEBKc29uUHJvcGVydHkoXCJtZWRpdW1cIiwgU3RyaW5nKVxyXG4gIG1lZGl1bTogc3RyaW5nO1xyXG59XHJcblxyXG5ASnNvbk9iamVjdChcIlVzZXJcIilcclxuZXhwb3J0IGNsYXNzIFVzZXIgaW1wbGVtZW50cyBJQW5pbGlzdFVzZXIge1xyXG4gIEBKc29uUHJvcGVydHkoXCJhYm91dFwiLCBTdHJpbmcpXHJcbiAgYWJvdXQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiYXZhdGFyXCIsIEFuaWxpc3RBdmF0YXIpXHJcbiAgYXZhdGFyOiBBbmlsaXN0QXZhdGFyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJiYW5uZXJJbWFnZVwiLCBTdHJpbmcpXHJcbiAgYmFubmVySW1hZ2U6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiaWRcIiwgTnVtYmVyKVxyXG4gIGlkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcIm5hbWVcIiwgU3RyaW5nKVxyXG4gIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwic2l0ZVVybFwiLCBTdHJpbmcpXHJcbiAgc2l0ZVVybDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5ASnNvbk9iamVjdChcImRhdGFcIilcclxuZXhwb3J0IGNsYXNzIERhdGEgaW1wbGVtZW50cyBJQW5pbGlzdERhdGEge1xyXG4gIEBKc29uUHJvcGVydHkoXCJVc2VyXCIpXHJcbiAgVXNlcjogVXNlciA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQEpzb25PYmplY3QoXCJcIilcclxuZXhwb3J0IGNsYXNzIFJvb3QgaW1wbGVtZW50cyBJQW5pbGlzdFVzZXJSb290IHtcclxuICBASnNvblByb3BlcnR5KFwiZGF0YVwiLCBEYXRhKVxyXG4gIGRhdGE6IERhdGEgPSB1bmRlZmluZWQ7XHJcbn1cclxuIl19