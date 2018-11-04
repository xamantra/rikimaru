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
let User = class User {
    constructor() {
        this.Id = undefined;
        this.DiscordId = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], User.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("discord_id", String),
    __metadata("design:type", String)
], User.prototype, "DiscordId", void 0);
User = __decorate([
    json2typescript_1.JsonObject("")
], User);
exports.User = User;
let Media = class Media {
    constructor() {
        this.MalId = undefined;
        this.Title = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", Number),
    __metadata("design:type", Number)
], Media.prototype, "MalId", void 0);
__decorate([
    json2typescript_1.JsonProperty("title", String),
    __metadata("design:type", String)
], Media.prototype, "Title", void 0);
Media = __decorate([
    json2typescript_1.JsonObject("")
], Media);
exports.Media = Media;
let Subscription = class Subscription {
    constructor() {
        this.Id = undefined;
        this.MediaId = undefined;
        this.UserId = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], Subscription.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("media_id", Number),
    __metadata("design:type", Number)
], Subscription.prototype, "MediaId", void 0);
__decorate([
    json2typescript_1.JsonProperty("user_id", String),
    __metadata("design:type", String)
], Subscription.prototype, "UserId", void 0);
Subscription = __decorate([
    json2typescript_1.JsonObject("")
], Subscription);
exports.Subscription = Subscription;
let Queue = class Queue {
    constructor() {
        this.Id = undefined;
        this.MediaId = undefined;
        this.NextEpisode = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], Queue.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("media_id", Number),
    __metadata("design:type", Number)
], Queue.prototype, "MediaId", void 0);
__decorate([
    json2typescript_1.JsonProperty("next_episode", Number),
    __metadata("design:type", Number)
], Queue.prototype, "NextEpisode", void 0);
Queue = __decorate([
    json2typescript_1.JsonObject("")
], Queue);
exports.Queue = Queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkQ7QUFHM0QsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtJQURqQjtRQUdTLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFFdkIsY0FBUyxHQUFXLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0NBQUEsQ0FBQTtBQUhDO0lBREMsOEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztnQ0FDRTtBQUU5QjtJQURDLDhCQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQzs7dUNBQ0U7QUFKMUIsSUFBSTtJQURoQiw0QkFBVSxDQUFDLEVBQUUsQ0FBQztHQUNGLElBQUksQ0FLaEI7QUFMWSxvQkFBSTtBQVFqQixJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFLO0lBRGxCO1FBR1MsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUUxQixVQUFLLEdBQVcsU0FBUyxDQUFDO0lBQ25DLENBQUM7Q0FBQSxDQUFBO0FBSEM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O29DQUNLO0FBRWpDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztvQ0FDRztBQUp0QixLQUFLO0lBRGpCLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsS0FBSyxDQUtqQjtBQUxZLHNCQUFLO0FBUWxCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFEekI7UUFHUyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBRXZCLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFFNUIsV0FBTSxHQUFXLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0NBQUEsQ0FBQTtBQUxDO0lBREMsOEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOzt3Q0FDRTtBQUU5QjtJQURDLDhCQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzs7NkNBQ0U7QUFFbkM7SUFEQyw4QkFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7OzRDQUNFO0FBTnZCLFlBQVk7SUFEeEIsNEJBQVUsQ0FBQyxFQUFFLENBQUM7R0FDRixZQUFZLENBT3hCO0FBUFksb0NBQVk7QUFVekIsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQURsQjtRQUdTLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFFdkIsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0NBQUEsQ0FBQTtBQUxDO0lBREMsOEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztpQ0FDRTtBQUU5QjtJQURDLDhCQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzs7c0NBQ0U7QUFFbkM7SUFEQyw4QkFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7OzBDQUNFO0FBTjVCLEtBQUs7SUFEakIsNEJBQVUsQ0FBQyxFQUFFLENBQUM7R0FDRixLQUFLLENBT2pCO0FBUFksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5ASnNvbk9iamVjdChcIlwiKVxyXG5leHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgQEpzb25Qcm9wZXJ0eShcIl9pZFwiLCBTdHJpbmcpXHJcbiAgcHVibGljIElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImRpc2NvcmRfaWRcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBEaXNjb3JkSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQEpzb25PYmplY3QoXCJcIilcclxuZXhwb3J0IGNsYXNzIE1lZGlhIHtcclxuICBASnNvblByb3BlcnR5KFwiX2lkXCIsIE51bWJlcilcclxuICBwdWJsaWMgTWFsSWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwidGl0bGVcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBUaXRsZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5ASnNvbk9iamVjdChcIlwiKVxyXG5leHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9uIHtcclxuICBASnNvblByb3BlcnR5KFwiX2lkXCIsIFN0cmluZylcclxuICBwdWJsaWMgSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwibWVkaWFfaWRcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBNZWRpYUlkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInVzZXJfaWRcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBVc2VySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQEpzb25PYmplY3QoXCJcIilcclxuZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICBASnNvblByb3BlcnR5KFwiX2lkXCIsIFN0cmluZylcclxuICBwdWJsaWMgSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwibWVkaWFfaWRcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBNZWRpYUlkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcIm5leHRfZXBpc29kZVwiLCBOdW1iZXIpXHJcbiAgcHVibGljIE5leHRFcGlzb2RlOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbn1cclxuIl19