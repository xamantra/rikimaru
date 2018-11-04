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
let Title = class Title {
    constructor() {
        this.romaji = undefined;
        this.english = undefined;
        this.native = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("romaji", String),
    __metadata("design:type", String)
], Title.prototype, "romaji", void 0);
__decorate([
    json2typescript_1.JsonProperty("english", String),
    __metadata("design:type", String)
], Title.prototype, "english", void 0);
__decorate([
    json2typescript_1.JsonProperty("native", String),
    __metadata("design:type", String)
], Title.prototype, "native", void 0);
Title = __decorate([
    json2typescript_1.JsonObject("title")
], Title);
exports.Title = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3RpdGxlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscURBQTJEO0FBRzNELElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFEbEI7UUFHUyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRTNCLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFFNUIsV0FBTSxHQUFXLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0NBQUEsQ0FBQTtBQUxDO0lBREMsOEJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOztxQ0FDRztBQUVsQztJQURDLDhCQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzs7c0NBQ0c7QUFFbkM7SUFEQyw4QkFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7O3FDQUNHO0FBTnZCLEtBQUs7SUFEakIsNEJBQVUsQ0FBQyxPQUFPLENBQUM7R0FDUCxLQUFLLENBT2pCO0FBUFksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGl0bGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5ASnNvbk9iamVjdChcInRpdGxlXCIpXHJcbmV4cG9ydCBjbGFzcyBUaXRsZSBpbXBsZW1lbnRzIElUaXRsZSB7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInJvbWFqaVwiLCBTdHJpbmcpXHJcbiAgcHVibGljIHJvbWFqaTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJlbmdsaXNoXCIsIFN0cmluZylcclxuICBwdWJsaWMgZW5nbGlzaDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJuYXRpdmVcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBuYXRpdmU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxufVxyXG4iXX0=