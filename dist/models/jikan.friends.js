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
let Friend = class Friend {
    constructor() {
        this.url = undefined;
        this.username = undefined;
        this.image_url = undefined;
        this.last_online = undefined;
        this.friends_since = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("url", String),
    __metadata("design:type", String)
], Friend.prototype, "url", void 0);
__decorate([
    json2typescript_1.JsonProperty("username", String),
    __metadata("design:type", String)
], Friend.prototype, "username", void 0);
__decorate([
    json2typescript_1.JsonProperty("image_url", String),
    __metadata("design:type", String)
], Friend.prototype, "image_url", void 0);
__decorate([
    json2typescript_1.JsonProperty("last_online", String),
    __metadata("design:type", String)
], Friend.prototype, "last_online", void 0);
__decorate([
    json2typescript_1.JsonProperty("friends_since", String),
    __metadata("design:type", String)
], Friend.prototype, "friends_since", void 0);
Friend = __decorate([
    json2typescript_1.JsonObject("friends")
], Friend);
exports.Friend = Friend;
let Friends = class Friends {
    constructor() {
        this.request_hash = undefined;
        this.request_cached = undefined;
        this.request_cache_expiry = undefined;
        this.friends = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("request_hash", String),
    __metadata("design:type", String)
], Friends.prototype, "request_hash", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cached", Boolean),
    __metadata("design:type", Boolean)
], Friends.prototype, "request_cached", void 0);
__decorate([
    json2typescript_1.JsonProperty("request_cache_expiry", Number),
    __metadata("design:type", Number)
], Friends.prototype, "request_cache_expiry", void 0);
__decorate([
    json2typescript_1.JsonProperty("friends", [Friend]),
    __metadata("design:type", Array)
], Friends.prototype, "friends", void 0);
Friends = __decorate([
    json2typescript_1.JsonObject("friends")
], Friends);
exports.Friends = Friends;
//# sourceMappingURL=jikan.friends.js.map