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
let StartDate = class StartDate {
    constructor() {
        this.year = undefined;
        this.month = undefined;
        this.day = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("year", Number),
    __metadata("design:type", Number)
], StartDate.prototype, "year", void 0);
__decorate([
    json2typescript_1.JsonProperty("month", Number),
    __metadata("design:type", Number)
], StartDate.prototype, "month", void 0);
__decorate([
    json2typescript_1.JsonProperty("day", Number),
    __metadata("design:type", Number)
], StartDate.prototype, "day", void 0);
StartDate = __decorate([
    json2typescript_1.JsonObject("startDate")
], StartDate);
exports.StartDate = StartDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuZGF0ZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3RhcnQuZGF0ZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHFEQUEyRDtBQUczRCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRHRCO1FBR1MsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRTFCLFFBQUcsR0FBVyxTQUFTLENBQUM7SUFDakMsQ0FBQztDQUFBLENBQUE7QUFMQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7dUNBQ0c7QUFFaEM7SUFEQyw4QkFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O3dDQUNHO0FBRWpDO0lBREMsOEJBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztzQ0FDRztBQU5wQixTQUFTO0lBRHJCLDRCQUFVLENBQUMsV0FBVyxDQUFDO0dBQ1gsU0FBUyxDQU9yQjtBQVBZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURhdGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5ASnNvbk9iamVjdChcInN0YXJ0RGF0ZVwiKVxyXG5leHBvcnQgY2xhc3MgU3RhcnREYXRlIGltcGxlbWVudHMgSURhdGUge1xyXG4gIEBKc29uUHJvcGVydHkoXCJ5ZWFyXCIsIE51bWJlcilcclxuICBwdWJsaWMgeWVhcjogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJtb250aFwiLCBOdW1iZXIpXHJcbiAgcHVibGljIG1vbnRoOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImRheVwiLCBOdW1iZXIpXHJcbiAgcHVibGljIGRheTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG59XHJcbiJdfQ==