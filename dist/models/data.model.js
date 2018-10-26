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
const page_model_1 = require("./page.model");
const json2typescript_1 = require("json2typescript");
const media_model_1 = require("./media.model");
let DataPage = class DataPage {
    constructor() {
        this.Page = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("Page", page_model_1.Page),
    __metadata("design:type", Object)
], DataPage.prototype, "Page", void 0);
DataPage = __decorate([
    json2typescript_1.JsonObject("data")
], DataPage);
exports.DataPage = DataPage;
let DataMedia = class DataMedia {
    constructor() {
        this.Media = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("Media", media_model_1.Media),
    __metadata("design:type", Object)
], DataMedia.prototype, "Media", void 0);
DataMedia = __decorate([
    json2typescript_1.JsonObject("data")
], DataMedia);
exports.DataMedia = DataMedia;
//# sourceMappingURL=data.model.js.map