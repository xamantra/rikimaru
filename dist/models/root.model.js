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
const data_model_1 = require("./data.model");
let RootPage = class RootPage {
    constructor() {
        this.DataPage = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", data_model_1.DataPage),
    __metadata("design:type", Object)
], RootPage.prototype, "DataPage", void 0);
RootPage = __decorate([
    json2typescript_1.JsonObject("root")
], RootPage);
exports.RootPage = RootPage;
let RootMedia = class RootMedia {
    constructor() {
        this.DataMedia = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", data_model_1.DataMedia),
    __metadata("design:type", Object)
], RootMedia.prototype, "DataMedia", void 0);
RootMedia = __decorate([
    json2typescript_1.JsonObject("root")
], RootMedia);
exports.RootMedia = RootMedia;
