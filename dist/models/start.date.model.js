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
