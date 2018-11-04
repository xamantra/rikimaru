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
let EndDate = class EndDate {
    constructor() {
        this.year = undefined;
        this.month = undefined;
        this.day = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("year", Number),
    __metadata("design:type", Number)
], EndDate.prototype, "year", void 0);
__decorate([
    json2typescript_1.JsonProperty("month", Number),
    __metadata("design:type", Number)
], EndDate.prototype, "month", void 0);
__decorate([
    json2typescript_1.JsonProperty("day", Number),
    __metadata("design:type", Number)
], EndDate.prototype, "day", void 0);
EndDate = __decorate([
    json2typescript_1.JsonObject("endDate")
], EndDate);
exports.EndDate = EndDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmRhdGUubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2VuZC5kYXRlLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EscURBQTJEO0FBRzNELElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFEcEI7UUFHUyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFFMUIsUUFBRyxHQUFXLFNBQVMsQ0FBQztJQUNqQyxDQUFDO0NBQUEsQ0FBQTtBQUxDO0lBREMsOEJBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOztxQ0FDRztBQUVoQztJQURDLDhCQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQzs7c0NBQ0c7QUFFakM7SUFEQyw4QkFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O29DQUNHO0FBTnBCLE9BQU87SUFEbkIsNEJBQVUsQ0FBQyxTQUFTLENBQUM7R0FDVCxPQUFPLENBT25CO0FBUFksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGF0ZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gXCJqc29uMnR5cGVzY3JpcHRcIjtcclxuXHJcbkBKc29uT2JqZWN0KFwiZW5kRGF0ZVwiKVxyXG5leHBvcnQgY2xhc3MgRW5kRGF0ZSBpbXBsZW1lbnRzIElEYXRlIHtcclxuICBASnNvblByb3BlcnR5KFwieWVhclwiLCBOdW1iZXIpXHJcbiAgcHVibGljIHllYXI6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwibW9udGhcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBtb250aDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJkYXlcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBkYXk6IG51bWJlciA9IHVuZGVmaW5lZDtcclxufVxyXG4iXX0=