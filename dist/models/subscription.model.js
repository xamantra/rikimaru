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
    json2typescript_1.JsonObject("RowDataPacket")
], User);
exports.User = User;
let Media = class Media {
    constructor() {
        this.MalId = undefined;
        this.Title = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("mal_id", Number),
    __metadata("design:type", Number)
], Media.prototype, "MalId", void 0);
__decorate([
    json2typescript_1.JsonProperty("title", String),
    __metadata("design:type", String)
], Media.prototype, "Title", void 0);
Media = __decorate([
    json2typescript_1.JsonObject("RowDataPacket")
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
    json2typescript_1.JsonObject("RowDataPacket")
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
    json2typescript_1.JsonObject("RowDataPacket")
], Queue);
exports.Queue = Queue;
//# sourceMappingURL=subscription.model.js.map