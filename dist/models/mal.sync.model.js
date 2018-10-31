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
let MalSync = class MalSync {
    constructor() {
        this.Id = undefined;
        this.DiscordId = undefined;
        this.MalUsername = undefined;
        this.Code = undefined;
        this.Verified = undefined;
    }
    static CodeFormat(code) {
        return `[Rikimaru: ${code}]`;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], MalSync.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("discord_id", String),
    __metadata("design:type", String)
], MalSync.prototype, "DiscordId", void 0);
__decorate([
    json2typescript_1.JsonProperty("mal_username", String),
    __metadata("design:type", String)
], MalSync.prototype, "MalUsername", void 0);
__decorate([
    json2typescript_1.JsonProperty("code", String),
    __metadata("design:type", String)
], MalSync.prototype, "Code", void 0);
__decorate([
    json2typescript_1.JsonProperty("verified", Boolean),
    __metadata("design:type", Boolean)
], MalSync.prototype, "Verified", void 0);
MalSync = __decorate([
    json2typescript_1.JsonObject("")
], MalSync);
exports.MalSync = MalSync;
//# sourceMappingURL=mal.sync.model.js.map