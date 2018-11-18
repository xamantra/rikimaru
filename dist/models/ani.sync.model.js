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
const media_model_1 = require("../models/media.model");
let MediaList = class MediaList {
    constructor() {
        this.media = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("media", media_model_1.Media),
    __metadata("design:type", Object)
], MediaList.prototype, "media", void 0);
MediaList = __decorate([
    json2typescript_1.JsonObject("")
], MediaList);
exports.MediaList = MediaList;
let MediaListGroup = class MediaListGroup {
    constructor() {
        this.entries = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("entries", [MediaList]),
    __metadata("design:type", Array)
], MediaListGroup.prototype, "entries", void 0);
MediaListGroup = __decorate([
    json2typescript_1.JsonObject("")
], MediaListGroup);
exports.MediaListGroup = MediaListGroup;
let MediaListCollection = class MediaListCollection {
    constructor() {
        this.lists = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("lists", [MediaListGroup]),
    __metadata("design:type", Array)
], MediaListCollection.prototype, "lists", void 0);
MediaListCollection = __decorate([
    json2typescript_1.JsonObject("MediaListCollection")
], MediaListCollection);
exports.MediaListCollection = MediaListCollection;
let MediaListData = class MediaListData {
    constructor() {
        this.collection = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("MediaListCollection", MediaListCollection),
    __metadata("design:type", Object)
], MediaListData.prototype, "collection", void 0);
MediaListData = __decorate([
    json2typescript_1.JsonObject("data")
], MediaListData);
exports.MediaListData = MediaListData;
let ListRoot = class ListRoot {
    constructor() {
        this.data = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", MediaListData),
    __metadata("design:type", Object)
], ListRoot.prototype, "data", void 0);
ListRoot = __decorate([
    json2typescript_1.JsonObject("")
], ListRoot);
exports.ListRoot = ListRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pLnN5bmMubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2FuaS5zeW5jLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0EscURBQTJEO0FBQzNELHVEQUE4QztBQVE5QyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRHRCO1FBR0UsVUFBSyxHQUFXLFNBQVMsQ0FBQztJQUM1QixDQUFDO0NBQUEsQ0FBQTtBQURDO0lBREMsOEJBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQUssQ0FBQzs7d0NBQ0g7QUFGZixTQUFTO0lBRHJCLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsU0FBUyxDQUdyQjtBQUhZLDhCQUFTO0FBTXRCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFEM0I7UUFHRSxZQUFPLEdBQWlCLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0NBQUEsQ0FBQTtBQURDO0lBREMsOEJBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7K0NBQ0g7QUFGdkIsY0FBYztJQUQxQiw0QkFBVSxDQUFDLEVBQUUsQ0FBQztHQUNGLGNBQWMsQ0FHMUI7QUFIWSx3Q0FBYztBQU0zQixJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQURoQztRQUdFLFVBQUssR0FBc0IsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7Q0FBQSxDQUFBO0FBREM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztrREFDSDtBQUYxQixtQkFBbUI7SUFEL0IsNEJBQVUsQ0FBQyxxQkFBcUIsQ0FBQztHQUNyQixtQkFBbUIsQ0FHL0I7QUFIWSxrREFBbUI7QUFNaEMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUQxQjtRQUdFLGVBQVUsR0FBeUIsU0FBUyxDQUFDO0lBQy9DLENBQUM7Q0FBQSxDQUFBO0FBREM7SUFEQyw4QkFBWSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDOztpREFDWjtBQUZsQyxhQUFhO0lBRHpCLDRCQUFVLENBQUMsTUFBTSxDQUFDO0dBQ04sYUFBYSxDQUd6QjtBQUhZLHNDQUFhO0FBTTFCLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFEckI7UUFHRSxTQUFJLEdBQW1CLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0NBQUEsQ0FBQTtBQURDO0lBREMsOEJBQVksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDOztzQ0FDSDtBQUZ0QixRQUFRO0lBRHBCLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsUUFBUSxDQUdwQjtBQUhZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJTWVkaWFMaXN0LFxyXG4gIElNZWRpYUxpc3REYXRhLFxyXG4gIElMaXN0Um9vdFxyXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FuaS5zeW5jLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSBcIi4uL21vZGVscy9tZWRpYS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQge1xyXG4gIElNZWRpYUxpc3RDb2xsZWN0aW9uLFxyXG4gIElNZWRpYUxpc3RHcm91cFxyXG59IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FuaS5zeW5jLmludGVyZmFjZVwiO1xyXG5cclxuQEpzb25PYmplY3QoXCJcIilcclxuZXhwb3J0IGNsYXNzIE1lZGlhTGlzdCBpbXBsZW1lbnRzIElNZWRpYUxpc3Qge1xyXG4gIEBKc29uUHJvcGVydHkoXCJtZWRpYVwiLCBNZWRpYSlcclxuICBtZWRpYTogSU1lZGlhID0gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5ASnNvbk9iamVjdChcIlwiKVxyXG5leHBvcnQgY2xhc3MgTWVkaWFMaXN0R3JvdXAgaW1wbGVtZW50cyBJTWVkaWFMaXN0R3JvdXAge1xyXG4gIEBKc29uUHJvcGVydHkoXCJlbnRyaWVzXCIsIFtNZWRpYUxpc3RdKVxyXG4gIGVudHJpZXM6IElNZWRpYUxpc3RbXSA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQEpzb25PYmplY3QoXCJNZWRpYUxpc3RDb2xsZWN0aW9uXCIpXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUxpc3RDb2xsZWN0aW9uIGltcGxlbWVudHMgSU1lZGlhTGlzdENvbGxlY3Rpb24ge1xyXG4gIEBKc29uUHJvcGVydHkoXCJsaXN0c1wiLCBbTWVkaWFMaXN0R3JvdXBdKVxyXG4gIGxpc3RzOiBJTWVkaWFMaXN0R3JvdXBbXSA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuQEpzb25PYmplY3QoXCJkYXRhXCIpXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUxpc3REYXRhIGltcGxlbWVudHMgSU1lZGlhTGlzdERhdGEge1xyXG4gIEBKc29uUHJvcGVydHkoXCJNZWRpYUxpc3RDb2xsZWN0aW9uXCIsIE1lZGlhTGlzdENvbGxlY3Rpb24pXHJcbiAgY29sbGVjdGlvbjogSU1lZGlhTGlzdENvbGxlY3Rpb24gPSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbkBKc29uT2JqZWN0KFwiXCIpXHJcbmV4cG9ydCBjbGFzcyBMaXN0Um9vdCBpbXBsZW1lbnRzIElMaXN0Um9vdCB7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImRhdGFcIiwgTWVkaWFMaXN0RGF0YSlcclxuICBkYXRhOiBJTWVkaWFMaXN0RGF0YSA9IHVuZGVmaW5lZDtcclxufVxyXG4iXX0=